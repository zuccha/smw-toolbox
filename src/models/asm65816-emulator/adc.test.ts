import { describe, expect, test } from "vitest";
import { ContextFromState } from "./_context";
import { Flag, StateFromScratch } from "./_types";
import { adc_Direct_Byte, adc_Immediate } from "./adc";

describe("ADC dp", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0xf0ff;
      state.flags = Flag.M;
      state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf004, flags: Flag.M | Flag.C } };
      expect(adc_Direct_Byte(0x0a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition adding a word when A is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0xf0ff;
      state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf104, flags: Flag.N | Flag.V } };
      expect(adc_Direct_Byte(0x0a, state, ctx)).toStrictEqual(output);
    });

    test("addition with direct page set", () => {
      const state = StateFromScratch();
      state.a = 0xf0ff;
      state.dp = 0x1234;
      state.memory = { 0x00123e: 0x05, 0x00123f: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf104, flags: Flag.N | Flag.V } };
      expect(adc_Direct_Byte(0x0a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC #const", () => {
  describe("A 8-bit", () => {
    test("addition setting no flag", () => {
      const state = StateFromScratch();
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0001, flags: Flag.M } };
      expect(adc_Immediate(0x01, state, ctx)).toStrictEqual(output);
    });

    test("addition setting carry flag", () => {
      const state = StateFromScratch();
      state.a = 0x00ff;
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0002, flags: Flag.M | Flag.C } };
      expect(adc_Immediate(0x03, state, ctx)).toStrictEqual(output);
    });

    test("addition with carry", () => {
      const state = StateFromScratch();
      state.a = 0x0002;
      state.flags = Flag.M | Flag.C;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0006, flags: Flag.M } };
      expect(adc_Immediate(0x03, state, ctx)).toStrictEqual(output);
    });

    test("addition with carry carrying again", () => {
      const state = StateFromScratch();
      state.a = 0x00ff;
      state.flags = Flag.M | Flag.C;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0001, flags: Flag.M | Flag.C } };
      expect(adc_Immediate(0x01, state, ctx)).toStrictEqual(output);
    });

    test("addition setting overflow flag", () => {
      const state = StateFromScratch();
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0040, flags: Flag.M | Flag.V } };
      expect(adc_Immediate(0x40, state, ctx)).toStrictEqual(output);
    });

    test("addition setting negative flag", () => {
      const state = StateFromScratch();
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0080, flags: Flag.M | Flag.N } };
      expect(adc_Immediate(0x80, state, ctx)).toStrictEqual(output);
    });

    test("addition setting overflow and negative flag", () => {
      const state = StateFromScratch();
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x00c0, flags: Flag.M | Flag.N | Flag.V } };
      expect(adc_Immediate(0xc0, state, ctx)).toStrictEqual(output);
    });

    test("addition setting zero flag", () => {
      const state = StateFromScratch();
      state.a = 0x00ff;
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0000, flags: Flag.M | Flag.Z | Flag.C } };
      expect(adc_Immediate(0x01, state, ctx)).toStrictEqual(output);
    });

    test("addition not overriding high byte of A", () => {
      const state = StateFromScratch();
      state.a = 0xf0ff;
      state.flags = Flag.M;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf001, flags: Flag.M | Flag.C } };
      expect(adc_Immediate(0x02, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition setting no flag", () => {
      const state = StateFromScratch();
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0001, flags: 0 } };
      expect(adc_Immediate(0x0001, state, ctx)).toStrictEqual(output);
    });

    test("addition setting carry flag", () => {
      const state = StateFromScratch();
      state.a = 0xffff;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0002, flags: Flag.C } };
      expect(adc_Immediate(0x0003, state, ctx)).toStrictEqual(output);
    });

    test("addition with carry", () => {
      const state = StateFromScratch();
      state.a = 0x0002;
      state.flags = Flag.C;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0006, flags: 0 } };
      expect(adc_Immediate(0x0003, state, ctx)).toStrictEqual(output);
    });

    test("addition with carry carrying again", () => {
      const state = StateFromScratch();
      state.a = 0xffff;
      state.flags = Flag.C;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0001, flags: Flag.C } };
      expect(adc_Immediate(0x0001, state, ctx)).toStrictEqual(output);
    });

    test("addition setting overflow flag", () => {
      const state = StateFromScratch();
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x4000, flags: Flag.V } };
      expect(adc_Immediate(0x4000, state, ctx)).toStrictEqual(output);
    });

    test("addition setting negative flag", () => {
      const state = StateFromScratch();
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x8000, flags: Flag.N } };
      expect(adc_Immediate(0x8000, state, ctx)).toStrictEqual(output);
    });

    test("addition setting overflow and negative flag", () => {
      const state = StateFromScratch();
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xc000, flags: Flag.N | Flag.V } };
      expect(adc_Immediate(0xc000, state, ctx)).toStrictEqual(output);
    });

    test("addition setting zero flag", () => {
      const state = StateFromScratch();
      state.a = 0xffff;
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0000, flags: Flag.Z | Flag.C } };
      expect(adc_Immediate(0x0001, state, ctx)).toStrictEqual(output);
    });
  });
});
