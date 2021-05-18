const loadTokenFromSessionStorage = () => {
    return JSON.parse(window.sessionStorage.getItem("token"));
};

const saveTokenToSessionStorage = (data) => {
    window.sessionStorage.setItem("token", JSON.stringify(data));
};

export {
    loadTokenFromSessionStorage,
    saveTokenToSessionStorage
}