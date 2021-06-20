import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import DashModal from "../../../components/modal/modal.component"
import { createInvestmentPlan, navigateToPlanContainer } from "../../../redux/plan/plan.actions"

const PlanInvestContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.plan.loading)
    const selectedPlan = useSelector(state => state.plan.selectedPlan)
    const message = useSelector(state => state.plan.message)
    const exchangeData = useSelector(state => state.util.exchangeData);
    const user = useSelector(state => state.auth.user)

    const [pin, setPin] = useState("")
    const [amount, setAmount] = useState(0)
    const [formValid, setFormValid] = useState(false);
    const [error, setError] = useState("")
    const [showPinModal, setShowPinModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    useEffect(() => {
        if(message){
            setShowPinModal(false);
            setShowConfirmModal(true)
            toast.success(message)
        }
    }, [message])

    const handleUseMaxBalance = () => {
        setAmount(parseFloat(user.amount_in_stock))
    }

    const handleAmountChange = (e) => {
        console.log(e.target.value)
        let enteredAmount = parseFloat(e.target.value);

        if (e.target.value.length < 1) {
            console.log('amount is less than 1')
            return setAmount(0);
        }

        if (selectedPlan.minDeposit < enteredAmount ) {
            console.log(e.target.value, 'values', selectedPlan.minDeposit, selectedPlan.maxDeposit)
            setError("Amount entered is not valid. It's less than the expected minimum plan amount.")
            setFormValid(false)
        } else {
            setError('');
            setFormValid(true)
        }
        setAmount(parseFloat(e.target.value))

    }

    const handleGoBack = () => {
        dispatch(navigateToPlanContainer())
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (formValid) {
            setShowPinModal(true)
        }
    }

    const handleConfirmPayment = e => {
        e.preventDefault();
        console.log("pin", pin)
        

        //create investment
        const dataToPost = {...selectedPlan, ...exchangeData, amount}
        dispatch(createInvestmentPlan(dataToPost))
    }

    const hideConfirmation = () => {
        setShowConfirmModal(false)
        dispatch(navigateToPlanContainer())
    }

    return (
        <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-lg">
                <div className="nk-block-head-content">
                    <div className="nk-block-head-sub"><a onClick={handleGoBack} className="back-to"><em className="icon ni ni-arrow-left"></em><span>Back to plan</span></a></div>
                    <div className="nk-block-head-content">
                        <h2 className="nk-block-title fw-normal">Ready to get started?</h2>
                    </div>
                </div>
            </div>
            <div className="nk-block invest-block">
                <form className="invest-form" onSubmit={handleSubmit}>
                    <div className="row g-gs">
                        <div className="col-lg-7">
                            <div className="invest-field form-group">
                                <input type="hidden" value="silver" name="iv-plan" id="invest-choose-plan" />
                                <div className="dropdown invest-cc-dropdown">
                                    <a href="#" className="invest-cc-choosen">
                                        <div className="coin-item">
                                            <div className="coin-icon">
                                                <em className="icon ni ni-offer-fill"></em>
                                            </div>
                                            <div className="coin-info">
                                                <span className="coin-name">{selectedPlan.title}</span>
                                                <span className="coin-text">Invest for {selectedPlan.termDays} days and get daily profit {selectedPlan.dailyInterest}%</span>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>

                            <div className="invest-field form-group">
                                <div className="form-label-group">
                                    <label className="form-label">Or Enter Your Amount</label>
                                    <div className="dropdown">
                                        <a onClick={handleUseMaxBalance} href="#" className="link py-1" data-toggle="dropdown">Use Maximum Balance</a>

                                    </div>
                                </div>
                                <div className="form-control-group">
                                    <div className="form-info">USD</div>
                                    <input type="text" className="form-control form-control-amount form-control-lg" placeholder="100000 (without spaces or commas)" value={amount} onChange={handleAmountChange} />

                                </div>
                                <div className="form-note pt-2">Note: Minimum invest 250 USD and up to 500,000 USD depending on the investment plan.</div>
                                {error && <div className="form-note pt-2 text-danger">{error}</div>}
                            </div>
                            <div className="invest-field form-group">
                                <div className="form-label-group">
                                    <label className="form-label">Payment Account</label>
                                </div>
                                <input type="hidden" value="wallet" name="iv-wallet" id="invest-choose-wallet" />
                                <div className="dropdown invest-cc-dropdown">
                                    <a className="invest-cc-choosen">
                                        <div className="coin-item">
                                            <div className="coin-icon">
                                                <em className="icon ni ni-sign-btc"></em>
                                            </div>
                                            <div className="coin-info">
                                                <span className="coin-name">BTC Wallet</span>
                                                <span className="coin-text">Current balance: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.amount_in_stock)} </span>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                            <div className="invest-field form-group">
                                <div className="custom-control custom-control-xs custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="checkbox" required />
                                    <label className="custom-control-label" htmlFor="checkbox">I agree to the <a href="#">terms and &amp; conditions.</a></label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 offset-xl-1">
                            <div className="card card-bordered ml-lg-4 ml-xl-0">
                                <div className="nk-iv-wg4">
                                    <div className="nk-iv-wg4-sub">
                                        <h6 className="nk-iv-wg4-title title">Your Investment Details</h6>
                                        <ul className="nk-iv-wg4-overview g-2">
                                            <li>
                                                <div className="sub-text">Name of scheme</div>
                                                <div className="lead-text">{selectedPlan.title}</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Term of the scheme</div>
                                                <div className="lead-text">{selectedPlan.termDays} days</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Daily profit</div>
                                                <div className="lead-text">$ 11.99</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Daily profit %</div>
                                                <div className="lead-text">{selectedPlan.dailyInterest} %</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Total net profit</div>
                                                <div className="lead-text">$ 249.99</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Total Return</div>
                                                <div className="lead-text">$ 499.99</div>
                                            </li>

                                        </ul>
                                    </div>

                                    <div className="nk-iv-wg4-sub">
                                        <ul className="nk-iv-wg4-list">
                                            <li>
                                                <div className="sub-text">Amount to invest</div>
                                                <div className="lead-text">$ 250.00</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Conversion Fee <span>(0.5%)</span></div>
                                                <div className="lead-text">$ 1.25</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nk-iv-wg4-sub">
                                        <ul className="nk-iv-wg4-list">
                                            <li>
                                                <div className="lead-text">Total Charge</div>
                                                <div className="caption-text text-primary">$ 251.25</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nk-iv-wg4-sub text-center bg-lighter">
                                        <button type="submit" className="btn btn-lg btn-primary ttu" disabled={!formValid}>Confirm &amp; proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <DashModal show={showPinModal} onHide={() => setShowPinModal(false)} title="Confirm Your Payment">
                    <form onSubmit={handleConfirmPayment}>
                        <div className="nk-modal-text">
                            <p>To confirm your payment of <strong>${amount} ({(amount / exchangeData.price).toFixed(4)} BTC)</strong> on this investment order #93033939 from your main account. Please enter the code sent to your email in order to complete the order or cancel.</p>
                        </div>
                        <div className="nk-modal-form">
                            <div className="form-group">
                                <input type="password" className="form-control form-control-password-big text-center" onChange={e => setPin(e.target.value)} value={pin} />
                            </div>
                        </div>
                        <div className="nk-modal-action">
                            <button className="btn btn-lg btn-mw btn-primary" disabled={loading}>{loading ? `Please wait...` : `Confirm Payment`}</button>
                            <div className="sub-text sub-text-alt mt-3 mb-4">This transaction will appear on your wallet statement as Invest * SILVER.</div>
                            <a href="#" className="link link-soft" data-dismiss="modal">Cancel and return</a>
                        </div>
                    </form>
                </DashModal>
                <DashModal show={showConfirmModal} onHide={hideConfirmation} title="Investment Payment Successful!">
                    <div className="nk-modal-text">
                        <p className="sub-text">You have successfully order the Investment Plan of ‘Silver’ with amount of <strong>$250.00</strong> from your <strong>Main Account</strong>.</p>
                    </div>
                    <div className="nk-modal-action-lg">
                        <ul className="btn-group flex-wrap justify-center g-4">
                            <li><button onClick={() => history.push('/investment')} className="btn btn-lg btn-mw btn-primary">View Investment</button></li>
                            <li><button onClick={() => dispatch(navigateToPlanContainer())} className="btn btn-lg btn-mw btn-dim btn-primary"><em className="icon ni ni-reports"></em><span>See the plan</span></button></li>
                        </ul>
                    </div>
                </DashModal>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PlanInvestContainer