export const isEmpty = (value) => value.trim() !== "";
export const isGreaterThreeCharacters = (value) => value.trim().length >= 3;
export const useAuthorization = () => {
    const headers = {};
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return null;
    }

    headers.Authorization = `Bearer ${token}`;
    return headers;
};
