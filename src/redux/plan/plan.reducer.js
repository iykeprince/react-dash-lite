import planTypes from "./plan.types";

const initialState = {
    loading: false,
    selectedPlan: null,
    plans: [],
    errorMessage: null,
    message: null
}
const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case planTypes.PLAN_REQUEST:
            return {
                ...state, 
                loading: true, 
                errorMessage: null,
                message: null
            }
        case planTypes.PLAN_ERROR:
            return {
                ...state, 
                loading: false, 
                errorMessage: action.payload
            }
        case planTypes.PLANS:
            return { ...state, loading: false, plans: action.payload }
        case planTypes.CREATE_INVESTMENT_PLAN:
            return {...state, loading: false, message: action.payload.message}
        case planTypes.SELECTED_PLAN:
            return { ...state, selectedPlan: action.payload }
        case planTypes.NAVIGATE_TO_PLAN_CONTAINER:
            return {...state, currentStage: 0, message: null}
        case planTypes.NAVIGATE_TO_PLAN_INVESTMENT:
            return {...state, currentStage: 1}
        default:
            return state;
    }
}
export default planReducer