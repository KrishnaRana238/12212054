import { nanoid } from 'nanoid';
import { readStore, writeStore } from './storage';
import { log } from './logger';

function validUrl(str: string) {
  try { new URL(str); return true; } catch { return false; }
}

export async function addUrl({ long, ttl, custom }: { long: string, ttl?: string, custom?: string }) {
  if (!validUrl(long)) throw new Error('Malformed URL');

  let code = custom?.trim();
  if (code) {
    if (!/^[a-zA-Z0-9]{3,}$/.test(code)) throw new Error('Custom code must be 3+ alphanumeric');
    // If user really wants that code, keep it; but we still check once.
    const store = readStore();
    if (store[code]) throw new Error('Shortcode already in use');
  } else {
    // Auto-generate until free
    while (true) {
      const store = readStore();          // always latest
      code = nanoid(6);
      if (!store[code]) break;
    }
  }

  const minutes = ttl ? parseInt(ttl, 10) : 30;
  if (isNaN(minutes) || minutes <= 0) throw new Error('TTL must be positive integer');

  const now = new Date();
  const expire = new Date(now.getTime() + minutes * 60_000);

  const record = {
    longUrl: long,
    shortCode: code,
    createdAt: now.toISOString(),
    expireAt: expire.toISOString(),
    clicks: []
  };
  const store = readStore();
  store[code] = record;
  writeStore(store);
  log('info', 'Shortened', { code, long });
  return record;
}

export {};