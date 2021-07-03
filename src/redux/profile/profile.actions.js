import profile from "../../services/profile.service";
import profileTypes from "./profile.types";

export const changeEmail = (data) => async dispatch => {
    dispatch({
        type: profileTypes.UPDATE_PROFILE_REQUEST
    })
    try{
        const res = await profile.changeEmail(data);
        dispatch({
            type: profileTypes.CHANGE_EMAIL,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: profileTypes.UPDATE_PROFILE_FAILURE,
            payload: error.response.statusText
        })
    }
}
export const changePassword = (data) => async dispatch => {
    dispatch({
        type: profileTypes.UPDATE_PROFILE_REQUEST
    })
    try{
        const res = await profile.changePassword(data);
        dispatch({
            type: profileTypes.CHANGE_PASSWORD,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: profileTypes.UPDATE_PROFILE_FAILURE,
            payload: error.response.statusText
        })
    }
}
export const updatePersonalProfile = (data) => async dispatch => {
    dispatch({
        type: profileTypes.UPDATE_PROFILE_REQUEST
    })
    try{
        const res = await profile.updatePersonalProfile(data);
        dispatch({
            type: profileTypes.UPDATE_PERSONAL_PROFILE,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: profileTypes.UPDATE_PROFILE_FAILURE,
            payload: error.response.statusText
        })
    }
}

export const updateAddressProfile = (data) => async dispatch => {
    dispatch({
        type: profileTypes.UPDATE_PROFILE_REQUEST
    })
    try{
        const res = await profile.updateAddressProfile(data);
        dispatch({
            type: profileTypes.UPDATE_ADDRESS_PROFILE,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: profileTypes.UPDATE_PROFILE_FAILURE,
            payload: error.response.statusText
        })
    }
}

