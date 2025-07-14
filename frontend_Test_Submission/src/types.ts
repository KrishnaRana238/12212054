export interface Click {
  ts: string;
  source: string;
  geo: string;
}

export interface ShortRecord {
  longUrl: string;
  shortCode: string;
  createdAt: string;
  expireAt: string;
  clicks: Click[];
}
export {};