import utilTypes from "./util.types";

const initialState = {
    activeLink: "dashboard",
    loading: false,
    exchangeData: null,
    error: null,
    showSidebar: false
}
//number of bitcoins = 'value in USD' / 'exchange rate'
const utilReducer = (state = initialState, action) => {
    switch (action.type) {
        case utilTypes.SET_ACTIVE_LINK:
            return {...state, activeLink: action.payload}
        case utilTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case utilTypes.CURRENCY_EXCHANGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                exchangeData: null
            }
        case utilTypes.CURRENCY_EXCHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                exchangeData: action.payload.ticker
            }
        case utilTypes.CURRENCY_EXCHANGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default utilReducer