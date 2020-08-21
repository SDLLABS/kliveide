import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import {
  onExecutionStateChanged,
  onConnectionStateChanged,
  getLastConnectedState,
  getLastExecutionState,
} from "../emulator/notifier";
import { RendererMessage } from "./messaging/message-types";
import { MessageProcessor } from "../emulator/message-processor";
import { ExecutionState } from "../emulator/communicator";

const editorInstances: vscode.WebviewPanel[] = [];
let activeEditor: vscode.WebviewPanel | null = null;

/**
 * Retrieves all registered editor providers
 */
export function getRegisteredEditors(): vscode.WebviewPanel[] {
  return editorInstances;
}

/**
 * Gets the active editor
 */
export function getActiveEditor(): vscode.WebviewPanel | null {
  return activeEditor;
}

/**
 *  * Base class for all custom editors
 */
export abstract class EditorProviderBase
  implements vscode.CustomTextEditorProvider {
  private _disposables = new Map<vscode.WebviewPanel, vscode.Disposable[]>();

  /**
   * The path of the "assets" folder within the extension
   */
  readonly assetsPath: string;

  /**
   * The path of the "out" folder within the extension
   */
  readonly outPath: string;

  /**
   * The title of the webview
   */
  abstract readonly title: string;

  /**
   * The name of the html file that is to be used as a template for
   * the contents of the view
   */
  abstract readonly htmlFileName: string;

  /**
   * The replacements that should be carried out on the HTML contents
   * of this panel's view
   */
  getContentReplacements(): ReplacementTuple[] {
    return [];
  }

  /**
   * Instantiates the editor provider
   * @param context Extension context
   */
  constructor(protected readonly context: vscode.ExtensionContext) {
    this.outPath = this.getExtensionPath("out");
    this.assetsPath = this.getExtensionPath("out/assets");
  }

  /**
   * Disposes resources held by a particular WebviewPanel
   * @param panel WebviewPanel to dispose its resorces
   */
  disposePanel(panel: vscode.WebviewPanel): void {
    // --- Remove this editor from the other instances
    const editorIndex = editorInstances.indexOf(panel);
    if (editorIndex >= 0) {
      editorInstances.splice(editorIndex, 1);
    }
    if (activeEditor === panel) {
      activeEditor = null;
    }

    // --- Hanlde disposables
    const disposables = this._disposables.get(panel);
    if (disposables) {
      disposables.forEach((d) => d.dispose());
    }
  }

  /**
   * Registers a disposable with the specified WebviewPanel
   * @param panel WebviewPanel that holds the disposables
   * @param disposable
   */
  toDispose(panel: vscode.WebviewPanel, disposable: vscode.Disposable): void {
    const disposables = this._disposables.get(panel);
    if (!disposables) {
      this._disposables.set(panel, [disposable]);
    } else {
      disposables.push(disposable);
    }
  }

  /**
   * Resolve a custom editor for a given text resource.
   *
   * @param document Document for the resource to resolve.
   * @param webviewPanel The webview panel used to display the editor UI for this resource.
   * @param token A cancellation token that indicates the result is no longer needed.
   * @return Thenable indicating that the custom editor has been resolved.
   */
  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // --- Store the instance
    editorInstances.push(webviewPanel);
    activeEditor = webviewPanel;

    // --- Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlContents(webviewPanel.webview);

    // --- Keep track of the active editor
    this.toDispose(
      webviewPanel,
      webviewPanel.onDidChangeViewState((ev) => {
        if (ev.webviewPanel.active) {
          activeEditor = ev.webviewPanel;
        }
      })
    );

    /**
     * Update the view when the editor text changes
     */
    this.toDispose(
      webviewPanel,
      vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          updateWebview();
        }
      })
    );

    // --- Notify the view about vm execution state changes
    this.toDispose(
      webviewPanel,
      onExecutionStateChanged((execState: ExecutionState) => {
        webviewPanel.webview.postMessage({
          viewNotification: "execState",
          state: execState.state,
          pc: execState.pc,
          runsInDebug: execState.runsInDebug,
        });
      })
    );

    // --- Notify the view about emulator connection state changes
    this.toDispose(
      webviewPanel,
      onConnectionStateChanged((state: boolean) => {
        webviewPanel.webview.postMessage({
          viewNotification: "connectionState",
          state,
        });
      })
    );

    // --- Receive message from the webview
    webviewPanel.webview.onDidReceiveMessage(
      async (e: ViewCommand | RendererMessage) => {
        if ((e as ViewCommand).command !== undefined) {
          await this.processViewCommand(webviewPanel, e as ViewCommand);
        } else {
          new MessageProcessor(webviewPanel.webview).processMessage(
            e as RendererMessage
          );
        }
      }
    );

    updateWebview();

    // --- Get the initial state
    this.sendExecutionStateToView(webviewPanel);

    /**
     * Updates the web view
     */
    function updateWebview() {
      webviewPanel.webview.postMessage({
        viewNotification: "update",
        text: document.getText(),
      });
    }
  }

  /**
   * Process view command
   * @param _panel The WebviewPanel that should process a message from its view
   * @param _viewCommand Command notification to process
   */
  async processViewCommand(_panel: vscode.WebviewPanel, _viewCommand: ViewCommand): Promise<void> {}

  /**
   * Gets the HTML contents belonging to this editor
   * @param webView The webview to get this HTML for
   */
  getHtmlContents(webView: vscode.Webview): string {
    // --- Read the HTML resource file
    let htmlContents: string;
    try {
      htmlContents = fs.readFileSync(
        this.getAssetsFileName(this.htmlFileName),
        "utf8"
      );

      // --- Prepare replacements
      const reps = this.getContentReplacements();
      reps.push(["cspSource", webView.cspSource], ["nonce", getNonce()]);

      // --- Replace the contents
      for (const replEntry of reps) {
        htmlContents = htmlContents
          .split(`$$$${replEntry[0]}$$$`)
          .join(replEntry[1].toString());
      }
    } catch (err) {
      htmlContents = `<p>Error loading HTML resource ${this.htmlFileName}: ${err}</p>`;
    }
    return htmlContents;
  }

  /**
   * Gets the specified path within the extension
   * @param {String[]} path Path within the extension
   */
  protected getExtensionPath(...paths: string[]): string {
    return path.join(this.context.extensionPath, ...paths);
  }

  /**
   * Gets the specified file resource URI
   * @param {String} basePath Base path of the resource within the extension folder
   * @param {String} resource Resource file name
   */
  protected getFileResource(basePath: string, resource: string): vscode.Uri {
    const file = vscode.Uri.file(path.join(basePath, resource));
    return file.with({ scheme: "vscode-resource" });
  }

  /**
   * Gets a resource from the "out" extension folder
   * @param {String} resource Resource file name
   */
  protected getOuFileResource(resource: string): vscode.Uri {
    return this.getFileResource(this.outPath, resource);
  }

  /**
   * Gets a resource from the "assets" extension folder
   * @param {String} resource Resource file name
   */
  protected getAssetsFileResource(resource: string): vscode.Uri {
    return this.getFileResource(this.assetsPath, resource);
  }

  /**
   * Gets a file name from the "out" extension folder
   * @param {String} filename Filename
   */
  protected getOuFileName(filename: string): string {
    return path.join(this.outPath, filename);
  }

  /**
   * Gets a file name from the "assets" extension folder
   * @param {String} filename Filename
   */
  protected getAssetsFileName(filename: string): string {
    return path.join(this.assetsPath, filename);
  }

  /**
   * Sends the current execution state to view
   */
  protected sendExecutionStateToView(panel: vscode.WebviewPanel): void {
    if (!getLastConnectedState()) {
      panel.webview.postMessage({
        viewNotification: "connectionState",
        state: false,
      });
    }
    const execState = getLastExecutionState();
    panel.webview.postMessage({
      viewNotification: "execState",
      state: execState.state,
      pc: execState.pc,
    });
  }
}

/**
 * Create a nonce we can use in web views
 */
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Instructs the view of the WebviewPanel to go to the specified address
 * @param panel WebviewPanel to notify
 * @param address Address to scroll to
 */
export function postGoToAddressMessage(
  panel: vscode.WebviewPanel,
  address: number
): void {
  panel.webview.postMessage({
    viewNotification: "goToAddress",
    address,
  });
}

/**
 * Instructs the view of the WebviewPanel to refresh the view
 * @param panel WebviewPanel to notify
 */
export function postRefreshViewMessage(panel: vscode.WebviewPanel): void {
  panel.webview.postMessage({
    viewNotification: "refreshView",
  });
}

/**
 * This type defines a replacement tuple
 */
export type ReplacementTuple = [string, string | vscode.Uri];

/**
 * Reprensents notifications sent from the web view to its UI
 */
export interface ViewCommand {
  readonly command: string;
}
