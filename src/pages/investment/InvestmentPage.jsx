import Layout from "../../components/layout/layout/layout.component"
import { Link } from 'react-router-dom'
import NoInvestment from "./components/NoInvestment"
import { useSelector } from "react-redux"

const InvestmentPage = () => {
    const user = useSelector(state => state.auth.user)

    return (<Layout>
        <div className="nk-content nk-content-fluid">
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
                                    <li className="order-md-last"><Link to="https://investorm.xyz/invest" className="btn btn-primary"><span>Invest &amp; Earn</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                                    <li><Link to="https://investorm.xyz/deposit" className="btn btn-light btn-white"><span>Deposit Funds</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="nk-block">
                            <NoInvestment />
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
                                                        <div className="number number-md">{user && new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(user.trading_wallet)} <small className="currency">USD</small></div>
                                                    </div>
                                                    <div className="nk-wgacc-subtitle">Available Funds</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <ul className="nk-block-tools gx-4">
                                                <li><Link to="https://investorm.xyz/investment/payout" className="btn btn-secondary iv-payout"><span>Deposit Funds</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
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
                                                                            <div className="number number-md">$850.00 <small className="currency">USD</small></div>
                                                                        </div>
                                                                        <div className="nk-wgacc-subtitle">Currently Invested</div>
                                                                    </div>
                                                                    <div className="nk-wgacc-sub">
                                                                        <span className="nk-wgacc-sign text-soft"><em className="icon ni ni-plus"></em></span>
                                                                        <div className="nk-wgacc-amount">
                                                                            <div className="number number-sm">$645.00</div>
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
                                                <li><Link to="https://investorm.xyz/investment/history"><em className="icon ni ni-file-check"></em> <span>Investment History</span></Link></li>
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
                            <div className="nk-plan-item">
                                <div className="nk-plan-icon is-running">
                                    <em className="icon ni ni-update"></em>
                                </div>
                                <div className="nk-plan-info w-max-275px">
                                    <div className="nk-plan-name">Premium Plan </div>
                                    <div className="nk-plan-desc">Invested: <span className="amount">$600.00 USD</span></div>
                                </div>
                                <div className="nk-plan-term">
                                    <div className="nk-plan-start nk-plan-order">
                                        <span className="nk-plan-label text-soft">Start Date</span>
                                        <span className="nk-plan-value date">Jun 15, 2021</span>
                                    </div>
                                    <div className="nk-plan-end nk-plan-order">
                                        <span className="nk-plan-label text-soft">End Date</span>
                                        <span className="nk-plan-value date">Jul 15, 2021</span>
                                    </div>
                                </div>
                                <div className="nk-plan-amount">
                                    <div className="nk-plan-amount-a nk-plan-order">
                                        <span className="nk-plan-label text-soft">Total Return</span>
                                        <span className="nk-plan-value amount">$870.00 USD</span>
                                    </div>
                                    <div className="nk-plan-amount-b nk-plan-order">
                                        <span className="nk-plan-label text-soft">
                                            Net Profit
                                        </span>
                                        <span className="nk-plan-value amount">$270.00 USD</span>
                                    </div>
                                </div>
                                <div className="nk-plan-more">
                                    <Link className="btn btn-icon btn-lg btn-round btn-trans" to={`/investments-details/:investmentId`}><em className="icon ni ni-forward-ios"></em></Link>
                                </div>
                                <div className="nk-plan-progress">
                                    <div className="progress-bar" data-progress="20" style={{width: "20%"}}></div>
                                </div>
                            </div>

                            <div className="nk-plan-item">
                                <div className="nk-plan-icon is-running">
                                    <em className="icon ni ni-update"></em>
                                </div>
                                <div className="nk-plan-info w-max-275px">
                                    <div className="nk-plan-name">Venus Plan</div>
                                    <div className="nk-plan-desc">Invested: <span className="amount">$250.00 USD</span></div>
                                </div>
                                <div className="nk-plan-term">
                                    <div className="nk-plan-start nk-plan-order">
                                        <span className="nk-plan-label text-soft">Start Date</span>
                                        <span className="nk-plan-value date">Jun 15, 2021</span>
                                    </div>
                                    <div className="nk-plan-end nk-plan-order">
                                        <span className="nk-plan-label text-soft">End Date</span>
                                        <span className="nk-plan-value date">Jul 15, 2021</span>
                                    </div>
                                </div>
                                <div className="nk-plan-amount">
                                    <div className="nk-plan-amount-a nk-plan-order">
                                        <span className="nk-plan-label text-soft">Total Return</span>
                                        <span className="nk-plan-value amount">$625.00 USD</span>
                                    </div>
                                    <div className="nk-plan-amount-b nk-plan-order">
                                        <span className="nk-plan-label text-soft">
                                            Net Profit
                                        </span>
                                        <span className="nk-plan-value amount">$375.00 USD</span>
                                    </div>
                                </div>
                                <div className="nk-plan-more">
                                    <Link className="btn btn-icon btn-lg btn-round btn-trans" to="./investments-details.html"><em className="icon ni ni-forward-ios"></em></Link>
                                </div>
                                <div className="nk-plan-progress">
                                    <div className="progress-bar" data-progress="20" style={{width: "20%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Layout>)
}

export default InvestmentPage