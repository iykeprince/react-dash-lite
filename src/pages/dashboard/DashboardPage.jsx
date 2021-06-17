import { useEffect } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/layout/dashboard/dashboard.component"
import DepositPage from "../deposit/DepositPage"
import BalanceFlowChart from "./components/BalanceFlowChart"
import PlanListBox from "./components/PlanListBox"
import RecentActivity from "./components/RecentActivity"
import ReferalBox from "./components/ReferalBox"
import SupportBox from "./components/SupportBox"

const DashboardPage = () => {
    const user = useSelector(state => state.auth.user);

  

    // if( user && user.trading_wallet === "0"){
    //     return <DepositPage />
    // }

    return (
        <DashboardLayout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <div className="nk-block-head">
                            <div className="nk-block-head-sub"><span>Welcome!</span>
                            </div>
                            <div className="nk-block-between-md g-4">
                                <div className="nk-block-head-content">
                                    <h2 className="nk-block-title fw-normal">{ user && user.fullname}</h2>
                                    <div className="nk-block-des">
                                        <p>Here's a summary of your account at a glance.</p>
                                    </div>
                                </div>
                                <div className="nk-block-head-content">
                                    <ul className="nk-block-tools gx-3">
                                        <li><a href="#" className="btn btn-primary"><span>Deposit</span> <em className="icon ni ni-arrow-long-right"></em></a></li>
                                        <li className="opt-menu-md dropdown">
                                            <a className="btn btn-white btn-light btn-icon" href="#"><em className="icon ni ni-setting"></em></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <ul className="link-list-opt no-bdr">
                                                    <li><a href="#"><em className="icon ni ni-coin-alt"></em><span>Currency Settings</span></a></li>
                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block">
                            <div className="row gy-gs">
                                <div className="col-lg-5 col-xl-4">
                                    <div className="nk-block">
                                        <div className="nk-block-head-xs">
                                            <div className="nk-block-head-content">
                                                <h5 className="nk-block-title title">Overview</h5>
                                            </div>
                                        </div>
                                        <div className="nk-block">
                                            <div className="card card-bordered text-light is-dark h-100">
                                                <div className="card-inner">
                                                    <div className="nk-wg7">
                                                        <div className="nk-wg7-stats">
                                                            <div className="nk-wg7-title">Available balance in USD</div>
                                                            <div className="number-lg amount">${user && new Intl.NumberFormat().format(user.amount_in_stock)}</div>
                                                        </div>
                                                        <div className="nk-wg7-stats-group">
                                                            <div className="nk-wg7-stats w-50">
                                                                <div className="nk-wg7-title">Wallets</div>
                                                                <div className="number-lg">5</div>
                                                            </div>
                                                            <div className="nk-wg7-stats w-50">
                                                                <div className="nk-wg7-title">Transactions</div>
                                                                <div className="number">34,405</div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-wg7-foot">
                                                            <span className="nk-wg7-note">Last activity at <span>19 Nov, 2019</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-xl-8">
                                    <div className="nk-block">
                                        <div className="nk-block-head-xs">
                                            <div className="nk-block-between-md g-2">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title title">Digital Wallets</h5>
                                                </div>
                                                <div className="nk-block-head-content">
                                                    <a href="html/crypto/wallets.html" className="link link-primary">Wallet</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col-sm-4">
                                                <div className="card bg-light">
                                                    <div className="nk-wgw sm">
                                                        <a className="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div className="nk-wgw-name">
                                                                <div className="nk-wgw-icon">
                                                                    <em className="icon ni ni-sign-btc"></em>
                                                                </div>
                                                                <h5 className="nk-wgw-title title">NioWallet</h5>
                                                            </div>
                                                            <div className="nk-wgw-balance">
                                                                <div className="amount">4.434953<span className="currency currency-nio">NIO</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="card bg-light">
                                                    <div className="nk-wgw sm">
                                                        <a className="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div className="nk-wgw-name">
                                                                <div className="nk-wgw-icon">
                                                                    <em className="icon ni ni-sign-btc"></em>
                                                                </div>
                                                                <h5 className="nk-wgw-title title">Bitcoin Wallet</h5>
                                                            </div>
                                                            <div className="nk-wgw-balance">
                                                                <div className="amount">4.434953<span className="currency currency-btc">BTC</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="card bg-light">
                                                    <div className="nk-wgw sm">
                                                        <a className="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div className="nk-wgw-name">
                                                                <div className="nk-wgw-icon">
                                                                    <em className="icon ni ni-sign-eth"></em>
                                                                </div>
                                                                <h5 className="nk-wgw-title title">Ethereum Wallet</h5>
                                                            </div>
                                                            <div className="nk-wgw-balance">
                                                                <div className="amount">0.000560<span className="currency currency-eth">ETH</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="nk-block nk-block-lg">
                                        <PlanListBox />
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div className="nk-block nk-block-lg">
                            <div className="row gy-gs">
                                <div className="col-md-6">
                                    <RecentActivity />
                                </div>
                                <div className="col-md-6">
                                    <BalanceFlowChart />
                                </div>
                            </div>
                        </div>
                        <div className="nk-block">
                            <ReferalBox />
                        </div>
                        <div className="nk-block">
                            <SupportBox />
                        </div>
                    </div>
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default DashboardPage