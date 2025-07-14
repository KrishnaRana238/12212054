import { useEffect, useState } from 'react';
import { readStore } from '../storage';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function StatsPage() {
  const [data, setData] = useState<Record<string, any>>({});
  useEffect(() => setData(readStore()), []);

  return (
    <Paper sx={{ p: 4, maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={3}>Statistics</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(r => (
              <TableRow key={r.shortCode}>
                <TableCell>
                  <Link to={`/${r.shortCode}`} target="_blank">{`/${r.shortCode}`}</Link>
                </TableCell>
                <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(r.expireAt).toLocaleString()}</TableCell>
                <TableCell>{r.clicks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}