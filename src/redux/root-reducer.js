import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import depositReducer from "./deposit/deposit.reducer";
import utilReducer from "./util/util.reducer";
import withdrawReducer from "./withdraw/withdraw.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
    withdraw: withdrawReducer,
    util: utilReducer
})

export default rootReducer