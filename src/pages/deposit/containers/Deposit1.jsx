import { useReducer, useState } from "react"
import { useDispatch } from "react-redux";
import { nav2 } from "../../../redux/deposit/deposit.actions";


const DepositContainer1 = () => {
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("");

    const handleChange = e => {

        setPaymentMethod(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (paymentMethod === 'paypal')
            return alert('Paypal is currently unavailable')
        if (paymentMethod === 'crypto-wallet')
            dispatch(nav2(paymentMethod))
        else
            window.alert('Select a payment method')
    }

    return (<div className="page-dw wide-xs m-auto" id="pm-step-container">
        <div className="nk-pps-apps">
            <div className="nk-pps-steps">
                <span className="step active"></span>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
            </div>
            <div className="nk-pps-title text-center">
                <h3 className="title">Deposit Funds</h3>
                <p className="caption-text">Select from payment options below</p>
                <p className="sub-text-sm">Secure and safely deposit money into your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="nk-pps-form form-validate is-alter" id="dpst-pm-frm" data-required_msg="To deposit, please select a payment method." noValidate="novalidate">
                <div className="nk-pps-field form-group">
                    <ul className="nk-pm-list" id="payment-option-list">
                        <li className="nk-pm-item">
                            <input
                                onChange={handleChange}
                                className="nk-pm-control"
                                type="radio"
                                name="deposit_method"
                                value="paypal"
                                id="paypal"
                                required
                            />
                            <label className="nk-pm-label" htmlFor="paypal">
                                <span className="pm-name">PayPal</span>
                                <span className="pm-icon"><em className="icon ni ni-paypal-alt"></em></span>
                            </label>
                        </li>

                        <li className="nk-pm-item">
                            <input
                                className="nk-pm-control"
                                type="radio"
                                name="deposit_method"
                                required
                                onChange={handleChange}
                                value="crypto-wallet"
                                id="crypto-wallet"
                            />
                            <label className="nk-pm-label" htmlFor="crypto-wallet">
                                <span className="pm-name">Crypto Wallet</span>
                                <span className="pm-icon"><em className="icon ni ni-wallet-fill"></em></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="nk-pps-field form-action text-center">
                    <div className="nk-pps-action">
                        <button type="submit" className="btn btn-lg btn-block btn-primary" id="deposit-now">
                            <span>Deposit Now</span>
                            {/* <span className="spinner-border spinner-border-sm hide" role="status" aria-hidden="true"></span> */}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div>
    )
}

export default DepositContainer1