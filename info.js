require('dotenv').config();

console.log('--- User Info ---');
console.log(`First Name: ${process.env.FIRST_NAME}`);
console.log(`Last Name: ${process.env.LAST_NAME}`);
console.log(`Group: ${process.env.GROUP_NUMBER}`);
console.log(`List Number: ${process.env.LIST_NUMBER}`);
console.log(`Mode: ${process.env.MODE}`);
