export type ProgramChunk = {
  origin: number;
  bytes: number[];
};

export type Program = {
  chunks: ProgramChunk[];
};
