import { useEffect } from "react"
import { Link } from 'react-router-dom'
import NoInvestment from "./components/NoInvestment"
import { useDispatch, useSelector } from "react-redux"
import { getInvestments } from "../../redux/investment/investment.actions";
import InvestmentItem from "./components/InvestmentItem";

const InvestmentMain = () => {
    const dispatch = useDispatch();
    const investments = useSelector(state => state.investment.investments);
    const amountInvested = useSelector(state => state.investment.amountInvested);
    const calculatedProfit = useSelector(state => state.investment.calculatedProfit);
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getInvestments())
    }, [])

    // console.log('investments', investments)

    return <div className="nk-content nk-content-fluid">
        <div className="container-xl wide-lg">
            <div className="nk-content-body">
                <div className="nk-block-head">
                    <div className="nk-block-head-sub"><span>Investment</span></div>
                    <div className="nk-block-between-md g-4">
                        <div className="nk-block-head-content">
                            <h2 className="nk-block-title fw-normal">Invested Plans</h2>
                            <div className="nk-block-des">
                                <p>A Detailed summary of your investment.</p>
                            </div>
                        </div>
                        <div className="nk-block-head-content">
                            <ul className="nk-block-tools gx-3">
                                <li className="order-md-last"><Link to="/investment" className="btn btn-primary"><span>Invest &amp; Earn</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                                <li><Link to="/deposit" className="btn btn-light btn-white"><span>Deposit Funds</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nk-block">

                    <div className="row gy-gs">
                        <div className="col-md-6 col-lg-5 col-xxl-4">
                            <div className="card card-full card-bordered card-wg on-left is-primary">
                                <div className="card-inner">
                                    <div className="nk-wgacc">
                                        <div className="nk-wgacc-title text-base">
                                            Investment Account
                                            <em className="icon ni ni-info fs-13px text-soft nk-tooltip" title="" data-original-title="The available balance in your investment account."></em>
                                        </div>
                                        <div className="nk-wgacc-group flex-lg-nowrap gx-4">
                                            <div className="nk-wgacc-sub">
                                                <div className="nk-wgacc-amount">
                                                    <div className="number number-md">{user && new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.trading_wallet)} <small className="currency">USD</small></div>
                                                </div>
                                                <div className="nk-wgacc-subtitle">Available Funds</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <ul className="nk-block-tools gx-4">
                                            <li><Link to="/deposit" className="btn btn-secondary iv-payout"><span>Deposit Funds</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-7 col-xxl-8">
                            <div className="card card-bordered">
                                <div className="card-inner-group">
                                    <div className="card-inner">
                                        <div className="row gy-gs">
                                            <div className="col-md-12">
                                                <div className="nk-wgacc">
                                                    <div className="nk-wgacc-group flex-md-nowrap gx-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="nk-wgacc-title text-base">
                                                                Amount Invested
                                                                <em className="icon ni ni-info fs-13px text-soft nk-tooltip" title="" data-original-title="The investment currently actived without pending."></em>
                                                            </div>
                                                            <div className="nk-wgacc-group flex-md-nowrap gx-4">
                                                                <div className="nk-wgacc-sub">
                                                                    <div className="nk-wgacc-amount">
                                                                        <div className="number number-md">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amountInvested)} <small className="currency">USD</small></div>
                                                                    </div>
                                                                    <div className="nk-wgacc-subtitle">Currently Invested</div>
                                                                </div>
                                                                <div className="nk-wgacc-sub">
                                                                    <span className="nk-wgacc-sign text-soft"><em className="icon ni ni-plus"></em></span>
                                                                    <div className="nk-wgacc-amount">
                                                                        <div className="number number-sm">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(calculatedProfit)}</div>
                                                                    </div>
                                                                    <div className="nk-wgacc-subtitle">Approx Profit</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-wgacc-sub flex-grow-1 ml-lg-1 ml-xxl-5 d-md-none d-lg-block">
                                                            <div className="nk-wgacc-ck lg mb-0"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                                                <canvas className="chart-liner chartjs-render-monitor" id="dailyInvestment" style={{ display: 'block', width: '356px', height: '95px' }} width="356" height="95"></canvas>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-inner">
                                        <ul className="nk-wgacc-nav">
                                            <li><Link to="#"><em className="icon ni ni-file-check"></em> <span>Investment History</span></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="nk-block nk-block-lg">
                    <div className="nk-block-head-sm">
                        <div className="nk-block-head-content">
                            <h5 className="nk-block-title">Active Plan <span className="count text-base">(2)</span></h5>
                        </div>
                    </div>

                    <div className="nk-plan-list">
                        {!investments.length && <NoInvestment />}
                        {investments.length && investments.map((investment, index) => <InvestmentItem key={index} investment={investment} />)}
                    </div>
                </div>

            </div>
        </div>
    </div>
}
export default InvestmentMain