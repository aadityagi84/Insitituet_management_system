const api = import.meta.env.VITE_BACKEND_URL;

export const apiData = {
  login: `${api}/api/login`,
  register: `${api}/api/register`,
  verify: `${api}/api/verify`,
  logout: `${api}/api/logout`,
  // admin --
  adminUsersdata: `${api}/api/profile`,
  adminSingleData: (id) => `${api}/api/profile/${id}`,
  updateUser: (id) => `${api}/api/update/${id}`,

  // student
  studentData: `${api}/api/getStudent`,
  teacherdata: `${api}/api/getteacher`,
};
