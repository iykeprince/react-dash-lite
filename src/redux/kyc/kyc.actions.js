import kyc from "../../services/kyc.service"
import kycTypes from "./kyc.types"

export const getKyc = () => async dispatch => {
    try{
        dispatch({type: kycTypes.GET_KYC_REQUEST})

        const res = await kyc.getKyc();
        if (!res.data) {
            return dispatch({
                type: kycTypes.GET_KYC_SUCCESS,
                payload: null
            })
        }
        return dispatch({
            type: kycTypes.GET_KYC_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: kycTypes.GET_KYC_FAILURE,
            payload: 'Error fetching transactions'
        })
    }
}

export const createKyc = data => async dispatch => {
    try{
        dispatch({type: kycTypes.GET_KYC_REQUEST})

        const res = await kyc.createKyc(data);

        return dispatch({
            type: kycTypes.GET_KYC_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: kycTypes.GET_KYC_FAILURE,
            payload: 'Error fetching transactions'
        })
    }
}
