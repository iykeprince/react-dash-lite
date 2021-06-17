import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const deposit = {
    updateWallet: (obj) => axios.post(`/api/deposit/updateWallet`, obj, headerConfig),
    confirmTransaction: transactionId => axios.post(`/api/deposit/confirmTransaction`, {transactionId}, headerConfig)
}

export default deposit