import { flag_n_mask, minus_m, minus_x } from "./constants";
import Memory from "./memory";
import Processor from "./processor";
import { v, Value, word_mask } from "./value";

//------------------------------------------------------------------------------
// Instruction Mode
//------------------------------------------------------------------------------

export default class InstructionMode {
  //----------------------------------------------------------------------------
  // Implementations
  //----------------------------------------------------------------------------

  public static Implied = new InstructionMode({
    addr: () => v(-1),
    format: () => "",
    is_address: false,
    base_length: 1,
    text: "",
  });

  public static Accumulator = new InstructionMode({
    addr: () => v(-1),
    format: () => "A",
    is_address: false,
    base_length: 1,
    text: "",
  });

  public static Immediate = new InstructionMode({
    addr: () => v(-1),
    format: ({ arg }) => `#${arg.format_byte("$")}`,
    is_address: false,
    base_length: 2,
    text: "#const",
  });

  public static Immediate_VariableA = new InstructionMode({
    addr: () => v(-1),
    format: ({ arg, arg_size }) =>
      `#${arg_size === 1 ? arg.format_byte("$") : arg.format_word("$")}`,
    is_address: false,
    base_length: 3,
    length_modifier: minus_m,
    text: "#const",
  });

  public static Immediate_VariableX = new InstructionMode({
    addr: () => v(-1),
    format: ({ arg, arg_size }) =>
      `#${arg_size === 1 ? arg.format_byte("$") : arg.format_word("$")}`,
    is_address: false,
    base_length: 3,
    length_modifier: minus_x,
    text: "#const",
  });

  public static DirectPage = new InstructionMode({
    addr: ({ arg, p }) => v(arg.byte + p.dp.word),
    format: ({ arg }) => arg.format_byte("$"),
    base_length: 2,
    text: "dp",
  });

  public static DirectPage_X = new InstructionMode({
    addr: ({ arg, p }) => v(arg.byte + p.dp.word + p.x.word, word_mask),
    format: ({ arg }) => `${arg.format_byte("$")},x`,
    base_length: 2,
    text: "dp,x",
  });

  public static DirectPage_Y = new InstructionMode({
    addr: ({ arg, p }) => v(arg.byte + p.dp.word + p.y.word, word_mask),
    format: ({ arg }) => `${arg.format_byte("$")},y`,
    base_length: 2,
    text: "dp,y",
  });

  public static DirectPage_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(arg.byte + p.dp.word, word_mask);
      return v(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")})`,
    base_length: 2,
    text: "(dp)",
  });

  public static DirectPage_X_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(arg.byte + p.dp.word + p.x.word, word_mask);
      return v(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")},x)`,
    base_length: 2,
    text: "(dp,x)",
  });

  public static DirectPage_Indirect_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(arg.byte + p.dp.word, word_mask);
      return v(db + m.load_word(addr).word + p.y.word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")}),y`,
    base_length: 2,
    text: "(dp),y",
  });

  public static DirectPage_IndirectLong = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const addr = v(arg.byte + p.dp.word, word_mask);
      return m.load_long(addr);
    },
    format: ({ arg }) => `[${arg.format_byte("$")}]`,
    base_length: 2,
    text: "[dp]",
  });

  public static DirectPage_IndirectLong_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const addr = v(arg.byte + p.dp.word, word_mask);
      return v(m.load_long(addr).word + p.y.word);
    },
    format: ({ arg }) => `[${arg.format_byte("$")}],y`,
    base_length: 2,
    text: "[dp],y",
  });

  public static Absolute = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return v(db + arg.word);
    },
    format: ({ arg }) => `${arg.format_word("$")}`,
    base_length: 3,
    text: "addr",
  });

  public static Absolute_X = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return v(db + v(arg.word + p.x.word).word);
    },
    format: ({ arg }) => `${arg.format_word("$")},x`,
    base_length: 3,
    text: "addr,x",
  });

  public static Absolute_Y = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return v(db + v(arg.word + p.y.word).word);
    },
    format: ({ arg }) => `${arg.format_word("$")},y`,
    base_length: 3,
    text: "addr,y",
  });

  public static Absolute_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(db + arg.word);
      return v(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_word("$")})`,
    base_length: 3,
    text: "(addr)",
  });

  public static Absolute_X_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(db + v(arg.word + p.x.word).word);
      return v(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_word("$")},x)`,
    base_length: 3,
    text: "(addr,x)",
  });

  public static Absolute_IndirectLong = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(db + arg.word);
      return m.load_long(addr);
    },
    format: ({ arg }) => `[${arg.format_word("$")}]`,
    base_length: 3,
    text: "[addr]",
  });

  public static AbsoluteLong = new InstructionMode({
    addr: ({ arg }) => arg,
    format: ({ arg }) => `${arg.format_long("$")}`,
    base_length: 4,
    text: "long",
  });

  public static AbsoluteLong_X = new InstructionMode({
    addr: ({ arg, p }) => v(arg.long + p.x.word),
    format: ({ arg }) => `${arg.format_long("$")},x`,
    base_length: 4,
    text: "long,x",
  });

  public static StackRelative = new InstructionMode({
    addr: ({ arg, p }) => v(arg.byte + p.sp.word, word_mask),
    format: ({ arg }) => `${arg.format_byte("$")},s`,
    base_length: 2,
    text: "sr,s",
  });

  public static StackRelative_Indirect_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = v(arg.byte + p.sp.word, word_mask);
      return v(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")},s),y`,
    base_length: 2,
    text: "(sr,s),y",
  });

  public static Offset = new InstructionMode({
    addr: ({ arg, p, pc, length }) => {
      const db = p.db.byte << 16;
      const byte = arg.byte;
      const offset = byte & flag_n_mask ? byte - 0x100 : byte;
      return v(db + v(pc.word + length + offset).word);
    },
    format: ({ arg }) => arg.format_byte("$"),
    base_length: 2,
    text: "offsetNear",
  });

  public static OffsetLong = new InstructionMode({
    addr: ({ arg, pc, length }) => {
      const word = arg.word;
      const offset = arg.page & flag_n_mask ? word - 0x10000 : word;
      return v(pc.word + length + offset, word_mask);
    },
    format: ({ arg }) => arg.format_word("$"),
    base_length: 3,
    text: "offset",
  });

  public static BlockMove = new InstructionMode({
    addr: ({ arg }) => arg,
    format: ({ arg }) =>
      `${v(arg.byte).format_byte("$")},${v(arg.page).format_byte("$")}`,
    is_address: false,
    base_length: 3,
    text: "srcBank,destBank",
  });

  //----------------------------------------------------------------------------
  // Class Definition
  //----------------------------------------------------------------------------

  public addr: (args: InstructionModeContext) => Value;
  public format: (args: InstructionModeContext) => string;
  public readonly is_address: boolean;
  public readonly base_length: number;
  public readonly length_modifier: number;
  public readonly text: string;

  public constructor(args: {
    addr: (context: InstructionModeContext) => Value;
    format: (context: InstructionModeContext) => string;
    is_address?: boolean;
    base_length: number;
    length_modifier?: number;
    text: string;
  }) {
    this.addr = args.addr;
    this.format = args.format;
    this.is_address = args.is_address ?? true;
    this.base_length = args.base_length;
    this.length_modifier = args.length_modifier ?? 0;
    this.text = args.text;
  }
}

type InstructionModeContext = {
  arg: Value;
  arg_size: number;
  p: Processor;
  m: Memory;
  pc: Value;
  length: number;
};
