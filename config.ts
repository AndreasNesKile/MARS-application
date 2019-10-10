export const HOST = process.env.VUE_APP_HOST;
export const BASE_PATH = process.env.VUE_APP_FRONTEND_BASE_PATH;
export const BACKEND_PATH = process.env.VUE_APP_BACKEND_BASE_PATH;
export const BACKEND_URL = `https://${HOST}${BACKEND_PATH}`;
export const API_URL = `${BACKEND_URL}/api/`;
export const API_TIME_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss';
