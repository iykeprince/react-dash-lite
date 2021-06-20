import transactionTypes from "./transaction.types"

const initialState = {
    loading: false,
    transactions: [],
    errorMessage: null,
}

const transactionReducer = (state = initialState, action) => {
    switch(action.type){
        case transactionTypes.TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null,
                transactions: []
            }
        case transactionTypes.TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case transactionTypes.TRANSACTION_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default transactionReducer