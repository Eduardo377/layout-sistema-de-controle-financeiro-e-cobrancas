const fetcher = (endpoint, method = "GET", body) => {
  return fetch(`${process.env.REACT_APP_URL_BASE}/${endpoint}`, {
    method: `${method}`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(body),
  });
};

export default fetcher;
