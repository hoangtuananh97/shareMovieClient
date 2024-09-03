export const getLocalStorage = () => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('token'));
}
