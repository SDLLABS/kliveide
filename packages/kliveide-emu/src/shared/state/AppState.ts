import { RegisterData } from "../spectrum/api-data";

/**
 * Represents the state of the application
 */
export interface AppState {
  /**
   * Signs if the application has the focus
   */
  appHasFocus?: boolean;

  /**
   * Emulator panel state
   */
  emulatorPanelState?: EmulatorPanelState;

  /**
   * Data about the running virtual machine
   */
  vmInfo?: VmInfo;

  /**
   * Emulator command to execute
   */
  emulatorCommand?: string;

  /**
   * Breakpoints
   */
  breakpoints?: number[];

  /**
   * The current IDE configuration
   */
  ideConfiguration?: IdeConfiguration;
}

/**
 * Represents the state of the emulator panel
 */
export interface EmulatorPanelState {
  width?: number;
  height?: number;
  zoom?: number;
  engineInitialized?: boolean;
  executionState?: number;
  runsInDebug?: boolean;
  tapeContents?: Uint8Array;
  keyboardPanel?: boolean;
  shadowScreen?: boolean;
  beamPosition?: boolean;
  fastLoad?: boolean;
  startCount?: number;
  frameCount?: number;
  muted?: boolean;
  memoryContents?: Uint8Array;
  memWriteMap?: Uint8Array;
  savedData?: Uint8Array;
}

/**
 * Represents the data about the running virtual machine
 */
export interface VmInfo {
  registers?: RegisterData
}

/**
 * Represents the configuration data sent by the IDE
 */
export interface IdeConfiguration {
  /**
   * The absolute path of the current project folder
   */
  projectFolder: string;

  /**
   * The current SAVE folder
   */
  saveFolder: string;
}