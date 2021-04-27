const axios = require('axios');

// BEGIN
const get = async (url) => {
  const r = await axios.get(url);
  return r.data;
};

const post = async (url, data) => {
  await axios.post(url, data);
};
// END

module.exports = { get, post };
