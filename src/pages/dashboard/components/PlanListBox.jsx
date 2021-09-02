import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvestments } from "../../../redux/investment/investment.actions";
import MyInvestmentModal from "./MyInvestmentModal";
import { Link } from 'react-router-dom'

const PlanListBox = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const investments = useSelector(state => state.investment.investments);
    const amountInvested = useSelector(state => state.investment.amountInvested);
    const calculatedProfit = useSelector(state => state.investment.calculatedProfit);
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getInvestments())
    }, [])


    return (
        <>
            <div className="nk-iv-scheme-list">
                <div className="nk-iv-scheme-item">
                    <div className="nk-iv-scheme-icon is-running">
                        <em className="icon ni ni-update"></em>
                    </div>
                    <div className="nk-iv-scheme-info">
                        <div className="nk-iv-scheme-name">{investments.length} Ongoing investment(s) </div>
                        <div className="nk-iv-scheme-desc">Invested Amount - <span className="amount">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountInvested)}</span></div>
                    </div>

                    <div className="nk-iv-scheme-amount">
                        {/* <div className="nk-iv-scheme-amount-a nk-iv-scheme-order">
                            <span className="nk-iv-scheme-label text-soft">Total Return</span>
                            <span className="nk-iv-scheme-value amount">$ 499.99</span>
                        </div> */}
                        <div className="nk-iv-scheme-amount-b nk-iv-scheme-order">
                            <span className="nk-iv-scheme-label text-soft">Net Profit Earn</span>
                            <span className="nk-iv-scheme-value amount">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.available_profit)} <span className="amount-ex"></span></span>
                        </div>
                    </div>
                    <div className="nk-iv-scheme-more">
                        <Link className="btn btn-icon btn-lg btn-round btn-trans" to="/investment"><em className="icon ni ni-forward-ios"></em></Link>
                    </div>
                    <div className="nk-iv-scheme-progress">
                        <div className="progress-bar" data-progress="25"></div>
                    </div>
                </div>

            </div>
            <MyInvestmentModal show={show} handleClose={handleClose} />
        </>
    );
}

export default PlanListBox