import profileTypes from "./profile.types"

const initialState = {
    message: null,
    updatingProfile: false,
    changePasswordMessage: null,
    changePasswordStatus: null
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
        case profileTypes.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false,
                message: null,
            }
        default:
            return state;
    }
}
export default profileReducer