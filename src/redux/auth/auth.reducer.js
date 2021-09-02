import authTypes from "./auth.types";

const initialState = {
    isAuthenticated: false,
    loading: false,
    token: null,
    message: null,
    error: undefined,
    user: null,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
        case authTypes.SIGNUP_REQUEST:
        case authTypes.RESET_PASSWORD_REQUEST:
        case authTypes.CHANGE_PASSWORD_REQUEST:
        case authTypes.VERIFY_ACCOUNT_REQUEST:
        case authTypes.GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                user: null,
            }
       
        case authTypes.LOGIN_SUCCESS:
        case authTypes.SIGNUP_SUCCESS:
        case authTypes.RESET_PASSWORD_SUCCESS:
        case authTypes.CHANGE_PASSWORD_SUCCESS:
        case authTypes.VERIFY_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token || null,
                message: action.payload.message,
            }
       
        case authTypes.LOGIN_FAIL:
        case authTypes.SIGNUP_FAIL:
        case authTypes.RESET_PASSWORD_FAIL:
        case authTypes.CHANGE_PASSWORD_FAIL:
        case authTypes.VERIFY_ACCOUNT_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                isAuthenticated: false,
                error: action.payload,
                profileMessage: null
            }
        case authTypes.GET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case authTypes.GET_USER_FAILURE:
            return {
                ...state,
                user: null
            }
       
        default:
            return state;
    }
}

export default authReducer