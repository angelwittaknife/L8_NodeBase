const { loadData } = require('./modules/data_loader');
const { sortStringsNoSpaces } = require('./modules/sorter');
const { createFolder, writeFile, listProjectFiles } = require('./modules/fs_module');
const path = require('path');

async function main() {
    console.log('Fetching users from JSONPlaceholder...');
    const result = await loadData('https://jsonplaceholder.typicode.com/users');

    if (result.error) {
        console.error('Error fetching data:', result.error);
        return;
    }

    console.log(`Loaded ${result.data.length} users.`);

    const names = result.data.map(user => user.name);
    const emails = result.data.map(user => user.email);

    console.log('Sorting names...');
    const sortedNames = sortStringsNoSpaces(names);

    const sortedUsers = [...result.data].sort((a, b) => {
        const cleanA = a.name.replace(/\s+/g, '').toLowerCase();
        const cleanB = b.name.replace(/\s+/g, '').toLowerCase();
        if (cleanA < cleanB) return -1;
        if (cleanA > cleanB) return 1;
        return 0;
    });

    const finalNames = sortedUsers.map(u => u.name).join('\n');
    const finalEmails = sortedUsers.map(u => u.email).join('\n');

    const usersDir = path.join(__dirname, 'users');
    console.log(`Creating directory: ${usersDir}`);
    createFolder(usersDir);

    console.log('Writing to files...');
    writeFile(path.join(usersDir, 'names.txt'), finalNames);
    writeFile(path.join(usersDir, 'emails.txt'), finalEmails);

    console.log('--- Project Files (excluding service) ---');
    console.log(listProjectFiles(__dirname));

    console.log('\nTask completed successfully!');
}

main();
