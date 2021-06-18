import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { nav3, nav1 } from "../../../redux/deposit/deposit.actions";
import { currencyExchange } from "../../../redux/util/util.actions";



const DepositContainer2 = () => {
    const dispatch = useDispatch();
    const exchangeData = useSelector(state => state.util.exchangeData);
    const error = useSelector(state => state.util.error)
    const paymentMethod = useSelector(state => state.deposit.postData.paymentMethod);

    const [depositAmount, setDepositAmount] = useState("");
    const [currency, setCurrency] = useState("btc");

    console.log('payment method', paymentMethod)

    useEffect(() => {
        if (currency) {
            dispatch(currencyExchange(currency))
        }

    }, [currency])

    const handleChange = e => {
        setDepositAmount(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {}
        if (exchangeData) {
            obj = {
                amountUSD: depositAmount,
                cryptoValue: exchangeData.price,
                currency: currency
            }
            return dispatch(nav3(obj))
        }

        return toast.error('Please error getting the exchange rate. please check your internet connection')
    }

    return (
        <div className="page-dw wide-xs m-auto" id="pm-step-container">
            <div className="nk-pps-apps">
                <div className="nk-pps-steps">
                    <span className="step"></span>
                    <span className="step active"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
                <div className="nk-pps-title text-center">
                    <h3 className="title">Deposit Funds</h3>
                    <p className="caption-text">via <strong>Crypto Wallet</strong></p>
                    <p className="sub-text-sm">Send your payment direct to our wallet.</p>
                </div>
                <form className="nk-pps-form" onSubmit={handleSubmit}
                    id="deposit-amount-form">
                    <div className="nk-pps-field form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="deposit-amount">Amount to Deposit</label>
                        </div>
                        <div className="form-control-group">
                            <div className="form-dropdown">
                                <div className="dropdown">
                                    <a href="#"
                                        className="dropdown-indicator-caret currency"
                                        data-toggle="dropdown" data-offset="0,2"
                                        id="deposit-currency-name">{currency.toUpperCase()}</a>
                                    <div
                                        className="dropdown-menu dropdown-menu-right text-center dropdown-menu-xs">
                                        <ul className="link-list-plain li-col2x" id="currency-list">
                                            <li onClick={() => setCurrency("btc")}><a className="switch-currency" href="#"
                                                data-switch="deposit"
                                                data-currency="BTC" >BTC</a></li>
                                            <li onClick={() => setCurrency("eth")}><a className="switch-currency" href="#"
                                                data-switch="deposit"
                                                data-currency="ETH" >ETH</a></li>
                                            <li onClick={() => setCurrency("usdt")}><a className="switch-currency" href="#"
                                                data-switch="deposit"
                                                data-currency="USDT">USDT</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-lg form-control-number"
                                id="deposit-amount"
                                name="deposit_amount"
                                placeholder="0.00"
                                onChange={handleChange}
                                value={depositAmount} 
                                required
                            />
                            <input
                                type="hidden"
                                id="deposit-currency"
                                name="deposit_currency"
                                value={currency}
                            />
                        </div>

                        <div className="form-note-group">
                            <span className="nk-pps-min form-note-alt">Minimum <span
                                id="deposit-min">0.01248 BTC</span></span>
                            {exchangeData !== null && <span id="deposit-rate" className="nk-pps-rate form-note-alt">
                                1 USD = <span className="fxrate">{exchangeData.price} {currency}</span>
                            </span>}
                            {error !== null && <span id="deposit-rate" className="nk-pps-rate form-note-alt">
                                <span className="text-danger">{error} {currency}</span>
                            </span>}
                        </div>
                    </div>
                    <div className="nk-pps-field form-action text-center">
                        <div className="nk-pps-action">
                            <button type="submit" className="btn btn-lg btn-block btn-primary"
                                id="proceed-btn">
                                <span>Continue to Deposit</span>
                                {/* <span className="spinner-border spinner-border-sm hide" role="status"
                                    aria-hidden="true"></span> */}
                            </button>
                        </div>
                        <div className="nk-pps-action pt-3">
                            <a href="#" onClick={() => dispatch(nav1())}
                                className="btn btn-outline-secondary btn-trans">Back to previous</a>
                        </div>
                    </div>
                </form>

            </div>
            <ToastContainer />
        </div>
    )
}

export default DepositContainer2