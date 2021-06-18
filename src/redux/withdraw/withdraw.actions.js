import withdraw from "../../services/withdraw.service"
import withdrawTypes from "./withdraw.types";

export const withdrawNav1 = () => ({ type: withdrawTypes.NAV1_WITHDRAW_METHOD })
export const withdrawNav2 = (obj) => ({ type: withdrawTypes.NAV2_WITHDRAW_FUND, payload: obj })
export const withdrawNav3 = (obj) => ({ type: withdrawTypes.NAV3_WITHDRAW_CONFIRM, payload: obj })

export const getWithdrawAccounts = () => async dispatch => {
    dispatch({ type: withdrawTypes.GET_WITHDRAW_REQUEST })
    try {
        const res = await withdraw.getWithdrawAccounts();

        if (!res.data) {
            return dispatch({
                type: withdrawTypes.GET_WITHDRAW_ACCOUNTS,
                payload: []
            })
        }
        return dispatch({
            type: withdrawTypes.GET_WITHDRAW_ACCOUNTS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: withdrawTypes.GET_WITHDRAW_ERROR,
            payload: 'Error fetching withdrawal accounts'
        })
    }
}
export const createWithdrawAccount = (data) => async dispatch => {
    dispatch({ type: withdrawTypes.GET_WITHDRAW_REQUEST })
    try {
        const res = await withdraw.createWithdrawAccount(data);

        return dispatch({
            type: withdrawTypes.CREATE_WITHDRAW_ACCOUNT,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: withdrawTypes.GET_WITHDRAW_ERROR,
            payload: 'Error creating withdrawal account'
        })
    }
}

export const requestWithdrawFund = (data) => async dispatch => {
    dispatch({ type: withdrawTypes.WITHDRAW_REQUEST })
    console.log(data)
    try {
        const res = await withdraw.requestWithdrawFund(data);

        return dispatch({
            type: withdrawTypes.REQUEST_WITHDRAW_FUND,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: withdrawTypes.GET_WITHDRAW_ERROR,
            payload: 'Error requesting withdraw fund'
        })
    }
}

export const resetWithdraw = () => ({
    type: withdrawTypes.RESET_WITHDRAW
})