import withdrawTypes from "./withdraw.types"

const initialState = {
    loading: false,
    accounts: [],
    error: null,
    message: null,
    currentStage: 0,
    postData: {}
}

const withdrawReducer = (state = initialState, action) => {
    switch(action.type){
        case withdrawTypes.NAV1_WITHDRAW_METHOD:
            return {
                ...state,
                currentStage: 0
            }
        case withdrawTypes.NAV2_WITHDRAW_FUND:
            return {
                ...state,
                currentStage: 1,
                postData: {...state.postData, withdrawMethod: action.payload}
            }
        case withdrawTypes.NAV3_WITHDRAW_CONFIRM:
            return {
                ...state,
                currentStage: 2,
                postData: {...state.postData, ...action.payload}
            }
        case withdrawTypes.GET_WITHDRAW_ACCOUNTS:
            return {
                ...state,
                loading: false,
                error: null,
                accounts: [...action.payload]
            }
        case withdrawTypes.GET_WITHDRAW_REQUEST:
            return {
                ...state,
                loading: true,
                accounts: []
            }
        case withdrawTypes.WITHDRAW_REQUEST:
            return {
                ...state,
                loading: true,
                message: null
            }
        case withdrawTypes.GET_WITHDRAW_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case withdrawTypes.CREATE_WITHDRAW_ACCOUNT:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                accounts: [...action.payload.result]
            }
        case withdrawTypes.REQUEST_WITHDRAW_FUND:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                currentStage: 3
            }
        case withdrawTypes.RESET_WITHDRAW:
            return {
                ...state,
                message: null,
                currentStage: 0
            }
        default:
            return state;
    }
}

export default withdrawReducer