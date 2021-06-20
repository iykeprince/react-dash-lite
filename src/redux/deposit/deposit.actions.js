import axios from "axios"
import deposit from "../../services/deposit.service"
import depositTypes from "./deposit.types"

export const nav1 = () => ({
    type: depositTypes.NAV1_PAYMENT_METHOD,

})

export const nav2 = (paymentMethod) => ({
    type: depositTypes.NAV2_FUND_DEPOSIT,
    payload: paymentMethod
    
})

export const nav3 = (obj) => ({
    type: depositTypes.NAV3_CONFIRM_DEPOSIT,
    payload: obj
})

export const nav4 = () => ({
    type: depositTypes.NAV4_MAKE_DEPOSIT
})

export const nav5 = () => ({
    type: depositTypes.NAV5_SUCCESS_PAGE
})

export const updateWallet = obj => async dispatch => {
    dispatch({type: depositTypes.UPDATE_WALLET_REQUEST});
    try{
        const res = await deposit.updateWallet(obj);
        console.log(res.data)
        console.log(res.data.message)
        dispatch({type: depositTypes.UPDATE_WALLET_SUCCESS, payload: res.data.message})
    }catch(e){
        console.log(e)
        dispatch({
            type: depositTypes.CURRENCY_EXCHANGE_FAILURE,
            payload: 'Error creating transaction'
        })
    }
}

export const confirmTransaction = transactionId => async dispatch => {
    dispatch({type: depositTypes.CONFIRM_TRANSACTION_REQUEST});
    try{
        const res = await deposit.confirmTransaction(transactionId);
        dispatch({type: depositTypes.CONFIRM_TRANSACTION_SUCCESS, payload: res.data.message})
    }catch(e){
        dispatch({
            type: depositTypes.CONFIRM_TRANSACTION_FAILURE,
            payload: 'Error confirming transaction'
        })
    }
}

export const resetConfirmTransaction = () => ({
    type: depositTypes.RESET_CONFIRM_TRANSACTION
})