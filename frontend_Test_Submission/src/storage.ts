import { ShortRecord } from './types';
const KEY = 'urlStore';
export const readStore = (): Record<string, ShortRecord> =>
  JSON.parse(localStorage.getItem(KEY) || '{}');
export const writeStore = (s: Record<string, ShortRecord>) =>
  localStorage.setItem(KEY, JSON.stringify(s));
export {};   