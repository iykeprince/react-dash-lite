import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const withdraw = {
    getWithdrawAccounts: () => {
        return axios.get(`/api/withdraw/getWithdrawAccounts`, headerConfig)
    },
    createWithdrawAccount: (data) => axios.post(`/api/withdraw/createWithdrawAccount`, data, headerConfig),
    requestWithdrawFund: (data) => axios.post(`/api/withdraw/requestWithdrawFund`, data, headerConfig)
}

export default withdraw