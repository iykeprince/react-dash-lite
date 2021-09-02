import adminTypes from "./admin.types";

const initialState = {
    loading: false,
    modalDataLoading: false,
    errorMessage: null,

    users: [],
    withdrawals: [],
    deposits: [],

    topUp: null,
    activatePayment: null,
    deletePayment: null,
    userTransactions: [],
    resetPasswordMessage: null,
    toggleUserStatus: null,
    deleteWithdraw: null,
    confirmWithdraw: null,
    accountSync: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case adminTypes.LOADING_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null,

            }
        case adminTypes.RESET:
            return {
                ...state,
                toggleUserStatus: null,
                resetPasswordMessage: null,
                topUp: null,
                activatePayment: null,
                deleteWithdraw: null,
                confirmWithdraw: null,
                accountSync: null
            }
        case adminTypes.ADMIN_ERROR:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        case adminTypes.ACCOUNT_SYNC:
            return {
                ...state,
                modalDataLoading: false,
                accountSync: action.payload
            }
        case adminTypes.TOGGLE_USER_STATUS:
            return {
                ...state,
                modalDataLoading: false,
                toggleUserStatus: action.payload
            }
        case adminTypes.UPDATE_PASSWORD:
            return {
                ...state,
                modalDataLoading: false,
                resetPasswordMessage: action.payload
            }
        case adminTypes.TRANSACTION_SUCCESS:
            return {
                ...state,
                modalDataLoading: false,
                userTransactions: action.payload
            }
        case adminTypes.GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case adminTypes.GET_WITHDRAWALS:
            return {
                ...state,
                loading: false,
                withdrawals: action.payload
            }
        case adminTypes.GET_DEPOSITS:
            return {
                ...state,
                loading: false,
                deposits: action.payload
            }
        case adminTypes.UPDATE_TOPUP:
            return {
                ...state,
                loading: false,
                topUp: action.payload,
            }
        case adminTypes.ACTIVATE_PAYMENT:
            return {
                ...state,
                loading: false,
                activatePayment: action.payload
            }
        case adminTypes.CONFIRM_WITHDRAW:
            return {
                ...state,
                loading: false,
                confirmWithdraw: action.payload
            }

        case adminTypes.DELETE_PAYMENT:
            return {
                ...state,
                loading: false,
                deletePayment: action.payload
            }
        case adminTypes.DELETE_WITHDRAW:
            return {
                ...state,
                loading: false,
                deleteWithdraw: action.payload
            }
        default:
            return state;
    }
}

export default adminReducer