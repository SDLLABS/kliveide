import "mocha";
import * as expect from "expect";

import { Z80Assembler } from "../../src/z80lang/assembler/assembler";
import { testCodeEmit } from "./test-helpers";
import { ExpressionValueType } from "../../src/z80lang/assembler/expressions";

describe("Assembler - fixups", () => {
  it("equ: fixup", () => {
    const compiler = new Z80Assembler();
    const source = `
      ld a,b
    Symbol1 .equ Symbol2 + 1
      ld b,c
    Symbol2 .equ 122
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.segments.length).toBe(1);
    expect(output.getSymbol("Symbol1").value.value).toBe(123);
    expect(output.getSymbol("Symbol2").value.value).toBe(122);
  });

  it("equ: circular reference", () => {
    const compiler = new Z80Assembler();
    const source = `
      ld a,b
    Symbol1 .equ Symbol2 + 1
      ld b,c
    Symbol2 .equ Symbol1 + 1
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(2);
    expect(output.errors[0].errorCode === "Z0605").toBe(true);
    expect(output.errors[1].errorCode === "Z0605").toBe(true);
  });

  it("equ: evaluation error", () => {
    const compiler = new Z80Assembler();
    const source = `
      ld a,b
    Symbol1 .equ Symbol2 + 1
      ld b,c
    Symbol2 .equ 3/0
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0606").toBe(true);
  });

  it("equ: Bit8 fixup ", () => {
    testCodeEmit(
      `
    Symbol1 .equ Symbol2 + 1
    ld b,Symbol1
    Symbol2 .equ #12F2
    `,
      0x06,
      0xf3
    );
  });

  it("equ: Bit8 circular reference", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ Symbol2 + 1
      ld b,Symbol1
    Symbol2 .equ Symbol1 + 1
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(3);
    expect(output.errors[0].errorCode === "Z0605").toBe(true);
    expect(output.errors[1].errorCode === "Z0605").toBe(true);
    expect(output.errors[2].errorCode === "Z0605").toBe(true);
  });

  it("equ: Bit16 fixup ", () => {
    testCodeEmit(
      `
      Symbol1 .equ Symbol2 + 1
        ld bc,Symbol1
      Symbol2 .equ #8003
    `,
      0x01,
      0x04,
      0x80
    );
  });

  it("equ: Bit16 circular reference", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ Symbol2 + 1
      ld bc,Symbol1
    Symbol2 .equ Symbol1 + 1
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(3);
    expect(output.errors[0].errorCode === "Z0605").toBe(true);
    expect(output.errors[1].errorCode === "Z0605").toBe(true);
    expect(output.errors[2].errorCode === "Z0605").toBe(true);
  });

  it("equ: Bit16 fixup evaluation error", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ Symbol2 + 1
      ld bc,Symbol1/0
    Symbol2 .equ #1300
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0606").toBe(true);
  });

  it("jr: forward fixup", () => {
    testCodeEmit(
      `
      jr nz,ForwAddr
      ld b,#A
    ForwAddr nop
    `,
      0x20,
      0x02,
      0x06,
      0x0a,
      0x00
    );
  });

  it("jr: backward", () => {
    testCodeEmit(
      `
    BackAddr nop
      ld b,#A
      jr nz,BackAddr
      nop
    `,
      0x00,
      0x06,
      0x0a,
      0x20,
      0xfb,
      0x00
    );
  });

  it("jr: fails with far forward jump", () => {
    const compiler = new Z80Assembler();
    const source = `
      jr nz,ForwAddr
      ld b,#A
      .skip #8103, #00
    ForwAddr nop
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0403").toBe(true);
  });

  it("jr: fails with far backward jump", () => {
    const compiler = new Z80Assembler();
    const source = `
    BackAddr nop
      .skip #8100
      ld b,#A
      jr nz,BackAddr
      nop
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0403").toBe(true);
  });

  it("equ: string fixup", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ Symbol2 + "you"
    Symbol2 .equ "hello"
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(0);
    expect(output.segments.length).toBe(1);
    expect(output.getSymbol("Symbol1").value.asString()).toBe("helloyou");
    expect(output.getSymbol("Symbol1").value.type).toBe(ExpressionValueType.String);
    expect(output.getSymbol("Symbol2").value.asString()).toBe("hello");
    expect(output.getSymbol("Symbol2").value.type).toBe(ExpressionValueType.String);
  });

  it("equ: Bit16 string", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ "hello"
      ld hl,Symbol1
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0603").toBe(true);
  });

  it("equ: Bit16 fixup string", () => {
    const compiler = new Z80Assembler();
    const source = `
    Symbol1 .equ "hello" + Symbol2
      ld hl,Symbol1
    Symbol2 .equ "you"
    `;

    const output = compiler.compile(source);

    expect(output.errorCount).toBe(1);
    expect(output.errors[0].errorCode === "Z0603").toBe(true);
    expect(output.getSymbol("Symbol1").value.asString()).toBe("helloyou");
    expect(output.getSymbol("Symbol1").value.type).toBe(ExpressionValueType.String);
    expect(output.getSymbol("Symbol2").value.asString()).toBe("you");
    expect(output.getSymbol("Symbol2").value.type).toBe(ExpressionValueType.String);
  });

});
