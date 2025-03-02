const api = import.meta.env.VITE_BACKEND_URL;

export const apiData = {
  login: `${api}/api/login`,
  register: `${api}/api/register`,
  verify: `${api}/api/verify`,
  logout: `${api}/api/logout`,
};
