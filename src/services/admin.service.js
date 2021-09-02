import axios from "axios"
const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const headerConfig= {headers: {'Authorization': `Bearer ${token}`}}

const admin = {
    getUsers: () => axios.get(`/api/admin/users`, headerConfig),
    getWithdrawals: () => axios.get(`/api/admin/withdrawals`, headerConfig),
    getDeposits: () => axios.get(`/api/admin/deposits`, headerConfig),

    updateTopup: topup => axios.post(`/api/admin/updateTopup`, topup, headerConfig),
    activatePayment: (depositor_id) => axios.post(`/api/admin/activatePayment`, {depositor_id}, headerConfig),
    confirmWithdraw: (withdraw_id) => axios.post(`/api/admin/confirmWithdrawal`, withdraw_id, headerConfig),
    deletePayment: (depositor_id) => axios.post(`/api/admin/deletePayment`, {depositor_id}, headerConfig),
    deleteWithdraw: (withdraw_id) => axios.post(`/api/admin/deleteWithdraw`, withdraw_id, headerConfig),
    getUserTransactions: (id) => axios.get(`/api/admin/getUserTransactions/${id}`, headerConfig),
    updatePassword: (data) => axios.post(`/api/admin/updatePassword`, data, headerConfig),
    toggleUserStatus: (data) => axios.post(`/api/admin/toggleUserStatus`, data, headerConfig),
    accountSync: (data) => axios.post(`/api/admin/accountSync`, data, headerConfig)
}

export default admin