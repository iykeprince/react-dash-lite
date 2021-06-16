import axios from "axios"

const deposit = {
    updateWallet: (obj) => {
        const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
        return axios.post(`/api/deposit/updateWallet`, obj,{headers: {'Authorization': `Bearer ${token}`}})
    }
}

export default deposit