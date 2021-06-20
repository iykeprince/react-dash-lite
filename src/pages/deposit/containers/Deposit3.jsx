import { useDispatch, useSelector } from "react-redux"
import { nav2, nav4 } from "../../../redux/deposit/deposit.actions";

const DepositContainer3 = () => { 
    const dispatch = useDispatch();
    const postData = useSelector(state => state.deposit.postData);

    const handleClick = () => {
        dispatch(nav4())
    }

    return (<div className="page-dw wide-xs m-auto" id="pm-step-container">
    <div className="nk-pps-apps">
        <div className="nk-pps-steps">
            <span className="step"></span>
            <span className="step"></span>
            <span className="step active"></span>
            <span className="step"></span>
        </div>
        <div className="nk-pps-title text-center">
            <h3 className="title">Confirm Your Deposit</h3>
            <p className="caption-text">You are about to deposit <strong className="text-dark">{postData.crytoValue} {postData.currency}</strong> in your account.</p>
            <p className="sub-text-sm">Please review the information and confirm.</p>
        </div>
        <div className="nk-pps-data">
            <ul className="nk-olist">
                <li className="nk-olist-item">
                    <div className="label lead-text">Payment method</div>
                    <div className="data"><span className="method"><em className="icon ni ni-wallet-fill"></em> <span>{postData.paymentMethod.toUpperCase()}</span></span></div>
                </li>

                <li className="nk-olist-item is-grouped">
                    <div className="label lead-text">You will send</div>
                    <div className="data"><span className="amount">{parseFloat(postData.amountCrypto).toFixed(4)} {postData.currency.toUpperCase()}</span></div>
                </li>
                {/* <li className="nk-olist-item small">
                    <div className="label">Equivalent to</div>
                    <div className="data fw-normal text-soft">
                        <span className="amount">{postData.amountCrypto} {postData.currency.toUpperCase()}</span>
                    </div>
                </li> */}
                <li className="nk-olist-item small is-grouped">
                    <div className="label">Exchange rate</div>
                    <div className="data fw-normal text-soft">
                        <span className="amount">1 USD = {parseFloat(postData.cryptoValue).toFixed(2)} {postData.currency.toUpperCase()}</span>
                    </div>
                </li>


            </ul>
            <ul className="nk-olist">
                <li className="nk-olist-item nk-olist-item-final">
                    <div className="label lead-text">Amount to deposit</div>
                    <div className="data"><span className="amount">{postData.amountUSD} USD</span></div>
                </li>
            </ul>


            <div className="sub-text-sm">* Payment info (Bitcoin wallet) will available once you proceed.</div>
        </div>
        <div className="nk-pps-field form-action text-center">
            <div className="nk-pps-action">
                <button onClick={handleClick} className="btn btn-lg btn-block btn-primary" id="confirm-deposit" >
                    <span>Confirm &amp; Pay</span>
                </button>
            </div>
            <div className="nk-pps-action pt-3">
                <button onClick={() => dispatch(nav2(postData.paymentMethod))} className="btn btn-outline-danger btn-trans">Cancel Order</button>
            </div>
        </div>
    </div>
</div>
)
}

export default DepositContainer3