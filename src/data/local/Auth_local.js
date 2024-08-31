export const authLocal = {
  saveToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  clearToken: () => {
    localStorage.removeItem("token");
  },
};
