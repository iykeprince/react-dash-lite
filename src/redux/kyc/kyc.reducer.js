import kycTypes from "./kyc.types"

const initialState = {
    loading: false,
    data: null,
    errorMessage: null
}

const kycReducer = (state = initialState, action) => {
    switch(action.type){
        case kycTypes.GET_KYC_REQUEST:
            return {...state, loading: true, errorMessage: null}
        case kycTypes.GET_KYC_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case kycTypes.CREATE_KYC: 
            return {...state, loading: false, message: action.payload.message}
        case kycTypes.GET_KYC_FAILURE:
            return {...state, loading: false, errorMessage: action.payload, data: null}
        default:
            return state;
    }
}

export default kycReducer