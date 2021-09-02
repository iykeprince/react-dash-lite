import auth from "../../services/auth.service";
import authTypes from "./auth.types"

export const requestLogin = (data) => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: authTypes.LOGIN_REQUEST,
    });
    try {
        const res = await auth.login(data);
        if (res.data.isLoggedIn) {

            localStorage.setItem('BITFETTER_AUTH_TOKEN', res.data.token);
            dispatch({
                type: authTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: authTypes.LOGIN_FAIL,
                payload: res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: authTypes.LOGIN_FAIL,
            payload: error.response.statusText
        })
    }
}

export const createAccount = data => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: authTypes.SIGNUP_REQUEST
    })
    try {
        const res = await auth.register(data);
        if (res.data.isLoggedIn) {
            localStorage.setItem('BITFETTER_AUTH_TOKEN', res.data.token);
            dispatch({
                type: authTypes.SIGNUP_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: authTypes.SIGNUP_FAIL,
                payload: res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: authTypes.SIGNUP_FAIL,
            payload: error.response.statusText
        })
    }
}
export const requestResetPassword = (email) => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: authTypes.RESET_PASSWORD_REQUEST
    })
    try {
        const res = await auth.resetPassword(email);

        dispatch({
            type: authTypes.RESET_PASSWORD_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: authTypes.RESET_PASSWORD_FAIL,
            payload: error.response.statusText
        });
    }
}

export const resetChangePassword = (password, code) => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: authTypes.CHANGE_PASSWORD_REQUEST
    })
    try {
        const res = await auth.changePassword(password, code);

        dispatch({
            type: authTypes.CHANGE_PASSWORD_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: authTypes.CHANGE_PASSWORD_FAIL,
            payload: error.response.statusText
        });
    }
}
export const verifyAccount = (token, code) => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: authTypes.VERIFY_ACCOUNT_REQUEST
    })
    try {
        const res = await auth.verifyAccount(token, code);
        if(res.data.status === 404){
            return dispatch({
                type: authTypes.VERIFY_ACCOUNT_FAILURE,
                payload: res.data.message
            })
        }
        dispatch({
            type: authTypes.VERIFY_ACCOUNT_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: authTypes.VERIFY_ACCOUNT_FAILURE,
            payload: error.response.statusText
        });
    }
}

// GET /user/profile
export const getUser = () => async dispatch => {
    dispatch({
        type: authTypes.GET_USER_REQUEST
    })
    try{
        const res = await auth.profile();
        dispatch({
            type: authTypes.GET_USER_SUCCESS,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: authTypes.GET_USER_FAILURE,
            payload: error.response.statusText
        })
    }
}

