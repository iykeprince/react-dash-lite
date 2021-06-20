import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const plan = {
    getPlans: () => axios.get(`/api/plan/getPlans`, headerConfig),
    createInvestmentPlan: data => axios.post(`/api/plan/createInvestmentPlan`, data, headerConfig)
}

export default plan