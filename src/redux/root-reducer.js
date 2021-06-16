import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import depositReducer from "./deposit/deposit.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
})

export default rootReducer