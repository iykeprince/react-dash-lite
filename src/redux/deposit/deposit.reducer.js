import depositTypes from "./deposit.types";

const initialState = {
    postData: {},
    loading: false,
    exchangeData: null,
    error: null,
    currentStage: 0,
    message: null
}
//number of bitcoins = 'value in USD' / 'exchange rate'
const depositReducer = (state = initialState, action) => {
    switch (action.type) {
        case depositTypes.NAV1_PAYMENT_METHOD:
            return {
                ...state,
                currentStage: 0,
            }
        case depositTypes.NAV2_FUND_DEPOSIT:
            return {
                ...state,
                currentStage: 1,
                postData: { ...state.postData, paymentMethod: action.payload }
            }
        case depositTypes.NAV3_CONFIRM_DEPOSIT:
            const { amountUSD, cryptoValue, currency } = action.payload;
            const amountCrypto = amountUSD/cryptoValue;

            return {
                ...state,
                currentStage: 2,
                postData: {
                    ...state.postData,
                    amountUSD: parseFloat(amountUSD),
                    amountCrypto: parseFloat(amountCrypto),
                    cryptoValue: parseFloat(cryptoValue),
                    currency
                }
            }
        case depositTypes.NAV4_MAKE_DEPOSIT:
            return {
                ...state,
                currentStage: 3
            }
        case depositTypes.CURRENCY_EXCHANGE_REQUEST:
        case depositTypes.UPDATE_WALLET_REQUEST:
            return {
                ...state,
                loading: true,
                exchangeError: null,
            }
        case depositTypes.CURRENCY_EXCHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                exchangeData: action.payload.ticker
            }
        case depositTypes.UPDATE_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case depositTypes.CURRENCY_EXCHANGE_FAILURE:
        case depositTypes.UPDATE_WALLET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default depositReducer