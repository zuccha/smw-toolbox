export function pad_l(text: string, length: number, fill: string): string {
  return `${fill.repeat(length - text.length)}${text}`;
}

export function pad_r(text: string, length: number, fill: string): string {
  return `${text}${fill.repeat(length - text.length)}`;
}

export function to_hex(n: number, minLength: number): string {
  const hex = n.toString(16).toUpperCase();
  return pad_l(hex, minLength, "0");
}

export function format_addr(addr: number): string {
  return `[${to_hex((addr >> 16) & 0xff, 2)}:${to_hex(addr & 0xffff, 4)}]`;
}
