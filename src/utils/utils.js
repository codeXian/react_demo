export const setTokenStorage = token => {
  window.localStorage.setItem('token', token);
};

export const removeTokenStorage = () => {
  window.localStorage.removeItem('token');
};
