export const IsLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
};