function checkUrlForIncludeString(url, str) {
    if (url.includes(str)) {
        return true;
    }
    return false;
}

module.exports = {
    checkUrlForIncludeString,
}