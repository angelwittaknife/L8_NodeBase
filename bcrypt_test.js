const bcrypt = require('bcrypt');

const passwords = Array.from({ length: 13 }, (_, i) => `password${i + 1}`);
const saltRounds = 10;

console.log('Starting simultaneous encryption of 13 passwords...');

const startAll = Date.now();

Promise.all(passwords.map((pw, index) => {
    const start = Date.now();
    return bcrypt.hash(pw, saltRounds).then(hash => {
        const end = Date.now();
        console.log(`Password ${index + 1}: Encrypted in ${end - start}ms`);
        return { pw, hash, time: end - start };
    });
})).then(results => {
    const endAll = Date.now();
    console.log(`Total time for all: ${endAll - startAll}ms`);

    console.log('\n--- Conclusion ---');
    console.log('The time for each password might be similar or show some variance depending on CPU scheduling.');
    console.log('Since bcrypt is a CPU-intensive task (using libuv thread pool), encrypting many at once');
    console.log('can lead to higher individual times compared to serial execution if the thread pool');
    console.log('is exhausted (default is 4 threads). This demonstrates how bcrypt is designed to be slow');
    console.log('to prevent brute-force attacks.');
});
