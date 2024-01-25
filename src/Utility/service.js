export const generateHeader = (token, oHeader) => {
  if (token) {
    return { Authorization: `Bearer ${token}`, ...oHeader };
  }
  return { ...oHeader };
};

export const doAjax = (token, url, method, body) => {
  let requestParam = {};
  if (body) {
    requestParam = {
      method: method,
      headers: generateHeader(token, {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    };
  } else {
    requestParam = {
      method: method,
      headers: generateHeader(token, {
        "Content-Type": "application/json",
      }),
    };
  }

  return fetch(url, requestParam).then((res) => res.json());
};
