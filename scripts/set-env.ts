// scripts/set-env.ts

const fs = require('fs');
const key = process.env["OPEN_ROUTER_KEY"] || '';

const prodEnvConfig = `
export const environment = {
  production: true,
  OPEN_ROUTER_KEY: '${key}'
};
`;

fs.writeFileSync('src/environments/environment.prod.ts', prodEnvConfig);
