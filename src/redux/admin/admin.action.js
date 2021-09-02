import admin from '../../services/admin.service';
import adminTypes from './admin.types';

export const reset = () => ({ 
    type: adminTypes.RESET
})

export const actionAccountSync = data => async dispatch => {
    dispatch({
        type: adminTypes.MODAL_DATA_LOADING_REQUEST
    })
    try{
        const res = await admin.accountSync(data);
        dispatch({
            type: adminTypes.ACCOUNT_SYNC,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error syncing account due to network'
        })
    }
}

export const toggleUserStatus = (data) => async dispatch => {
    dispatch({
        type: adminTypes.MODAL_DATA_LOADING_REQUEST
    })
    try{
        const res = await admin.toggleUserStatus(data);
        dispatch({
            type: adminTypes.TOGGLE_USER_STATUS,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error toggle user\'s status'
        })
    }
}

export const updatePassword = (data) => async dispatch => {
    dispatch({
        type: adminTypes.MODAL_DATA_LOADING_REQUEST
    })
    try{
        const res = await admin.updatePassword(data);
        dispatch({
            type: adminTypes.UPDATE_PASSWORD,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error update password'
        })
    }
}

export const getUserTransactions = (userId) => async dispatch => {
    dispatch({ type: adminTypes.MODAL_DATA_LOADING_REQUEST })
    try {
        const res = await admin.getUserTransactions(userId);

        if (!res.data) {
            return dispatch({
                type: adminTypes.TRANSACTION_SUCCESS,
                payload: []
            })
        }
        return dispatch({
            type: adminTypes.TRANSACTION_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error fetching transactions'
        })
    }
}

export const deleteWithdraw = (withdrawId) => async dispatch => {
    dispatch({type: adminTypes.LOADING_REQUEST})
    try{
        const res = await admin.deleteWithdraw(withdrawId);
        return dispatch({ 
            type: adminTypes.DELETE_WITHDRAW, 
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error deleting withdraw'
        })
    }
}

export const deletePayment = depositor_id => async dispatch => {
    dispatch({type: adminTypes.LOADING_REQUEST})
    try{
        const res = await admin.deletePayment(depositor_id);
        return dispatch({ 
            type: adminTypes.DELETE_PAYMENT, 
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error deleting payment'
        })
    }
}
export const activatePayment = (depositor_id ) => async dispatch => {
    dispatch({type: adminTypes.LOADING_REQUEST})
    try{
        const res = await admin.activatePayment(depositor_id);
        return dispatch({ 
            type: adminTypes.ACTIVATE_PAYMENT, 
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error activating payment'
        })
    }
} 
export const confirmWithdraw = (withdraw_id ) => async dispatch => {
    dispatch({type: adminTypes.LOADING_REQUEST})
    try{
        const res = await admin.confirmWithdraw(withdraw_id);
        return dispatch({ 
            type: adminTypes.CONFIRM_WITHDRAW, 
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error activating payment'
        })
    }
} 

export const updateTopup = topup => async dispatch => {

    dispatch({ type: adminTypes.LOADING_REQUEST });
    try {
        const res = await admin.updateTopup(topup);

        return dispatch({ 
            type: adminTypes.UPDATE_TOPUP, 
            payload: {...topup, ...res.data} 
        });
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error updating topup'
        })
    }
}

export const getAllUsers = () => async dispatch => {
    dispatch({ type: adminTypes.LOADING_REQUEST })
    try {
        const res = await admin.getUsers();

        return dispatch({ type: adminTypes.GET_USERS, payload: res.data })
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error fetching all users'
        })
    }
}

export const getAllWithdrawals = () => async dispatch => {
    dispatch({ type: adminTypes.LOADING_REQUEST });
    try {
        const res = await admin.getWithdrawals();

        return dispatch({
            type: adminTypes.GET_WITHDRAWALS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error fetching all withdraws'
        })
    }
}

export const getAllDeposits = () => async dispatch => {
    dispatch({ type: adminTypes.LOADING_REQUEST });
    try {
        const res = await admin.getDeposits();
        return dispatch({
            type: adminTypes.GET_DEPOSITS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: adminTypes.ADMIN_ERROR,
            payload: 'Error fetching all deposits'
        })
    }
}