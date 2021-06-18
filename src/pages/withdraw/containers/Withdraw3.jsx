import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { requestWithdrawFund, resetWithdraw, withdrawNav2 } from "../../../redux/withdraw/withdraw.actions"
import formatWalletAddress from "../../../utils/formatWalletAddress";



const WithdrawContainer3 = () => {
    const dispatch = useDispatch()
    const postData = useSelector(state => state.withdraw.postData);
    const loading = useSelector(state => state.withdraw.loading)
    const message = useSelector(state => state.withdraw.message)
    const history = useHistory();


    useEffect(() => {
        if(message){
            toast.success(message);
        }
    }, [message])

    
   
    
    const handleSubmitPost = () => {
        const obj = {...postData, amountUSD: postData.USD}
        console.log(obj)
        var confirm = window.confirm('Do you want to proceed with the request?');
        if(confirm){
            return dispatch(requestWithdrawFund(obj))
        }
    }

    return (<div className="page-dw wide-xs m-auto" id="wd-step-container">
        <div className="nk-pps-apps">
            <div className="nk-pps-steps">
                <span className="step"></span>
                <span className="step"></span>
                <span className="step active"></span>
                <span className="step"></span>
            </div>
            <div className="nk-pps-title text-center">
                <h3 className="title">Confirm Your Withdrawal</h3>
                <p className="caption-text">You are about to withdraw {postData.USD} USDT via Wallet ({postData.wallet_address}).
            </p>
                <p className="sub-text-sm">Please review the information and confirm.</p>
            </div>
            <div className="nk-pps-data">
                <ul className="nk-olist">
                    <li className="nk-olist-item">
                        <div className="label lead-text">Withdraw Account ({postData.wallet_label})</div>
                        <div className="data"><span className="method"><em className="icon ni ni-wallet-fill"></em> <span className="ellipsis w-max-225px">{formatWalletAddress(postData.wallet_address)}</span></span></div>
                    </li>
                    <li className="nk-olist-item">
                        <div className="label lead-text">Withdraw amount</div>
                        <div className="data"><span className="amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(postData.USD)} USD</span></div>
                    </li>
                    <li className="nk-olist-item is-grouped">
                        <div className="label lead-text">Equivalent to</div>
                        <div className="data"><span className="amount">{postData.exchangedValue} {postData.crypto.toUpperCase()}</span></div>
                    </li>
                    <li className="nk-olist-item small">
                        <div className="label">Exchange rate</div>
                        <div className="data fw-normal text-soft">
                            <span className="amount">1 {postData.base} = {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(postData.price)} </span>
                        </div>
                    </li>
                    <li className="nk-olist-item nk-olist-item-final">
                        <div className="label lead-text">Total amount to debit</div>
                        <div className="data"><span className="amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(postData.USD)} USD</span></div>
                    </li>
                </ul>
                <ul className="nk-olist">
                    <li className="nk-olist-item">
                        <div className="label">Description</div>
                        <div className="data note">{postData.description}</div>
                    </li>
                </ul>
                <ul className="nk-olist">
                    <li className="nk-olist-item nk-olist-item-final">
                        <div className="label lead-text">Amount transferred to Account</div>
                        <div className="data"><span className="amount">{postData.exchangedValue} {postData.crypto.toUpperCase()}</span></div>
                    </li>
                </ul>
            </div>
            <div className="nk-pps-field form-action text-center">
                <div className="nk-pps-action">
                    <a href="#" type="button" className="btn btn-lg btn-block btn-primary" id="wd-confirm" onClick={handleSubmitPost}>
                        <span>Confirm &amp; Withdraw</span>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span></span>}
                    </a>
                </div>
                <div className="nk-pps-action pt-3">
                    <a href="#" onClick={() => dispatch(withdrawNav2(postData))} className="btn btn-outline-danger btn-trans">Cancel Order</a>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>)
}

export default WithdrawContainer3