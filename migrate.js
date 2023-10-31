require('ts-node/register');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./src/umzug.ts').migrator.runAsCLI();
