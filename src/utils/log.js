import { API_BASE_URL } from '../config/uploadModules';

export const writeLog = (action) => {
  fetch(`${API_BASE_URL}/saudi-server/log/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  }).catch(() => {});
};
