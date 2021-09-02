import { combineReducers } from "redux";
import adminReducer from "./admin/admin.reducer";
import authReducer from "./auth/auth.reducer";
import depositReducer from "./deposit/deposit.reducer";
import investmentReducer from "./investment/investment.reducer";
import kycReducer from "./kyc/kyc.reducer";
import planReducer from "./plan/plan.reducer";
import profileReducer from "./profile/profile.reducer";
import transactionReducer from "./transaction/transaction.reducer";
import utilReducer from "./util/util.reducer";
import withdrawReducer from "./withdraw/withdraw.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
    withdraw: withdrawReducer,
    util: utilReducer,
    plan: planReducer,
    transaction: transactionReducer,
    investment: investmentReducer,
    kyc: kycReducer,
    profile: profileReducer,
    admin: adminReducer
})

export default rootReducer