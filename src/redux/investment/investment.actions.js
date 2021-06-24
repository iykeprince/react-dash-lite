import investment from "../../services/investment.service";
import investmentTypes from "./investment.types"

export const getInvestments = () => async dispatch => {
    try{
        dispatch({type: investmentTypes.GET_INVESTMENT_REQUEST});

        const res = await investment.getInvestments();
        if (!res.data) {
            return dispatch({
                type: investmentTypes.GET_INVESTMENT_SUCCESS,
                payload: []
            })
        }
        return dispatch({
            type: investmentTypes.GET_INVESTMENT_SUCCESS,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: investmentTypes.GET_INVESTMENT_FAILURE,
            payload: 'Error fetching investment'
        })
    }
}

export const getInvestmentInfo = (id) => async dispatch => {
    try{
        dispatch({type: investmentTypes.GET_INVESTMENT_REQUEST});

        const res = await investment.getInvestmentInfo(id);
        if (!res.data) {
            return dispatch({
                type: investmentTypes.GET_INVESTMENT_INFO,
                payload: []
            })
        }
        return dispatch({
            type: investmentTypes.GET_INVESTMENT_INFO,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: investmentTypes.GET_INVESTMENT_FAILURE,
            payload: 'Error fetching investment detail'
        })
    }
}