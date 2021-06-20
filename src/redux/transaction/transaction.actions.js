import transaction from "../../services/transaction.service";
import transactionTypes from "./transaction.types";

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