function sortStringsNoSpaces(strings) {
    return [...strings].sort((a, b) => {
        const cleanA = a.replace(/\s+/g, '').toLowerCase();
        const cleanB = b.replace(/\s+/g, '').toLowerCase();
        if (cleanA < cleanB) return -1;
        if (cleanA > cleanB) return 1;
        return 0;
    });
}

module.exports = {
    sortStringsNoSpaces
};
