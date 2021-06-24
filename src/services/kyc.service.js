import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const kyc = {
    getKyc: () => axios.get(`/api/kyc/getKyc`, headerConfig),
    createKyc: data => axios.post(`/api/kyc/create`, data, headerConfig),
}

export default kyc