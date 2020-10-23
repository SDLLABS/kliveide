import "mocha";
import * as expect from "expect";

import { codeRaisesError, testCodeEmit } from "./test-helpers";
import { AssemblerOptions } from "../../src/z80lang/assembler/assembler-in-out";
import { Z80Assembler } from "../../src/z80lang/assembler/assembler";

describe("Assembler - .while", () => {
  it("ent - fails in while", () => {
    codeRaisesError(
      `
      counter = 0
      .while counter < 3
      .ent #8000
      counter = counter + 1
      .wend
    `,
      "Z0310"
    );
  });

  it("xent - fails in while", () => {
    codeRaisesError(
      `
      counter = 0
      .while counter < 3
      .xent #8000
      counter = counter + 1
      .wend
    `,
      "Z0310"
    );
  });

  it(".endw - fails without while", () => {
    codeRaisesError(".endw", "Z0704");
    codeRaisesError(".ENDW", "Z0704");
    codeRaisesError("endw", "Z0704");
    codeRaisesError("ENDW", "Z0704");
    codeRaisesError(".wend", "Z0704");
    codeRaisesError(".WEND", "Z0704");
    codeRaisesError("wend", "Z0704");
    codeRaisesError("WEND", "Z0704");
  });

  it("while - missing loop end", () => {
    codeRaisesError(
      `
      .while true
      ld a,b
    `,
      "Z0701"
    );
  });

  it("while - fails with string", () => {
    codeRaisesError(
      `
      .while "Hello"
      ld a,b
      .endw
    `,
      "Z0603"
    );
  });

  it("while - too long loop", () => {
    codeRaisesError(
      `
      .while true
      .endw
    `,
      "Z0702"
    );
  });

  it("too many errors", () => {
    const compiler = new Z80Assembler();
    const options = new AssemblerOptions();
    options.maxLoopErrorsToReport = 3;
    const source = `
    counter = 0;
    .while counter < 100
        Value: .var 100 + Other;
        counter = counter + 1;
    .wend
    `;

    const output = compiler.compile(source, options);

    expect(output.errorCount).toBe(4);
    expect(output.errors[3].errorCode === "Z0703").toBe(true);
  });

  it("while - empty body", () => {
    testCodeEmit(
      `
      .while false
      .wend
    `
    );
  });

  it("while - executes zero time", () => {
    testCodeEmit(
      `
      .while false
        inc a
      .wend
    `
    );
  });

  it("while - labeled with empty body", () => {
    const compiler = new Z80Assembler();
    const source = `
    counter = 1;
    MyLoop: .while counter <= 3
      counter = counter + 1
      .wend
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.containsSymbol("MyLoop")).toBe(true);
    expect(output.getSymbol("MyLoop").value.value).toBe(0x8000);
  });

  it("while - hanging label with empty body", () => {
    const compiler = new Z80Assembler();
    const source = `
    counter = 1;
    MyLoop:
      .while counter <= 3
      counter = counter + 1
      .wend
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.containsSymbol("MyLoop")).toBe(true);
    expect(output.getSymbol("MyLoop").value.value).toBe(0x8000);
  });

  it("while - end labeled with empty body", () => {
    const compiler = new Z80Assembler();
    const source = `
    counter = 1;
    .while counter <= 3
        counter = counter + 1
    MyEnd: .wend
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.containsSymbol("MyEnd")).toBe(false);
  });

  it("while - hanging end labeled with empty body", () => {
    const compiler = new Z80Assembler();
    const source = `
    counter = 1;
    .while counter <= 3
        counter = counter + 1
    MyEnd:
      .wend
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.containsSymbol("MyEnd")).toBe(false);
  });

  it("while - invalid condition", () => {
    codeRaisesError(
      `
      .while 3+unknown
      .wend
    `,
      "Z0605"
    );
  });

  it("while - valid counter", () => {
    testCodeEmit(
      `
      later: .equ 5
      count = 1
      .while count < later
          count = count + 1
      .wend
    `
    );
  });

  it("emit - single line", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ld bc,#1234
        counter = counter + 1
    .wend
    `,
      0x01,
      0x34,
      0x12,
      0x01,
      0x34,
      0x12
    );
  });

  it("emit - multiple lines", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        inc b
        inc c
        inc d
        counter = counter + 1
    .wend
    `,
      0x04,
      0x0c,
      0x14,
      0x04,
      0x0c,
      0x14
    );
  });

  it("emit - internal label", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ThisLabel: ld bc,ThisLabel
        counter = counter + 1
    .wend
    `,
      0x01,
      0x00,
      0x80,
      0x01,
      0x03,
      0x80
    );
  });

  it("emit - internal label with fixup", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ld bc,ThisLabel
        ThisLabel: nop
        counter = counter + 1
    .wend
    `,
      0x01,
      0x03,
      0x80,
      0x00,
      0x01,
      0x07,
      0x80,
      0x00
    );
  });

  it("emit - with start label", () => {
    testCodeEmit(
      `
    counter = 0
    StartLabel: .while counter < 2
        ld bc,StartLabel
        nop
        counter = counter + 1
    .wend
    `,
      0x01,
      0x00,
      0x80,
      0x00,
      0x01,
      0x00,
      0x80,
      0x00
    );
  });

  it("emit - with end label", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ld bc,EndLabel
        nop
        counter = counter + 1
    EndLabel .wend
    `,
      0x01,
      0x04,
      0x80,
      0x00,
      0x01,
      0x08,
      0x80,
      0x00
    );
  });

  it("emit - external fixup label", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ld bc,OuterLabel
        nop
        counter = counter + 1
    .wend
    OuterLabel: nop
    `,
      0x01,
      0x08,
      0x80,
      0x00,
      0x01,
      0x08,
      0x80,
      0x00,
      0x00
    );
  });

  it("emit - nested loop, no label", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 2
        ld bc,#1234
        .loop 3
            inc a
        .endl
        counter = counter + 1
    .wend
    `,
      0x01,
      0x34,
      0x12,
      0x3c,
      0x3c,
      0x3c,
      0x01,
      0x34,
      0x12,
      0x3c,
      0x3c,
      0x3c
    );
  });

  it("emit - nested loop, end labels #1", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 1
        inc a
        .loop 2
            ld hl,EndLabel
            ld bc,NopLabel
        EndLabel: .endl
        NopLabel: nop
        counter = counter + 1
    .wend
    `,
      0x3c,
      0x21,
      0x07,
      0x80,
      0x01,
      0x0d,
      0x80,
      0x21,
      0x0d,
      0x80,
      0x01,
      0x0d,
      0x80,
      0x00
    );
  });

  it("emit - nested loop, end labels #2", () => {
    testCodeEmit(
      `
    counter = 0
    .while counter < 1
        inc a
        counter1 = 0
        .while counter1 < 2
            ld hl,EndLabel
            ld bc,NopLabel
            counter1 = counter1 + 1
        EndLabel:.wend
        NopLabel: nop
        counter = counter + 1
    .wend
    `,
      0x3c,
      0x21,
      0x07,
      0x80,
      0x01,
      0x0d,
      0x80,
      0x21,
      0x0d,
      0x80,
      0x01,
      0x0d,
      0x80,
      0x00
    );
  });

  it("emit - while with counter", () => {
    testCodeEmit(
      `
    counter = 0;
    .while counter < 3
        .db $cnt
        counter = counter + 1                    
    .endw
    `,
      0x01,
      0x02,
      0x03
    );
  });

  it("emit - nested loop with counters", () => {
    testCodeEmit(
      `
    counter = 0;
    .while counter < 3
        .db $cnt
        .loop 2
            .db $cnt
        .endl
        counter = counter + 1                    
    .endw
    `,
      0x01,
      0x01,
      0x02,
      0x02,
      0x01,
      0x02,
      0x03,
      0x01,
      0x02
    );
  });
});
