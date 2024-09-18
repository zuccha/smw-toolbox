export function padL(text: string, length: number, fill: string): string {
  return `${fill.repeat(length - text.length)}${text}`;
}

export function padR(text: string, length: number, fill: string): string {
  return `${text}${fill.repeat(length - text.length)}`;
}

export function toHex(n: number, minLength: number): string {
  const hex = n.toString(16).toUpperCase();
  return padL(hex, minLength, "0");
}
