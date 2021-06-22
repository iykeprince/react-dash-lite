import transaction from "../../services/transaction.service";
import transactionTypes from "./transaction.types";

export const selectedTab = (tabIndex) => ({
    type: transactionTypes.SELECTED_TAB,
    payload: tabIndex
})

export const getTransactions = () => async dispatch => {
    dispatch({ type: transactionTypes.TRANSACTION_REQUEST })
    try {
        const res = await transaction.getTransactions();

        if (!res.data) {
            return dispatch({
                type: transactionTypes.TRANSACTION_SUCCESS,
                payload: []
            })
        }
        return dispatch({
            type: transactionTypes.TRANSACTION_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: transactionTypes.TRANSACTION_FAILURE,
            payload: 'Error fetching transactions'
        })
    }
}

export const getDeposits = () => async dispatch => {
    dispatch({ type: transactionTypes.TRANSACTION_REQUEST })
    try {
        const res = await transaction.getDeposits();

        if (!res.data) {
            return dispatch({
                type: transactionTypes.GET_DEPOSIT_TRANSACTIONS,
                payload: []
            })
        }
        return dispatch({
            type: transactionTypes.GET_DEPOSIT_TRANSACTIONS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: transactionTypes.TRANSACTION_FAILURE,
            payload: 'Error fetching deposit transactions'
        })
    }
}

export const getWithdraws = () => async dispatch => {
    dispatch({ type: transactionTypes.TRANSACTION_REQUEST })
    try {
        const res = await transaction.getWithdraws();

        if (!res.data) {
            return dispatch({
                type: transactionTypes.GET_WITHDRAW_TRANSACTIONS,
                payload: []
            })
        }
        return dispatch({
            type: transactionTypes.GET_WITHDRAW_TRANSACTIONS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: transactionTypes.TRANSACTION_FAILURE,
            payload: 'Error fetching withdrawn transactions'
        })
    }
}

export const getPendingTransactions = () => async dispatch => {
    dispatch({ type: transactionTypes.TRANSACTION_REQUEST })
    try {
        const res = await transaction.getPendingTransactions();

        if (!res.data) {
            return dispatch({
                type: transactionTypes.GET_PENDING_TRANSACTIONS,
                payload: []
            })
        }
        return dispatch({
            type: transactionTypes.GET_PENDING_TRANSACTIONS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: transactionTypes.TRANSACTION_FAILURE,
            payload: 'Error fetching pending transactions'
        })
    }
}