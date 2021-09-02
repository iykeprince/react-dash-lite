import planTypes from "./plan.types";

const initialState = {
    loading: false,
    selectedPlan: null,
    plans: [],
    errorMessage: null,
    message: null,

    idMailSent: false,
    createInvestmentPlanStatus: null
}
const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case planTypes.PLAN_REQUEST:
            return {
                ...state, 
                loading: true, 
                errorMessage: null,
                message: null,
                idMailSent: false,
                createInvestmentPlanStatus: null
            }
        case planTypes.PLAN_ERROR:
        case planTypes.CREATE_INVESTMENT_PLAN_ERROR:
            return {
                ...state, 
                loading: false, 
                errorMessage: action.payload
            }
        case planTypes.PLANS:
            return { ...state, loading: false, plans: action.payload }
        case planTypes.CREATE_INVESTMENT_PLAN:
            return {...state, loading: false, message: action.payload.message, createInvestmentPlanStatus: action.payload.status}
        case planTypes.SELECTED_PLAN:
            return { ...state, selectedPlan: action.payload }
        case planTypes.NAVIGATE_TO_PLAN_CONTAINER:
            return {...state, currentStage: 0, message: null}
        case planTypes.NAVIGATE_TO_PLAN_INVESTMENT:
            return {...state, currentStage: 1}
        case planTypes.SEND_ID_CODE_MAIL:
            return {...state, idMailSent: true}
        default:
            return state;
    }
}
export default planReducer