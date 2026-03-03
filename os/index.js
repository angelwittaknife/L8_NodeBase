const os = require('os');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function getOsInfo() {
    console.log('--- OS Basic Info ---');
    console.log(`Platform: ${os.platform()}`);
    console.log(`Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Home Directory: ${os.homedir()}`);
    console.log(`Hostname: ${os.hostname()}`);
    console.log('Network Interfaces:', os.networkInterfaces());
}

function checkFreeMemory() {
    const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024);
    console.log(`Free memory: ${freeMemoryGB.toFixed(2)} GB`);
    return freeMemoryGB > 4;
}

function getOsInfoConditional() {
    const mode = process.env.MODE;
    if (mode === 'admin') {
        getOsInfo();
    } else {
        console.log('Access denied: You must be an admin to view OS info.');
    }
}

console.log('--- OS Module Testing ---');
console.log('Is free memory > 4GB?', checkFreeMemory());
getOsInfoConditional();

module.exports = {
    getOsInfo,
    checkFreeMemory,
    getOsInfoConditional
};
