const fs = require('fs');

// BEGIN
const bump = (data, to) => {
  let key = to;
  if (key === undefined) {
    key = 'patch';
  }

  const [major, minor, patch] = data.version.split('.').map((v) => Number(v));
  const map = {
    major: () => ({ version: `${major + 1}.0.0` }),
    minor: () => ({ version: `${major}.${minor + 1}.0` }),
    patch: () => ({ version: `${major}.${minor}.${patch + 1}` }),
  };

  return map[key]();
};

const upVersion = (pathToFile, to) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const bumped = bump(JSON.parse(data), to);
  fs.writeFileSync(pathToFile, JSON.stringify(bumped));
};
// END

module.exports = { upVersion };
