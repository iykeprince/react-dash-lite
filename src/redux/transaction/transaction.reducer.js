import transactionTypes from "./transaction.types"

const initialState = {
    loading: false,
    transactions: [],
    deposits: [],
    withdraws: [],
    pendings: [],
    errorMessage: null,
    selectedTab: 0
}

const transactionReducer = (state = initialState, action) => {
    switch(action.type){
        case transactionTypes.SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload
            }
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
        case transactionTypes.GET_DEPOSIT_TRANSACTIONS:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case transactionTypes.GET_WITHDRAW_TRANSACTIONS:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case transactionTypes.GET_PENDING_TRANSACTIONS:
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