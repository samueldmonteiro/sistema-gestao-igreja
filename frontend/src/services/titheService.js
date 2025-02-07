import api from "../config/api";

export const registerTithe = async (tithe) => {
    const response = await api.post('/tithe/register', tithe);
    return response;
}

export const getTithes = async (params) => {
    const response = await api.get('tithe/all', { params });
    return response;
}

export const deleteTithe = async (id) => {
    const response = await api.delete('tithe/delete/' + id);
    return response;
}