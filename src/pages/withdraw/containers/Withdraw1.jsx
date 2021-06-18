import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawNav2 } from "../../../redux/withdraw/withdraw.actions";
import formatAmount from "../../../utils/formatAmount";

const WithdrawContainer1 = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [withdrawMethod, setWithdrawMethod] = useState("");
    const [error, setError] = useState("");

    const handleChange = e => setWithdrawMethod(e.target.value);
    
    const handleSubmit = e => {
        e.preventDefault();
        if (withdrawMethod === 'paypal')
            return alert('Paypal is currently unavailable')
        if (withdrawMethod === 'crypto-wallet'){
            if(user.amount_in_stock > 0){
                dispatch(withdrawNav2(withdrawMethod));
            }else{
                setError('Insufficient fund!');
            }
        }else
            window.alert('Please choose your withdraw method.')
    }

    return (<div className="page-dw wide-xs m-auto" id="wd-step-container">
        <div className="nk-pps-apps">
            <div className="nk-pps-steps">
                <span className="step active"></span>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
            </div>
            <div className="nk-pps-title text-center">
                <h3 className="title">Withdraw Funds</h3>
                <p className="caption-text">Select from withdraw options below</p>
                <p className="sub-text-sm">Withdraw funds from your account directly.</p>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <form className="nk-pps-form" id="wd-method-frm" onSubmit={handleSubmit}>
                <div className="nk-pps-field form-group">
                    <ul className="nk-pm-list" id="wd-option-list">
                        <li className="nk-pm-item">
                            <input className="nk-pm-control" type="radio" name="withdrawMethod" required onChange={handleChange} value="paypal" id="wd-paypal" />
                            <label className="nk-pm-label" htmlFor="wd-paypal">
                                <span className="pm-name">PayPal</span>
                                <span className="pm-icon"><em className="icon ni ni-paypal-alt"></em></span>
                            </label>
                        </li>
                        <li className="nk-pm-item">
                            <input className="nk-pm-control" type="radio" name="withdrawMethod" required onChange={handleChange} value="crypto-wallet" id="wd-crypto-wallet" />
                            <label className="nk-pm-label" htmlFor="wd-crypto-wallet">
                                <span className="pm-name">Crypto Wallet</span>
                                <span className="pm-icon"><em className="icon ni ni-wallet-fill"></em></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="nk-pps-field form-group">
                    <div className="form-label-group">
                        <label className="form-label">Withdraw From</label>
                    </div>
                    <input type="hidden" value="main_wallet" name="wd_source" id="nk-pps-source-wdm" />
                    <div className="dropdown nk-pps-dropdown">
                        <a href="#" className="dropdown-indicator is-single">
                            <div className="nk-cm-item">
                                <div className="nk-cm-text">
                                    <span className="label fw-bold">Main Account</span>
                                    <span className="desc">Available Balance ({new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(user.amount_in_stock)} USD)</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="nk-pps-field form-action text-center">
                    <div className="nk-pps-action">
                        <button className="btn btn-lg btn-block btn-primary" id="withdraw-now">
                            <span>Withdraw Now</span>
                            {/* <span className={`spinner-border spinner-border-sm hide`} role="status" aria-hidden="true"></span> */}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div>
    );
}

export default WithdrawContainer1;