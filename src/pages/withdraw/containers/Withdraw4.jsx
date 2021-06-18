import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { resetWithdraw } from "../../../redux/withdraw/withdraw.actions"

const WithdrawContainer4 = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('reset withdraw init')
        return () => {
            dispatch(resetWithdraw());
            console.log('reset withdrawal')
        }
    }, [])
    return (
        <div className="page-dw wide-xs m-auto" id="wd-step-container">
            <div className="nk-pps-apps">
                <div className="nk-pps-steps">
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step active"></span>
                </div>
                <div className="nk-pps-result">
                    <em className="icon icon-circle icon-circle-xxl ni ni-check bg-success"></em>
                    <h3 className="title">Your funds are on the way!</h3>
                    <div className="nk-pps-text md">
                        <p className="caption-text">We'll send you a confirmation email shortly. Check that email for details on when the funds will reach your account.</p>
                        <p className="sub-text">Your withdrawal request ID TNX85312687</p>
                    </div>
                    <div className="nk-pps-action">
                        <ul className="btn-group-vertical align-center gy-3">
                            <li><Link to="/transactions" className="btn btn-lg btn-mw btn-primary">View Transaction</Link></li>
                            <li><Link to="/" className="link link-primary">Go to dashboard</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WithdrawContainer4