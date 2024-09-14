import { describe, expect, test } from "vitest";
import { ContextFromState } from "./_context";
import { Flag, StateFromScratch } from "./_types";
import {
  adc_Direct_Byte,
  adc_Direct_Byte_S,
  adc_Direct_Byte_X,
  adc_Direct_Long,
  adc_Direct_Long_X,
  adc_Direct_Word,
  adc_Direct_Word_X,
  adc_Direct_Word_Y,
  adc_Immediate,
  adc_Indirect_Byte,
  adc_Indirect_Byte_SY,
  adc_Indirect_Byte_X,
  adc_Indirect_Byte_Y,
  adc_IndirectLong_Byte,
  adc_IndirectLong_Byte_Y,
} from "./adc";

describe("ADC addr", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12d901: 0x05, 0x12d902: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Word(0xd901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.db = 0x12;
      state.memory = { 0x12d901: 0x38, 0x12d902: 0x10 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1f48, flags: 0 } };
      expect(adc_Direct_Word(0xd901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC long", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.flags = Flag.M;
      state.memory = { 0x12d901: 0x05, 0x12d902: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Long(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.memory = { 0x12d901: 0x38, 0x12d902: 0x10 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1f48, flags: 0 } };
      expect(adc_Direct_Long(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC long,X", () => {
  describe("A 8-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x0010;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12d911: 0x05, 0x12d912: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M | Flag.X } };
      expect(adc_Direct_Long_X(0x12d901, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1010;
      state.flags = Flag.M;
      state.memory = { 0x12e911: 0x05, 0x12e912: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Long_X(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x0010;
      state.memory = { 0x12d911: 0x05, 0x12d912: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Long_X(0x12d901, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1e10;
      state.memory = { 0x12f711: 0x05, 0x12f712: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Long_X(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC addr,X", () => {
  describe("A 8-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.db = 0x12;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12200b: 0x05, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M | Flag.X } };
      expect(adc_Direct_Word_X(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x100a;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12300b: 0x05, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Word_X(0x2001, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.db = 0x12;
      state.memory = { 0x12200b: 0x05, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Word_X(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x100a;
      state.db = 0x12;
      state.memory = { 0x12300b: 0x05, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Word_X(0x2001, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC addr,Y", () => {
  describe("A 8-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x000a;
      state.db = 0x12;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12200b: 0x05, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M | Flag.X } };
      expect(adc_Direct_Word_Y(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x100a;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12300b: 0x05, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Word_Y(0x2001, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x000a;
      state.db = 0x12;
      state.memory = { 0x12200b: 0x05, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Word_Y(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x100a;
      state.db = 0x12;
      state.memory = { 0x12300b: 0x05, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Word_Y(0x2001, state, ctx)).toStrictEqual(output);
    });
  });
});

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
      const output = { state: { a: 0xf704, flags: Flag.N | Flag.V } };
      expect(adc_Direct_Byte(0x0a, state, ctx)).toStrictEqual(output);
    });

    test("addition with direct page set", () => {
      const state = StateFromScratch();
      state.a = 0xf0ff;
      state.dp = 0x1234;
      state.memory = { 0x00123e: 0x05, 0x00123f: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf704, flags: Flag.N | Flag.V } };
      expect(adc_Direct_Byte(0x0a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC (dp)", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = { 0x00106a: 0xff, 0x00106b: 0x1f, 0x001fff: 0xa0 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.N } };
      expect(adc_Indirect_Byte(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x20b0, flags: 0 } };
      expect(adc_Indirect_Byte(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC [dp]", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0xa0,
        0x012000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.X | Flag.N } };
      expect(adc_IndirectLong_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0xa0,
        0x012000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x20b0, flags: 0 } };
      expect(adc_IndirectLong_Byte(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC [dp],y", () => {
  describe("A 8-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0xa0,
        0x012000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M | Flag.X } };
      expect(adc_IndirectLong_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x012fff: 0xa0,
        0x013000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M } };
      expect(adc_IndirectLong_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0xa0,
        0x012000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_IndirectLong_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x012fff: 0xa0,
        0x013000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_IndirectLong_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC (dp),y", () => {
  describe("A 8-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M | Flag.X } };
      expect(adc_Indirect_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x002fff: 0xa0,
        0x003000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M } };
      expect(adc_Indirect_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_Indirect_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x002fff: 0xa0,
        0x003000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_Indirect_Byte_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC dp,X", () => {
  describe("A 8-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.dp = 0x0120;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x00012b: 0x05, 0x00012c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M | Flag.X } };
      expect(adc_Direct_Byte_X(0x01, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x100a;
      state.dp = 0x0120;
      state.flags = Flag.M;
      state.memory = { 0x00112b: 0x05, 0x00112c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(adc_Direct_Byte_X(0x01, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.dp = 0x0120;
      state.memory = { 0x0001d5: 0x05, 0x0001d6: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Byte_X(0xab, state, ctx)).toStrictEqual(output);
    });

    test("addition when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1e0a;
      state.dp = 0x0120;
      state.memory = { 0x001fd5: 0x05, 0x001fd6: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(adc_Direct_Byte_X(0xab, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC (dp,x)", () => {
  describe("A 8-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x0001;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.X | Flag.N } };
      expect(adc_Indirect_Byte_X(0x49, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1001;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = {
        0x00206a: 0xff,
        0x00206b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.N } };
      expect(adc_Indirect_Byte_X(0x49, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x0001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x20b0, flags: 0 } };
      expect(adc_Indirect_Byte_X(0x49, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1001;
      state.dp = 0x1020;
      state.memory = {
        0x00206a: 0xff,
        0x00206b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x20b0, flags: 0 } };
      expect(adc_Indirect_Byte_X(0x49, state, ctx)).toStrictEqual(output);
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

describe("ADC sr,S", () => {
  describe("A 8-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.sp = 0x000a;
      state.flags = Flag.M;
      state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f16, flags: Flag.M } };
      expect(adc_Direct_Byte_S(0x01, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition", () => {
      const state = StateFromScratch();
      state.a = 0xf015;
      state.sp = 0x000a;
      state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0xf61a, flags: Flag.N | Flag.V } };
      expect(adc_Direct_Byte_S(0x00, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("ADC (sr,s),y", () => {
  describe("A 8-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.sp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M | Flag.X } };
      expect(adc_Indirect_Byte_SY(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.sp = 0x1020;
      state.flags = Flag.M;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x002fff: 0xa0,
        0x003000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: Flag.M } };
      expect(adc_Indirect_Byte_SY(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("addition with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x0001;
      state.sp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0xa0,
        0x002000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_Indirect_Byte_SY(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("addition with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.y = 0x1001;
      state.sp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x002fff: 0xa0,
        0x003000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f21, flags: 0 } };
      expect(adc_Indirect_Byte_SY(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});
