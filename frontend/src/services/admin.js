import api from "../config/api";

export const loginAdmin = async (email, password) => {
    const resp = await api.post('/auth/login/admin', { email, password });
    return resp;
}

export const getAdminToken = () => {
    return localStorage.getItem('tokenAdmin');
}

export const setAdminToken = (token) => {
    localStorage.setItem('tokenAdmin', token);
}

export const removeAdminToken = () => {
    return localStorage.removeItem('tokenAdmin');
}

