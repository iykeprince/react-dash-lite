import axios from "axios"
const tokenPlugin = () => ({
    'Authorization': `Bearer ${localStorage.getItem('BITFETTER_AUTH_TOKEN')}`    
})
const util = {
    transactions: () => {
        return axios.get(`/api/dashboard/getTransactions`, {headers: tokenPlugin() })
    }
}

export default util