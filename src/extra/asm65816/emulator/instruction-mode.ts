import { flag_n_mask, minus_m, minus_x } from "./constants";
import Memory from "./memory";
import Processor from "./processor";
import { l, Value, w } from "./value";

//------------------------------------------------------------------------------
// Instruction Mode
//------------------------------------------------------------------------------

export default class InstructionMode {
  //----------------------------------------------------------------------------
  // Implementations
  //----------------------------------------------------------------------------

  public static Implied = new InstructionMode({
    addr: () => l(-1),
    format: () => "",
    has_address: false,
    base_length: 1,
    text: "",
  });

  public static Accumulator = new InstructionMode({
    addr: () => l(-1),
    format: () => "A",
    has_address: false,
    base_length: 1,
    text: "",
  });

  public static Immediate = new InstructionMode({
    addr: () => l(-1),
    format: ({ arg }) => `#${arg.format_byte("$")}`,
    has_address: false,
    base_length: 2,
    text: "#const",
  });

  public static Immediate_VariableA = new InstructionMode({
    addr: () => l(-1),
    format: ({ arg, arg_size }) =>
      `#${arg_size === 1 ? arg.format_byte("$") : arg.format_word("$")}`,
    has_address: false,
    base_length: 3,
    length_modifier: minus_m,
    text: "#const",
  });

  public static Immediate_VariableX = new InstructionMode({
    addr: () => l(-1),
    format: ({ arg, arg_size }) =>
      `#${arg_size === 1 ? arg.format_byte("$") : arg.format_word("$")}`,
    has_address: false,
    base_length: 3,
    length_modifier: minus_x,
    text: "#const",
  });

  public static DirectPage = new InstructionMode({
    addr: ({ arg, p }) => w(arg.byte + p.dp.word),
    format: ({ arg }) => arg.format_byte("$"),
    base_length: 2,
    text: "dp",
  });

  public static DirectPage_X = new InstructionMode({
    addr: ({ arg, p }) => w(arg.byte + p.dp.word + p.x.word),
    format: ({ arg }) => `${arg.format_byte("$")},x`,
    base_length: 2,
    text: "dp,x",
  });

  public static DirectPage_Y = new InstructionMode({
    addr: ({ arg, p }) => w(arg.byte + p.dp.word + p.y.word),
    format: ({ arg }) => `${arg.format_byte("$")},y`,
    base_length: 2,
    text: "dp,y",
  });

  public static DirectPage_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = w(arg.byte + p.dp.word);
      return l(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")})`,
    base_length: 2,
    text: "(dp)",
  });

  public static DirectPage_X_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = w(arg.byte + p.dp.word + p.x.word);
      return l(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")},x)`,
    base_length: 2,
    text: "(dp,x)",
  });

  public static DirectPage_Indirect_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = w(arg.byte + p.dp.word);
      return l(db + m.load_word(addr).word + p.y.word);
    },
    format: ({ arg }) => `(${arg.format_byte("$")}),y`,
    base_length: 2,
    text: "(dp),y",
  });

  public static DirectPage_IndirectLong = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const addr = w(arg.byte + p.dp.word);
      return m.load_long(addr);
    },
    format: ({ arg }) => `[${arg.format_byte("$")}]`,
    base_length: 2,
    text: "[dp]",
  });

  public static DirectPage_IndirectLong_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const addr = w(arg.byte + p.dp.word);
      return l(m.load_long(addr).long + p.y.word);
    },
    format: ({ arg }) => `[${arg.format_byte("$")}],y`,
    base_length: 2,
    text: "[dp],y",
  });

  public static Absolute = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return l(db + arg.word);
    },
    format: ({ arg }) => `${arg.format_word("$")}`,
    base_length: 3,
    text: "addr",
  });

  public static Absolute_X = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return l(db + w(arg.word + p.x.word).word);
    },
    format: ({ arg }) => `${arg.format_word("$")},x`,
    base_length: 3,
    text: "addr,x",
  });

  public static Absolute_Y = new InstructionMode({
    addr: ({ arg, p }) => {
      const db = p.db.byte << 16;
      return l(db + w(arg.word + p.y.word).word);
    },
    format: ({ arg }) => `${arg.format_word("$")},y`,
    base_length: 3,
    text: "addr,y",
  });

  public static Absolute_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = l(db + arg.word);
      return l(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_word("$")})`,
    base_length: 3,
    text: "(addr)",
  });

  public static Absolute_X_Indirect = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = l(db + w(arg.word + p.x.word).word);
      return l(db + m.load_word(addr).word);
    },
    format: ({ arg }) => `(${arg.format_word("$")},x)`,
    base_length: 3,
    text: "(addr,x)",
  });

  public static Absolute_IndirectLong = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = l(db + arg.word);
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
    addr: ({ arg, p }) => l(arg.long + p.x.word),
    format: ({ arg }) => `${arg.format_long("$")},x`,
    base_length: 4,
    text: "long,x",
  });

  public static StackRelative = new InstructionMode({
    addr: ({ arg, p }) => w(arg.byte + p.sp.word),
    format: ({ arg }) => `${arg.format_byte("$")},s`,
    base_length: 2,
    text: "sr,s",
  });

  public static StackRelative_Indirect_Y = new InstructionMode({
    addr: ({ arg, p, m }) => {
      const db = p.db.byte << 16;
      const addr = w(arg.byte + p.sp.word);
      return l(db + w(m.load_word(addr).word + p.y.word).word);
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
      return l(db + w(pc + length + offset).word);
    },
    format: ({ arg }) => arg.format_byte("$"),
    base_length: 2,
    text: "offsetNear",
  });

  public static OffsetLong = new InstructionMode({
    addr: ({ arg, p, pc, length }) => {
      const db = p.db.byte << 16;
      const word = arg.word;
      const offset = arg.page & flag_n_mask ? word - 0x10000 : word;
      return l(db + w(pc + length + offset).word);
    },
    format: ({ arg }) => arg.format_word("$"),
    base_length: 3,
    text: "offset",
  });

  public static BlockMove = new InstructionMode({
    addr: ({ arg }) => arg,
    format: ({ arg }) => `${arg.format_byte("$")},${arg.format_page("$")}`,
    has_address: false,
    base_length: 3,
    text: "srcBank,destBank",
  });

  //----------------------------------------------------------------------------
  // Class Definition
  //----------------------------------------------------------------------------

  public addr: (args: InstructionModeContext) => Value;
  public format: (args: InstructionModeContext) => string;
  public readonly base_length: number;
  public readonly length_modifier: number;
  public readonly has_address: boolean;
  public readonly text: string;

  public constructor(args: {
    addr: (context: InstructionModeContext) => Value;
    format: (context: InstructionModeContext) => string;
    base_length: number;
    length_modifier?: number;
    has_address?: boolean;
    text: string;
  }) {
    this.addr = args.addr;
    this.format = args.format;
    this.base_length = args.base_length;
    this.length_modifier = args.length_modifier ?? 0;
    this.has_address = args.has_address ?? true;
    this.text = args.text;
  }
}

type InstructionModeContext = {
  arg: Value;
  arg_size: number;
  p: Processor;
  m: Memory;
  pc: number;
  length: number;
};
