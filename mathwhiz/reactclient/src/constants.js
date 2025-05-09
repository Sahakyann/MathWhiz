const USE_NGROK = process.env.REACT_APP_USE_NGROK === 'true';

const API_BASE_URL = USE_NGROK
  ? ''
  : 'https://localhost:7160';

export default API_BASE_URL;