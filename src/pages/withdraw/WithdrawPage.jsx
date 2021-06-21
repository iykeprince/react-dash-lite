import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/layout/layout/layout.component"

import Spinner from "../../components/spinner/spinner.component"
import { getWithdrawAccounts } from "../../redux/withdraw/withdraw.actions"
import WithdrawContainer1 from "./containers/Withdraw1"
import WithdrawContainer2 from "./containers/Withdraw2"
import WithdrawContainer3 from "./containers/Withdraw3"
import WithdrawContainer4 from "./containers/Withdraw4"
import WithdrawInitial from "./containers/WithdrawInitial"

const WithdrawPage = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.withdraw.accounts);
    const loading = useSelector(state => state.withdraw.loading)
    const errorMessage = useSelector(state => state.withdraw.error)
    const currentStage = useSelector(state => state.withdraw.currentStage)
    
    useEffect(() => {
        dispatch(getWithdrawAccounts())
    }, [])


  
    const getCurrentWithdrawContainer = (currentStage) => {
        switch(currentStage){
            case 0:
                return <WithdrawContainer1 />
            case 1:
                return <WithdrawContainer2 />
            case 2:
                return <WithdrawContainer3 />
            case 3:
                return <WithdrawContainer4 />
            default: 
                return <WithdrawContainer1 />
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (<Layout>
        <div className="nk-content nk-content-fluid">
            <div className="container-xl wide-lg">
                <div className="nk-content-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    
                    {accounts.length
                        ? getCurrentWithdrawContainer(currentStage)
                        : <WithdrawInitial />
                    }

                </div>
            </div>
        </div>
    </Layout>
    )
}

export default WithdrawPage