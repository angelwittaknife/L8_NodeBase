const path = require('path');
const envFile = process.env.ENV_FILE || '.env.development';
require('dotenv').config({ path: path.resolve(process.cwd(), envFile) });

console.log(`Current Mode: ${process.env.MODE}`);
