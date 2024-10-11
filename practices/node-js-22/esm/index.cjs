
const { getData } = require('./esm.mjs');

(async () => {
  const data = await getData();
  console.log(data);
})();

