export function doNothing() {}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function classNames(options: [string, boolean][]): string {
  return options
    .filter((option) => option[1])
    .map((option) => option[0])
    .join(" ");
}

export function firstIndexOf<T>(
  items: T[],
  predicate: (item: T, index: number) => boolean,
): number {
  for (let i = 0; i < items.length; ++i) if (predicate(items[i]!, i)) return i;
  return items.length;
}

export function lastIndexOf<T>(
  items: T[],
  predicate: (item: T, index: number) => boolean,
): number {
  for (let i = items.length - 1; i >= 0; --i)
    if (predicate(items[i]!, i)) return i;
  return -1;
}

export function insert<T>(items: T[], index: number, item: T): T[] {
  const end = items.length - 1;
  return [...items.slice(0, index), item, ...items.slice(index, end)];
}

export function pushBack<T>(items: T[], item: T): T[] {
  return [...items.slice(1, items.length), item];
}

export function pushFront<T>(items: T[], item: T): T[] {
  return [item, ...items.slice(0, items.length - 1)];
}

export function replace<T>(items: T[], index: number, item: T): T[] {
  return [...items.slice(0, index), item, ...items.slice(index + 1)];
}

export function remove<T>(items: T[], index: number, fill: T): T[] {
  return [...items.slice(0, index), ...items.slice(index + 1), fill];
}

export function isPositiveDigit(char: string): boolean {
  return char !== "0" && char !== " " && char != "-";
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function toggle(value: boolean): boolean {
  return !value;
}

export function range(length: number): number[] {
  return Array.from(Array(length).keys());
}

export function isInRange(n: number, min: number, max: number): boolean {
  return min <= n && n <= max;
}

export function sum(numbers: number[]) {
  return numbers.reduce((partialSum, n) => partialSum + n, 0);
}

export function center(str: string, length: number, c: string = " "): string {
  const prefix = c.repeat(Math.ceil(Math.max((length - str.length) / 2, 0)));
  const suffix = c.repeat(Math.floor(Math.max((length - str.length) / 2, 0)));
  return `${prefix}${str}${suffix}`;
}

export function padL(text: string, length: number, fill: string): string {
  return `${fill.repeat(Math.max(length - text.length, 0))}${text}`;
}

export function padR(text: string, length: number, fill: string): string {
  return `${text}${fill.repeat(Math.max(length - text.length, 0))}`;
}

export function ok(_: unknown): true {
  return true;
}

export function ko(_: unknown): false {
  return false;
}

export function toBin(n: number, minLength?: number): string {
  const bin = n.toString(2);
  return minLength !== undefined ? padL(bin, minLength, "0") : bin;
}

export function toDec(n: number, minLength?: number): string {
  const dec = n.toString(10);
  return minLength !== undefined ? padL(dec, minLength, "0") : dec;
}

export function toHex(n: number, minLength?: number): string {
  const hex = n.toString(16).toUpperCase();
  return minLength !== undefined ? padL(hex, minLength, "0") : hex;
}

export function isNothingFocused(): boolean {
  return (document.activeElement ?? document.body) === document.body;
}

export const labelPattern = /^\.*[a-zA-Z0-9_]*$/;
export const labelColumnPattern = /^\.*[a-zA-Z0-9_]*:$/;

export const colorHexPattern = /^#[a-zA-Z0-9]{6}$/;
