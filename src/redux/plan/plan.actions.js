import plan from "../../services/plan.service";
import planTypes from "./plan.types";

export const navigateToPlanContainer = () => ({ type: planTypes.NAVIGATE_TO_PLAN_CONTAINER })
export const navigateToPlanInvestment = () => ({ type: planTypes.NAVIGATE_TO_PLAN_INVESTMENT })
export const actionSetSelectedPlan = (plan) => ({
    type: planTypes.SELECTED_PLAN,
    payload: plan
})

export const getPlans = () => async dispatch => {

    dispatch({ type: planTypes.PLAN_REQUEST })
    try {
        const res = await plan.getPlans();

        return dispatch({ type: planTypes.PLANS, payload: res.data })

    } catch (e) {
        console.log(e)
        dispatch({
            type: planTypes.PLAN_ERROR,
            payload: 'Error fetching plans'
        })
    }
}

export const createInvestmentPlan = (data) => async dispatch => { 
    dispatch({ type: planTypes.PLAN_REQUEST })
    try {
        const res = await plan.createInvestmentPlan(data);

        return dispatch({ type: planTypes.CREATE_INVESTMENT_PLAN, payload: res.data })

    } catch (e) {
        console.log(e)
        dispatch({
            type: planTypes.PLAN_ERROR,
            payload: 'Error creating investment plan'
        })
    }
}