import api from "../config/api";

export const registerMember = async (memberData) => {
    const response = await api.post('/member/register', memberData);
    return response;
}

export const getMembers = async (params) => {
    const response = await api.get('member/all', { params });
    return response;
}

export const getMemberById = async (id) => {
    const response = await api.get('member/' + id);
    return response;
}

export const updateMember = async (id, member) => {
    const response = await api.put('member/update/' + id, member);
    return response;
}

export const deleteMember = async (id) => {
    const response = await api.delete('member/delete/' + id);
    return response;
}