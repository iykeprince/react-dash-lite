import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const transaction = {
    getTransactions: () => axios.get(`/api/transaction/getTransactions`, headerConfig),
    getDeposits: () => axios.get(`/api/transaction/getDeposits`, headerConfig),
    getWithdraws: () => axios.get(`/api/transaction/getWithdraws`, headerConfig),
    getPendingTransactions: () => axios.get(`/api/transaction/getPendingTransactions`, headerConfig)
}

export default transaction