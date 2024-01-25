export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const validToken = (token) => {
  const decodedJwt = parseJwt(token);
  if (decodedJwt.exp * 1000 < Date.now()) {
    return false;
  } else {
    return true;
  }
};
