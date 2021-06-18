import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyExchange } from "../../../redux/util/util.actions";
import { withdrawNav1, withdrawNav3 } from "../../../redux/withdraw/withdraw.actions";

const WithdrawContainer2 = () => {
    const loading = useSelector(state => state.util.loading)
    const user = useSelector(state => state.auth.user)
    const withdrawAccounts = useSelector(state => state.withdraw.accounts);
    const exchangeData = useSelector(state => state.util.exchangeData);
    const error = useSelector(state => state.util.error)
    const withdrawMethod = useSelector(state => state.withdraw.postData.paymentMethod);

    const dispatch = useDispatch();
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [currency, setCurrency] = useState("btc");
    const [withdrawAmount, setWithdrawAmount] = useState({USD: 0.0, exchangeValue: 0.0})
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (currency) {
            dispatch(currencyExchange(currency))
        }

    }, [currency])

    const handleSelection = (account) => {
        setSelectedAccount(account);
    }

    const handleConversion = e => {
        const value = parseInt(e.target.value) || 0;
    
        if(exchangeData){
            const valueExchanged = value / exchangeData.price
            console.log('value', value, 'exchanged', valueExchanged)
            

            setWithdrawAmount({
                ...withdrawAmount, USD: value, exchangedValue: valueExchanged
            });
        }else{
            return alert('Hey! Loading current exchange rate!')
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!selectedAccount){
            return window.alert('Please select account')
        }
        const obj = {
            ...withdrawAmount,
            ...selectedAccount,
            description,
            crypto: currency,
            ...exchangeData
        }
        dispatch(withdrawNav3(obj))
    }

    return (<>
        <div className="page-dw wide-xs m-auto" id="wd-step-container">
            <div className="nk-pps-apps">
                <div className="nk-pps-steps">
                    <span className="step"></span>
                    <span className="step active"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
                <div className="nk-pps-title text-center">
                    <h3 className="title">Withdraw Funds</h3>
                    <p className="caption-text">via <strong>Wallet</strong></p>
                    <p className="sub-text-sm">Withdraw your fund via crypto wallet</p>
                </div>
                <form className="nk-pps-form" id="wdm-continue-from" onSubmit={handleSubmit}>
                    <div className="nk-pps-field form-group">
                        <div className="form-label-group">
                            <label className="form-label">Withdraw To</label>
                            <a href="#" className="link wd-new-account" data-modal="withdraw-account-modal">
                                New Wallet </a>
                        </div>

                        <div className="dropdown nk-pps-dropdown">
                            <a href="#" className="dropdown-indicator" data-toggle="dropdown" id="wdm-account-name">
                                {selectedAccount
                                    ? <div className="nk-cm-item">
                                        <div className="nk-cm-text">
                                            <span className="label fw-bold">{selectedAccount.wallet_label}</span>
                                            <span className="desc">{selectedAccount.wallet_address}</span>
                                        </div>
                                    </div>
                                    : <div className="nk-cm-item">
                                        <div className="nk-cm-text">
                                            <span className="label fw-bold">Select Account</span>
                                            <span className="desc">select an account</span>
                                        </div>
                                    </div>}
                            </a>
                            <div className="dropdown-menu dropdown-menu-auto dropdown-menu-mxh">
                                <ul className="nk-dlist">
                                    {withdrawAccounts.map((account, index) => (<li key={index} className="nk-dlist-item selected">
                                        <a href="#" onClick={() => handleSelection(account)} className="nk-dlist-opt wdm-change" data-change="wdm-account" data-id="dlFiMEF1K1IvRDI4ZkV1aDJ0ZHAvdz09" data-currency="USDT">
                                            <div className="nk-cm-item">
                                                <div className="nk-cm-text">
                                                    <span className="label fw-bold">{account.wallet_label}</span>
                                                    <span className="desc">{account.wallet_address} </span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="nk-pps-field-set">
                        <div className="nk-pps-field-row row gy-gs">
                            <div className="nk-pps-field-col col-12 col-sm-6 wdm-account-fmsa">
                                <div className="nk-pps-field form-group">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="wdm-amount-from">Withdraw Amount</label>
                                    </div>
                                    <div className="form-control-group">
                                        <div className="form-text-hint">
                                            <span className="overline-title">USD</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg form-control-number wd-amount" 
                                            id="wdm-amount-from" 
                                            name="wd_amount" 
                                            placeholder="0.00" 
                                            value={withdrawAmount.USD} 
                                            onChange={handleConversion}
                                        />
                                    </div>
                                    <div className="form-note-group">
                                        <span className="nk-pps-bal form-note-alt">Current Balance: <strong className="text-base amount">{user.trading_wallet} USD</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="nk-pps-field-col col-12 col-sm-6 wdm-account-tora">
                                <div className="nk-pps-field form-group">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="wdm-amount-to">Amount to Receive</label>
                                    </div>
                                    {/* <div className="form-control-group">
                                        <div className="form-text-hint">
                                            <span className="overline-title" id="wdm-account-currency-code">USDT</span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg form-control-number wd-amount" id="wdm-amount-to" name="wd_amount_to" placeholder="0.00" />
                                        <input type="hidden" id="wdm-account-currency" name="wd_currency_to" value="USDT" />
                                    </div> */}
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
                                            id="withdraw-amount"
                                            name="withdraw_amount"
                                            placeholder="0.00"
                                            onChange={e => setWithdrawAmount(e.target.value)}
                                            value={withdrawAmount.exchangedValue}
                                            required
                                        />
                                        <input
                                            type="hidden"
                                            id="withdraw-currency"
                                            name="withdraw_currency"
                                            value={currency}
                                        />
                                    </div>
                                    <div className="form-note-group" id="wdm-account-rate">
                                        {exchangeData !== null && <span id="deposit-rate" className="nk-pps-rate form-note-alt">
                                            1 {currency.toUpperCase()} = <span className="fxrate">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(exchangeData.price)} </span>
                                        </span>}
                                        {error !== null && <span id="deposit-rate" className="nk-pps-rate form-note-alt">
                                            <span className="text-danger">{error} {currency}</span>
                                        </span>}
                                        {loading && <span className="nk-pps-rate form-note-alt" style={{fontStyle: 'italic', color: 'red'}}>
                                            loading current {currency.toUpperCase()} rate!!!
                                        </span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nk-pps-field form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="withdraw-desc">Description <small className="text-soft fw-normal">(Optional)</small></label>
                        </div>
                        <div className="form-control-group">
                            <input type="text" className="form-control form-control-lg" id="withdraw-desc" name="description" placeholder="" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="nk-pps-field form-action text-center">
                        <div className="nk-pps-action">
                            <button type="submit" className="btn btn-lg btn-block btn-primary pps-btn-action" id="wdm-continue">
                                <span>Continue to Withdraw</span>
                                {/* <span className="spinner-border spinner-border-sm hide" role="status" aria-hidden="true"></span> */}
                            </button>
                        </div>
                        <div className="nk-pps-action pt-3">
                            <a href="@" className="btn btn-outline-secondary btn-trans pps-btn-action" onClick={() => withdrawNav1()} >Back to previous</a>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </>)
}

export default WithdrawContainer2