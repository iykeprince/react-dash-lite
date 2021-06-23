import axios from 'axios'
import util from "../../services/util.service";
import utilTypes from "./util.types";

export const toggleSidebar = () => ({
    type: utilTypes.TOGGLE_SIDEBAR
})

export const setActiveLink = (link) => ({
    type: utilTypes.SET_ACTIVE_LINK,
    payload: link
})

export const currencyExchange = (base = "btc") => async dispatch => {
    dispatch({ type: utilTypes.CURRENCY_EXCHANGE_REQUEST })
    try {
        const result = await axios.get(`https://api.cryptonator.com/api/ticker/${base}-usd`)
        
        dispatch({ type: utilTypes.CURRENCY_EXCHANGE_SUCCESS, payload: result.data })
    } catch (e) {
        dispatch({
            type: utilTypes.CURRENCY_EXCHANGE_FAILURE,
            payload: 'Error converting rate'
        })
    }
}