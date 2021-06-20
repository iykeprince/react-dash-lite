import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const transaction = {
    getTransactions: () => axios.get(`/api/transaction/getTransactions`, headerConfig)
}

export default transaction