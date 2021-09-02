import profileTypes from "./profile.types"

const initialState = {
    message: null,
    updatingProfile: false,
    changePasswordMessage: null,
    changePasswordStatus: null,
    
    referalCount: 0,
    preferenceData: null
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileTypes.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updatingProfile: true,
                message: null,
                changePasswordMessage: null,
                changePasswordStatus: null
            }
        case profileTypes.UPDATE_ADDRESS_PROFILE:
        case profileTypes.UPDATE_PERSONAL_PROFILE:
        case profileTypes.CHANGE_EMAIL:
            return {
                updatingProfile: false,
                message: action.payload.message
            }
        case profileTypes.CHANGE_PASSWORD:
            return {
                changePasswordMessage: action.payload.message,
                changePasswordStatus: action.payload.status
            }
        case profileTypes.GET_REFERAL_COUNT:
            return {
                ...state,
                referalCount: action.payload
            }
        case profileTypes.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false,
                message: null,
            }
        case profileTypes.GET_PREFERENCE:
            return {
                ...state,
                preferenceData: action.payload
            }
        default:
            return state;
    }
}
export default profileReducer