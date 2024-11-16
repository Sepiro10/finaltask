const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // O sessionStorage
  return token !== null;
};
  