import api from "../config/api";

export const registerMember = async (memberData) => {
    const response = await api.post('/member/register', memberData);
    return response;
}