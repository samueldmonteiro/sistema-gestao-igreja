import api from "../config/api";

export const getAllCongregations = async () => {
    const response = await api.get('/congregation/all');
    return response;
}