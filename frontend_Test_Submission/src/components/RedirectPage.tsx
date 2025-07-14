import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readStore, writeStore } from '../storage';
import { log } from '../logger';


export default function RedirectPage() {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    const store = readStore();
    const rec = store[code!];
    if (!rec) {
      log('warn', '404 redirect', { code });
      alert('Short link not found');
      return;
    }
    if (new Date(rec.expireAt) < new Date()) {
      log('warn', 'Expired link', { code });
      alert('Link expired');
      return;
    }

    const click = {
      ts: new Date().toISOString(),
      source: document.referrer || 'direct',
      geo: 'Unknown'
    };
    rec.clicks.push(click);
    writeStore(store);
    log('info', 'Redirect', { code });
    window.location.replace(rec.longUrl);
  }, [code]);

  return <p>Redirecting...</p>;
}