//------------------------------------------------------------------------------
// Processor Snapshot
//------------------------------------------------------------------------------

export type ProcessorSnapshot = {
  readonly a: number;
  readonly x: number;
  readonly y: number;

  readonly db: number;

  readonly dp: number;
  readonly sp: number;

  readonly pb: number;
  readonly pc: number;

  readonly flag_n: 0 | 1;
  readonly flag_v: 0 | 1;
  readonly flag_m: 0 | 1;
  readonly flag_x: 0 | 1;
  readonly flag_d: 0 | 1;
  readonly flag_i: 0 | 1;
  readonly flag_z: 0 | 1;
  readonly flag_c: 0 | 1;
  readonly flag_e: 0 | 1;
  readonly flag_b: 0 | 1;
};
