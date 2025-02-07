import api from "../config/api";
import { removeAdminToken } from "./admin";

export const verifyToken = async () => {
    try {
        const resp = await api.post('/auth/check');
        return true;
    } catch (error) {
        return false;
    }
}

export const getUser = async () => {
    const response = await api.get('/auth/user');
    return response;
}

export const logout = () => {
    removeAdminToken();
}