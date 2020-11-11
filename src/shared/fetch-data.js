const cache = {};

export const fetchData = (username) => {
  if (cache[username]) return Promise.resolve(cache[username]);

  return fetch('https://api.codersrank.io/app/candidate/GetScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((res) => res.json())
    .then((data) => {
      cache[username] = data;
      return data;
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
      return Promise.reject(err);
    });
};
