import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const investment = {
    getInvestments: () => axios.get(`/api/investment/getInvestments`, headerConfig),
    getInvestmentInfo: id => axios.get(`/api/investment/getInvestmentInfo/${id}`, headerConfig)
}

export default investment