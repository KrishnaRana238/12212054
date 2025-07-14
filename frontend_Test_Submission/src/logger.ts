
export const log = (level: 'info'|'warn'|'error', msg: string, meta?: any) => {
  fetch('http://localhost:4001/log', {   
    method: 'POST',
    body: JSON.stringify({ level, msg, meta }),
    headers: { 'Content-Type': 'application/json' }
  }).catch(()=>{});
};
export {};