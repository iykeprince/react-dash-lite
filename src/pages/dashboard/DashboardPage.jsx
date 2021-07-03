import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Layout from "../../components/layout/layout/layout.component"
import DepositWrapper from "../deposit/components/DepositWrapper"
import DepositPage from "../deposit/DepositPage"
import BalanceFlowChart from "./components/BalanceFlowChart"
import PlanListBox from "./components/PlanListBox"
import RecentActivity from "./components/RecentActivity"
import ReferalBox from "./components/ReferalBox"
import SupportBox from "./components/SupportBox"
import TradingViewChart from './components/trading-view-chart/trading-view-chart.component'
import axios from 'axios'
/**
 * 
 * user.trading_wallet <= 0
        ? <DepositWrapper />
        :
 */

const DashboardPage = () => {
    const user = useSelector(state => state.auth.user);
    const [btc, setBtc] = useState(0.0)
    const [eth, setEth] = useState(0.0)
    const [doge, setDoge] = useState(0.0)

    useEffect(() => {
        getExchange()
    }, [])

    const getExchange = async () => {
        const btcResult = await axios.get(`https://api.cryptonator.com/api/ticker/btc-usd`)
        const ethResult = await axios.get(`https://api.cryptonator.com/api/ticker/eth-usd`)
        const dogeResult = await axios.get(`https://api.cryptonator.com/api/ticker/doge-usd`)

        if(btcResult){
            setBtc( btcResult.data.ticker.price)
            setEth( ethResult.data.ticker.price)
            setDoge( dogeResult.data.ticker.price)
        }
    }

    return (
        <Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <>
                            <div className="nk-block-head">
                                <div className="nk-block-head-sub"><span>Welcome!</span>
                                </div>
                                <div className="nk-block-between-md g-4">
                                    <div className="nk-block-head-content">
                                        <h2 className="nk-block-title fw-normal">{user && user.fullname}</h2>
                                        <div className="nk-block-des">
                                            <p>Here's a summary of your account at a glance.</p>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <ul className="nk-block-tools gx-3">
                                            <li><Link to="/deposit" className="btn btn-primary"><span>Deposit</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                                            <li className="opt-menu-md dropdown">
                                                <Link className="btn btn-white btn-light btn-icon" to="/profile"><em className="icon ni ni-setting"></em></Link>
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
                                                                    <div className="number-lg">3</div>
                                                                </div>
                                                                <div className="nk-wg7-stats w-50">
                                                                    {/* <div className="nk-wg7-title">Transactions</div>
                                                                        <div className="number">34,405</div> */}
                                                                </div>
                                                            </div>
                                                            <div className="nk-wg7-foot">
                                                                {/* <span className="nk-wg7-note">Last activity at <span>19 Nov, 2019</span></span> */}
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
                                                        {/* <a href="html/crypto/wallets.html" className="link link-primary">Wallet</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-2">
                                                <div className="col-sm-4">
                                                    <div className="card bg-light">
                                                        <div className="nk-wgw sm">
                                                            <div className="nk-wgw-inner">
                                                                <div className="nk-wgw-name">
                                                                    <div className="nk-wgw-icon">
                                                                        <em className="icon ni ni-sign-btc"></em>
                                                                    </div>
                                                                    <h5 className="nk-wgw-title title">Bitcoin</h5>
                                                                </div>
                                                                <div className="nk-wgw-balance">
                                                                    <div className="amount">{btc}<span className="currency currency-nio">BTC</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card bg-light">
                                                        <div className="nk-wgw sm">
                                                            <div className="nk-wgw-inner" >
                                                                <div className="nk-wgw-name">
                                                                    <div className="nk-wgw-icon">
                                                                        <em className="icon ni ni-sign-btc"></em>
                                                                    </div>
                                                                    <h5 className="nk-wgw-title title">Etheterum</h5>
                                                                </div>
                                                                <div className="nk-wgw-balance">
                                                                    <div className="amount">{eth}<span className="currency currency-btc">ETH</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card bg-light">
                                                        <div className="nk-wgw sm">
                                                            <div className="nk-wgw-inner" >
                                                                <div className="nk-wgw-name">
                                                                    <div className="nk-wgw-icon">
                                                                        <em className="icon ni ni-sign-eth"></em>
                                                                    </div>
                                                                    <h5 className="nk-wgw-title title">Doge</h5>
                                                                </div>
                                                                <div className="nk-wgw-balance">
                                                                    <div className="amount">{doge}<span className="currency currency-eth">DOGE</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="nk-block nk-block-lg">
                                            <PlanListBox />
                                            {/* <Link to="/investment" className="btn btn-danger btn-lg">View Investment</Link> */}
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
                                        {/* <BalanceFlowChart /> */}
                                        <TradingViewChart />
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <ReferalBox />
                            </div>
                            <div className="nk-block">
                                <SupportBox />
                            </div>
                        </>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default DashboardPage