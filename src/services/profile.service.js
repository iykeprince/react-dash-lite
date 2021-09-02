import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const profile = {
    updatePersonalProfile: (data) => axios.post(`/api/profile/updatePersonalProfile`, data, headerConfig),
    updateAddressProfile: (data) => axios.post(`/api/profile/updateAddressProfile`, data, headerConfig),
    changeEmail: (data) => axios.post(`/api/profile/changeEmail`, data, headerConfig),
    changePassword: (data) => axios.post(`/api/profile/changePassword`, data, headerConfig),
    getPreference: (data) => axios.post(`/api/profile/getPreference`, data, headerConfig),

    getReferalCount: () => axios.get(`/api/dashboard/getReferalCount`, headerConfig),
}

export default profile