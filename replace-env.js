const fs = require('fs');
const path = './src/environments/environment.prod.ts';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;

  const result = data.replace('__OPENROUTER_API_KEY__', process.env.OPENROUTER_API_KEY);

  fs.writeFile(path, result, 'utf8', err => {
    if (err) throw err;
  });
});
