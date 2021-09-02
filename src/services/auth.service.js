import axios from 'axios';

const auth = {
    login: (data) => {
        return axios.post(`/api/login/login`, data);
    },
    register: (data) => {
        return axios.post(`/api/register/create_user`, data);
    },
    resetPassword: email => {
        return axios.post(`/api/login/reset_password`, {email})
    },
    changePassword: (password, code) => {
        return axios.post(`/api/login/changePassword`, {password, code})
    },
    verifyAccount: (token, code) => {
        return axios.get(`/api/register/activate/${code}?email=${token}`)
    },
    profile: () => {
        const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
        return axios.get(`/api/dashboard/getUser`, {headers: {'Authorization': `Bearer ${token}`}})
    }
}

export default auth;