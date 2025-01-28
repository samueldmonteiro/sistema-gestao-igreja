import api from "../config/api";

export const registerMember = async (memberData) => {
    const response = await api.post('/member/register', memberData);
    return response;
}

export const getMembers = async (params)=>{
    const response = await api.get('member/all', {params});
    return response;
}