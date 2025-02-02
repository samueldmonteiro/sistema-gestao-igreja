import api from "../config/api";

export const getAllCongregations = async () => {
    const response = await api.get('/congregation/all');
    return response;
}

export const getCongregationsWithTotalTithes = async () => {
    const response = await api.get('/congregation/total_tithes');
    return response;
}

export const getTop3CongregationsWithTotalTithes = async () => {
    const params = { limit: 3 };
    const response = await api.get('/congregation/total_tithes', { params });
    return response;
}