import { TextField, Paper } from '@mui/material';

interface Props {
  value: { long: string; ttl: string; custom: string };
  onChange: (field: string, val: string) => void;
}
export default function ShortenFormRow({ value, onChange }: Props) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <TextField
        fullWidth
        label="Long URL"
        value={value.long}
        onChange={e => onChange('long', e.target.value)}
      />
      <TextField
        label="TTL (minutes)"
        value={value.ttl}
        onChange={e => onChange('ttl', e.target.value)}
        sx={{ mt: 1, mr: 2 }}
      />
      <TextField
        label="Custom shortcode"
        value={value.custom}
        onChange={e => onChange('custom', e.target.value)}
        sx={{ mt: 1 }}
      />
    </Paper>
  );
}