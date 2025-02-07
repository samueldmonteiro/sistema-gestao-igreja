import api from "../config/api";

export const registerCongregationOffering = async (data) => {
    const resp = await api.post('/congregation/offering/register', data);
    return resp;
}

export const getCongregationOfferings = async (params) => {
    const resp = await api.get('/congregation/offering/all', { params });
    return resp;
}

export const deleteCongregationOffering = async (id) => {
    const resp = await api.delete('/congregation/offering/delete/' + id);
    return resp;
}