import util from "../../services/util.service";
import utilTypes from "./util.types";

// GET /dashboard/transactions
export const getTransactions = () => async dispatch => {
    dispatch({
        type: utilTypes.LOAD_TRANSACTIONS_REQUEST
    })
    try{
        const res = await util.transactions();
        dispatch({
            type: utilTypes.LOAD_TRANSACTIONS_SUCCESS,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: utilTypes.LOAD_TRANSACTIONS_FAILURE,
            payload: error.response.statusText
        })
    }
}