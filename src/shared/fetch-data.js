const cache = {};

export const fetchData = (username, id) => {
  if (cache[username]) return Promise.resolve(cache[username]);
  if (id && cache[id]) return Promise.resolve(cache[id]);

  let endpoint = `https://api.codersrank.io/v2/users/${username || id}/`;
  if (id) endpoint += '?get_by=id';

  let badgesEndpoint = `https://api.codersrank.io/v2/users/${username || id}/badges`;
  if (id) badgesEndpoint += '?get_by=id';

  const getUser = () =>
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  const getBadges = () =>
    fetch(badgesEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  return Promise.all([getUser(), getBadges()])
    .then(([user, badges]) => {
      // eslint-disable-next-line
      const data = {
        ...user,
        ...badges,
      };
      if (id) {
        cache[id] = data;
      } else {
        cache[username] = data;
      }
      return data;
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
      return Promise.reject(err);
    });
};
