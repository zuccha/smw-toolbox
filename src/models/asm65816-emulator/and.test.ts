import { describe, expect, test } from "vitest";
import { ContextFromState } from "./_context";
import { Flag, StateFromScratch } from "./_types";
import {
  and_Absolute,
  and_AbsoluteLong,
  and_AbsoluteLong_X,
  and_Absolute_X,
  and_Absolute_Y,
  and_Direct,
  and_Direct_Indirect,
  and_Direct_IndirectLong,
  and_Direct_IndirectLong_Y,
  and_Direct_Indirect_Y,
  and_Direct_X,
  and_Direct_X_Indirect,
  and_Immediate,
  and_StackRelative,
  and_StackRelative_Indirect_Y,
} from "./and";

describe("AND addr", () => {
  describe("A 8-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12d901: 0x32, 0x12d902: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Absolute(0xd901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.db = 0x12;
      state.memory = { 0x12d901: 0x39, 0x12d902: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Absolute(0xd901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND long", () => {
  describe("A 8-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.flags = Flag.M;
      state.memory = { 0x12d901: 0x32, 0x12d902: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_AbsoluteLong(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.memory = { 0x12d901: 0x39, 0x12d902: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_AbsoluteLong(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND long,X", () => {
  describe("A 8-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.x = 0x0010;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12d911: 0x32, 0x12d912: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_AbsoluteLong_X(0x12d901, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.x = 0x1010;
      state.flags = Flag.M;
      state.memory = { 0x12e911: 0x32, 0x12e912: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_AbsoluteLong_X(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.x = 0x0010;
      state.memory = { 0x12d911: 0x39, 0x12d912: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_AbsoluteLong_X(0x12d901, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.x = 0x1e10;
      state.memory = { 0x12f711: 0x39, 0x12f712: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_AbsoluteLong_X(0x12d901, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND addr,X", () => {
  describe("A 8-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.x = 0x000a;
      state.db = 0x12;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12200b: 0x32, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_Absolute_X(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.x = 0x100a;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12300b: 0x32, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Absolute_X(0x2001, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.x = 0x000a;
      state.db = 0x12;
      state.memory = { 0x12200b: 0x39, 0x12200c: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Absolute_X(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.x = 0x100a;
      state.db = 0x12;
      state.memory = { 0x12300b: 0x39, 0x12300c: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Absolute_X(0x2001, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND addr,Y", () => {
  describe("A 8-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x000a;
      state.db = 0x12;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x12200b: 0x32, 0x12200c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_Absolute_Y(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x100a;
      state.db = 0x12;
      state.flags = Flag.M;
      state.memory = { 0x12300b: 0x32, 0x12300c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Absolute_Y(0x2001, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x000a;
      state.db = 0x12;
      state.memory = { 0x12200b: 0x39, 0x12200c: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Absolute_Y(0x2001, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x100a;
      state.db = 0x12;
      state.memory = { 0x12300b: 0x39, 0x12300c: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Absolute_Y(0x2001, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND dp", () => {
  describe("A 8-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.dp = 0x0f11;
      state.flags = Flag.M;
      state.memory = { 0x000f1b: 0x32, 0x000f1c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Direct(0x0a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.dp = 0x2094;
      state.memory = { 0x00209e: 0x39, 0x00209f: 0x14 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct(0x0a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND (dp)", () => {
  describe("A 8-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = { 0x00106a: 0xff, 0x00106b: 0x1f, 0x001fff: 0x32 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Direct_Indirect(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x001fff: 0x39,
        0x002000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_Indirect(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND [dp]", () => {
  describe("A 8-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0x32,
        0x012000: 0x11,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_Direct_IndirectLong_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0x39,
        0x012000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_IndirectLong(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND [dp],y", () => {
  describe("A 8-bit", () => {
    test("logical and with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0x11,
        0x012000: 0x32,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_Direct_IndirectLong_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("logical and with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = {
        0x00106a: 0xff,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x012fff: 0x11,
        0x013000: 0x32,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Direct_IndirectLong_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xfe,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x011fff: 0x39,
        0x012000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_IndirectLong_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("logical and with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xfe,
        0x00106b: 0x1f,
        0x00106c: 0x01,
        0x012fff: 0x39,
        0x013000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_IndirectLong_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND (dp),y", () => {
  describe("A 8-bit", () => {
    test("logical and with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x00106a: 0xff, 0x00106b: 0x1f, 0x002000: 0x32 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M | Flag.X } };
      expect(and_Direct_Indirect_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("logical and with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f29;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.flags = Flag.M;
      state.memory = { 0x00106a: 0xff, 0x00106b: 0x1f, 0x003000: 0x32 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f20, flags: Flag.M } };
      expect(and_Direct_Indirect_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and with X 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x0001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xfe,
        0x00106b: 0x1f,
        0x001fff: 0x39,
        0x002000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_Indirect_Y(0x4a, state, ctx)).toStrictEqual(output);
    });

    test("logical and with X 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f11;
      state.y = 0x1001;
      state.dp = 0x1020;
      state.memory = {
        0x00106a: 0xfe,
        0x00106b: 0x1f,
        0x002fff: 0x39,
        0x003000: 0x14,
      };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0411, flags: 0 } };
      expect(and_Direct_Indirect_Y(0x4a, state, ctx)).toStrictEqual(output);
    });
  });
});

describe("AND dp,X", () => {
  describe("A 8-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.dp = 0x0120;
      state.flags = Flag.M | Flag.X;
      state.memory = { 0x00012b: 0x05, 0x00012c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M | Flag.X } };
      expect(and_Direct_X(0x01, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x100a;
      state.dp = 0x0120;
      state.flags = Flag.M;
      state.memory = { 0x00112b: 0x05, 0x00112c: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x0f15, flags: Flag.M } };
      expect(and_Direct_X(0x01, state, ctx)).toStrictEqual(output);
    });
  });

  describe("A 16-bit", () => {
    test("logical and when X is 8-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x000a;
      state.dp = 0x0120;
      state.memory = { 0x0001d5: 0x05, 0x0001d6: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(and_Direct_X(0xab, state, ctx)).toStrictEqual(output);
    });

    test("logical and when X is 16-bit", () => {
      const state = StateFromScratch();
      state.a = 0x0f10;
      state.x = 0x1e0a;
      state.dp = 0x0120;
      state.memory = { 0x001fd5: 0x05, 0x001fd6: 0x06 };
      const ctx = ContextFromState(state);
      const output = { state: { a: 0x1515, flags: 0 } };
      expect(and_Direct_X(0xab, state, ctx)).toStrictEqual(output);
    });
  });
});

// describe("AND (dp,x)", () => {
//   describe("A 8-bit", () => {
//     test("logical and with X 8-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.x = 0x0001;
//       state.dp = 0x1020;
//       state.flags = Flag.M | Flag.X;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.X | Flag.N } };
//       expect(and_Direct_X_Indirect(0x49, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with X 16-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.x = 0x1001;
//       state.dp = 0x1020;
//       state.flags = Flag.M;
//       state.memory = {
//         0x00206a: 0xff,
//         0x00206b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0fb0, flags: Flag.M | Flag.N } };
//       expect(and_Direct_X_Indirect(0x49, state, ctx)).toStrictEqual(output);
//     });
//   });

//   describe("A 16-bit", () => {
//     test("logical and with X 8-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.x = 0x0001;
//       state.dp = 0x1020;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x20b0, flags: 0 } };
//       expect(and_Direct_X_Indirect(0x49, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with X 16-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.x = 0x1001;
//       state.dp = 0x1020;
//       state.memory = {
//         0x00206a: 0xff,
//         0x00206b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x20b0, flags: 0 } };
//       expect(and_Direct_X_Indirect(0x49, state, ctx)).toStrictEqual(output);
//     });
//   });
// });

// describe("AND #const", () => {
//   describe("A 8-bit", () => {
//     test("logical and setting no flag", () => {
//       const state = StateFromScratch();
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0001, flags: Flag.M } };
//       expect(and_Immediate(0x01, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting carry flag", () => {
//       const state = StateFromScratch();
//       state.a = 0x00ff;
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0002, flags: Flag.M | Flag.C } };
//       expect(and_Immediate(0x03, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with carry", () => {
//       const state = StateFromScratch();
//       state.a = 0x0002;
//       state.flags = Flag.M | Flag.C;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0006, flags: Flag.M } };
//       expect(and_Immediate(0x03, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with carry carrying again", () => {
//       const state = StateFromScratch();
//       state.a = 0x00ff;
//       state.flags = Flag.M | Flag.C;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0001, flags: Flag.M | Flag.C } };
//       expect(and_Immediate(0x01, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting overflow flag", () => {
//       const state = StateFromScratch();
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0040, flags: Flag.M | Flag.V } };
//       expect(and_Immediate(0x40, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting negative flag", () => {
//       const state = StateFromScratch();
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0080, flags: Flag.M | Flag.N } };
//       expect(and_Immediate(0x80, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting overflow and negative flag", () => {
//       const state = StateFromScratch();
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x00c0, flags: Flag.M | Flag.N | Flag.V } };
//       expect(and_Immediate(0xc0, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting zero flag", () => {
//       const state = StateFromScratch();
//       state.a = 0x00ff;
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0000, flags: Flag.M | Flag.Z | Flag.C } };
//       expect(and_Immediate(0x01, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and not overriding high byte of A", () => {
//       const state = StateFromScratch();
//       state.a = 0xf0ff;
//       state.flags = Flag.M;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0xf001, flags: Flag.M | Flag.C } };
//       expect(and_Immediate(0x02, state, ctx)).toStrictEqual(output);
//     });
//   });

//   describe("A 16-bit", () => {
//     test("logical and setting no flag", () => {
//       const state = StateFromScratch();
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0001, flags: 0 } };
//       expect(and_Immediate(0x0001, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting carry flag", () => {
//       const state = StateFromScratch();
//       state.a = 0xffff;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0002, flags: Flag.C } };
//       expect(and_Immediate(0x0003, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with carry", () => {
//       const state = StateFromScratch();
//       state.a = 0x0002;
//       state.flags = Flag.C;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0006, flags: 0 } };
//       expect(and_Immediate(0x0003, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and with carry carrying again", () => {
//       const state = StateFromScratch();
//       state.a = 0xffff;
//       state.flags = Flag.C;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0001, flags: Flag.C } };
//       expect(and_Immediate(0x0001, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting overflow flag", () => {
//       const state = StateFromScratch();
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x4000, flags: Flag.V } };
//       expect(and_Immediate(0x4000, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting negative flag", () => {
//       const state = StateFromScratch();
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x8000, flags: Flag.N } };
//       expect(and_Immediate(0x8000, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting overflow and negative flag", () => {
//       const state = StateFromScratch();
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0xc000, flags: Flag.N | Flag.V } };
//       expect(and_Immediate(0xc000, state, ctx)).toStrictEqual(output);
//     });

//     test("logical and setting zero flag", () => {
//       const state = StateFromScratch();
//       state.a = 0xffff;
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0000, flags: Flag.Z | Flag.C } };
//       expect(and_Immediate(0x0001, state, ctx)).toStrictEqual(output);
//     });
//   });
// });

// describe("AND sr,S", () => {
//   describe("A 8-bit", () => {
//     test("logical and", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.sp = 0x000a;
//       state.flags = Flag.M;
//       state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0f16, flags: Flag.M } };
//       expect(and_StackRelative(0x01, state, ctx)).toStrictEqual(output);
//     });
//   });

//   describe("A 16-bit", () => {
//     test("logical and", () => {
//       const state = StateFromScratch();
//       state.a = 0xf015;
//       state.sp = 0x000a;
//       state.memory = { 0x00000a: 0x05, 0x00000b: 0x06 };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0xf61a, flags: Flag.N | Flag.V } };
//       expect(and_StackRelative(0x00, state, ctx)).toStrictEqual(output);
//     });
//   });
// });

// describe("AND (sr,s),y", () => {
//   describe("A 8-bit", () => {
//     test("logical and with X 8-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.y = 0x0001;
//       state.sp = 0x1020;
//       state.flags = Flag.M | Flag.X;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0f21, flags: Flag.M | Flag.X } };
//       expect(and_StackRelative_Indirect_Y(0x4a, state, ctx)).toStrictEqual(
//         output,
//       );
//     });

//     test("logical and with X 16-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.y = 0x1001;
//       state.sp = 0x1020;
//       state.flags = Flag.M;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x002fff: 0xa0,
//         0x003000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0f21, flags: Flag.M } };
//       expect(and_StackRelative_Indirect_Y(0x4a, state, ctx)).toStrictEqual(
//         output,
//       );
//     });
//   });

//   describe("A 16-bit", () => {
//     test("logical and with X 8-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.y = 0x0001;
//       state.sp = 0x1020;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x001fff: 0xa0,
//         0x002000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0f21, flags: 0 } };
//       expect(and_StackRelative_Indirect_Y(0x4a, state, ctx)).toStrictEqual(
//         output,
//       );
//     });

//     test("logical and with X 16-bit", () => {
//       const state = StateFromScratch();
//       state.a = 0x0f10;
//       state.y = 0x1001;
//       state.sp = 0x1020;
//       state.memory = {
//         0x00106a: 0xff,
//         0x00106b: 0x1f,
//         0x002fff: 0xa0,
//         0x003000: 0x11,
//       };
//       const ctx = ContextFromState(state);
//       const output = { state: { a: 0x0f21, flags: 0 } };
//       expect(and_StackRelative_Indirect_Y(0x4a, state, ctx)).toStrictEqual(
//         output,
//       );
//     });
//   });
// });
