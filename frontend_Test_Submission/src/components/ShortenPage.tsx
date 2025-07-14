import { useState } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { nanoid } from 'nanoid';
import { addUrl } from '../service';
import { log } from '../logger';
import ShortenFormRow from './ShortenFormRow';

export default function ShortenPage() {
  const [rows, setRows] = useState(
    Array(5).fill({ long: '', ttl: '', custom: '' })
  );
  const [results, setResults] = useState<any[]>([]);

  const change = (i: number, field: string, val: string) =>
    setRows(p => p.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));

  const submit = async () => {
    const validRows = rows.filter(r => r.long.trim());
    try {
      const res = await Promise.all(validRows.map(r => addUrl(r)));
      setResults(res);
      log('info', 'Shortened URLs', { count: res.length });

      // RESET FORM so user can shorten again
      setRows(Array(5).fill({ long: '', ttl: '', custom: '' }));
    } catch (e: any) {
      log('error', e.message);
      alert(e.message);
    }
  };

  return (
    <Box p={4} maxWidth={800} mx="auto">
      <Typography variant="h4" mb={3}>URL Shortener</Typography>

      {rows.map((r, i) => (
        <ShortenFormRow
          key={i}
          value={r}
          onChange={(f, v) => change(i, f, v)}
        />
      ))}

      <Button
        variant="contained"
        onClick={submit}
        disabled={rows.every(r => !r.long.trim())}
        sx={{ mt: 2 }}
      >
        Shorten All
      </Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5">Result</Typography>
          {results.map(r => (
            <Paper key={r.shortCode} sx={{ p: 2, my: 1 }}>
              <Typography>
                Short: <a href={`http://localhost:3000/${r.shortCode}`} target="_blank" rel="noreferrer">{`http://localhost:3000/${r.shortCode}`}</a>
              </Typography>
              <Typography variant="body2">Expires: {new Date(r.expireAt).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}