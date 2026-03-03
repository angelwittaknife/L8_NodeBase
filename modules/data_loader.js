async function loadData(url) {
    let result = {
        data: [],
        isLoading: true,
        error: null
    };

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        result.data = await response.json();
    } catch (e) {
        result.error = e;
    } finally {
        result.isLoading = false;
    }

    return result;
}

module.exports = {
    loadData
};
