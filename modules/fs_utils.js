const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const SERVICE_FILES = ['.git', 'node_modules', '.env', '.gitignore', 'package.json', 'package-lock.json', '.vscode'];

const fsUtils = {
    writeFile: (filePath, data) => fs.writeFileSync(filePath, data),
    writeFileAsync: async (filePath, data) => await fsPromises.writeFile(filePath, data),

    readFile: (filePath) => fs.readFileSync(filePath, 'utf8'),
    readFileAsync: async (filePath) => await fsPromises.readFile(filePath, 'utf8'),

    changeFile: (filePath, data) => fs.writeFileSync(filePath, data),
    changeFileAsync: async (filePath, data) => await fsPromises.writeFile(filePath, data),

    clearFile: (filePath) => fs.writeFileSync(filePath, ''),
    clearFileAsync: async (filePath) => await fsPromises.writeFile(filePath, ''),

    cleanNoise: (filePath) => {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = content.replace(/[0-9]/g, '').toLowerCase();
        fs.writeFileSync(filePath, cleaned);
    },
    cleanNoiseAsync: async (filePath) => {
        const content = await fsPromises.readFile(filePath, 'utf8');
        const cleaned = content.replace(/[0-9]/g, '').toLowerCase();
        await fsPromises.writeFile(filePath, cleaned);
    },

    copyFile: (src, dest) => fs.copyFileSync(src, dest),
    copyFileAsync: async (src, dest) => await fsPromises.copyFile(src, dest),

    createFolder: (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    },
    createFolderAsync: async (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            await fsPromises.mkdir(dirPath, { recursive: true });
        }
    },

    removeFolder: (dirPath) => fs.rmSync(dirPath, { recursive: true, force: true }),
    removeFolderAsync: async (dirPath) => await fsPromises.rm(dirPath, { recursive: true, force: true }),

    listProjectFiles: (dir) => {
        const result = [];
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (SERVICE_FILES.includes(file)) continue;
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                result.push(...fsUtils.listProjectFiles(fullPath));
            } else {
                result.push(fullPath);
            }
        }
        return result;
    },
    listProjectFilesAsync: async (dir) => {
        const result = [];
        const files = await fsPromises.readdir(dir);
        for (const file of files) {
            if (SERVICE_FILES.includes(file)) continue;
            const fullPath = path.join(dir, file);
            const stat = await fsPromises.stat(fullPath);
            if (stat.isDirectory()) {
                const subFiles = await fsUtils.listProjectFilesAsync(fullPath);
                result.push(...subFiles);
            } else {
                result.push(fullPath);
            }
        }
        return result;
    },

    deleteAllNonService: (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (SERVICE_FILES.includes(file)) continue;
            const fullPath = path.join(dir, file);
            fs.rmSync(fullPath, { recursive: true, force: true });
        }
    },
    deleteAllNonServiceAsync: async (dir) => {
        const files = await fsPromises.readdir(dir);
        for (const file of files) {
            if (SERVICE_FILES.includes(file)) continue;
            const fullPath = path.join(dir, file);
            await fsPromises.rm(fullPath, { recursive: true, force: true });
        }
    }
};

module.exports = fsUtils;
