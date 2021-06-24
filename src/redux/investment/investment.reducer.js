import investmentTypes from "./investment.types"

const initialState = {
    loading: false,
    investments: [],
    investmentData: null,
    amountInvested: 0.0,
    amountInvestedCryptoValue: 0.0,
    calculatedProfit: 0.0,
    errorMessage: null
}

const investmentReducer = (state = initialState, action) => {
    switch(action.type){
        case investmentTypes.GET_INVESTMENT_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null,
            }
        case investmentTypes.GET_INVESTMENT_INFO:
            return {...state, investmentData: action.payload }
        case investmentTypes.GET_INVESTMENT_SUCCESS:
            const {
                investments, 
                amountInvested, 
                amountInvestedCryptoValue, 
                calculatedProfit 
            } = action.payload;
            return {
                ...state,
                loading: false,
                investments,
                amountInvested,
                amountInvestedCryptoValue,
                calculatedProfit
            }
        case investmentTypes.GET_INVESTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                investments: []
            }
        default: 
            return state;
    }
}

export default investmentReducer