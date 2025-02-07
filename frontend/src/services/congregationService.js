import api from "../config/api";

export const getAllCongregations = async () => {
    const response = await api.get('/congregation/all');
    return response;
}

export const getCongregationsWithTotalTithes = async () => {
    const response = await api.get('/tithe/total');
    return response;
}

export const getTop3CongregationsWithTotalTithes = async () => {
    const params = { limit: 3 };
    const response = await api.get('/congregation/total_tithes', { params });
    return response;
}

export const registerCongregation = async (congregationData) => {
    const response = await api.post('/congregation/register', congregationData);
    return response;
}

export const getCongregationsWithTotalOfferings = async () => {
    const response = await api.get('/congregation/offering/total');
    return response;
}


