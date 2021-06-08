import DashboardLayout from "../../components/layout/dashboard/dashboard.component"
import BalanceFlowChart from "./components/BalanceFlowChart"
import PlanListBox from "./components/PlanListBox"
import RecentActivity from "./components/RecentActivity"
import ReferalBox from "./components/ReferalBox"
import SupportBox from "./components/SupportBox"

const Dashboard = () => {

    
    return (
        <DashboardLayout>
            <div class="nk-content nk-content-fluid">
                <div class="container-xl wide-lg">
                    <div class="nk-content-body">
                        <div class="nk-block-head">
                            <div class="nk-block-head-sub"><span>Welcome!</span>
                            </div>
                            <div class="nk-block-between-md g-4">
                                <div class="nk-block-head-content">
                                    <h2 class="nk-block-title fw-normal">Abu Bin Ishityak</h2>
                                    <div class="nk-block-des">
                                        <p>Here's a summary of your account at a glance.</p>
                                    </div>
                                </div>
                                <div class="nk-block-head-content">
                                    <ul class="nk-block-tools gx-3">
                                        <li><a href="#" class="btn btn-primary"><span>Deposit</span> <em class="icon ni ni-arrow-long-right"></em></a></li>
                                        <li class="opt-menu-md dropdown">
                                            <a href="#" class="btn btn-white btn-light btn-icon" data-toggle="dropdown"><em class="icon ni ni-setting"></em></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <ul class="link-list-opt no-bdr">
                                                    <li><a href="#"><em class="icon ni ni-coin-alt"></em><span>Currency Settings</span></a></li>
                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="nk-block">
                            <div class="row gy-gs">
                                <div class="col-lg-5 col-xl-4">
                                    <div class="nk-block">
                                        <div class="nk-block-head-xs">
                                            <div class="nk-block-head-content">
                                                <h5 class="nk-block-title title">Overview</h5>
                                            </div>
                                        </div>
                                        <div class="nk-block">
                                            <div class="card card-bordered text-light is-dark h-100">
                                                <div class="card-inner">
                                                    <div class="nk-wg7">
                                                        <div class="nk-wg7-stats">
                                                            <div class="nk-wg7-title">Available balance in USD</div>
                                                            <div class="number-lg amount">$179,850.95</div>
                                                        </div>
                                                        <div class="nk-wg7-stats-group">
                                                            <div class="nk-wg7-stats w-50">
                                                                <div class="nk-wg7-title">Wallets</div>
                                                                <div class="number-lg">5</div>
                                                            </div>
                                                            <div class="nk-wg7-stats w-50">
                                                                <div class="nk-wg7-title">Transactions</div>
                                                                <div class="number">34,405</div>
                                                            </div>
                                                        </div>
                                                        <div class="nk-wg7-foot">
                                                            <span class="nk-wg7-note">Last activity at <span>19 Nov, 2019</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-xl-8">
                                    <div class="nk-block">
                                        <div class="nk-block-head-xs">
                                            <div class="nk-block-between-md g-2">
                                                <div class="nk-block-head-content">
                                                    <h5 class="nk-block-title title">Digital Wallets</h5>
                                                </div>
                                                <div class="nk-block-head-content">
                                                    <a href="html/crypto/wallets.html" class="link link-primary">Wallet</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row g-2">
                                            <div class="col-sm-4">
                                                <div class="card bg-light">
                                                    <div class="nk-wgw sm">
                                                        <a class="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div class="nk-wgw-name">
                                                                <div class="nk-wgw-icon">
                                                                    <em class="icon ni ni-sign-btc"></em>
                                                                </div>
                                                                <h5 class="nk-wgw-title title">NioWallet</h5>
                                                            </div>
                                                            <div class="nk-wgw-balance">
                                                                <div class="amount">4.434953<span class="currency currency-nio">NIO</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="card bg-light">
                                                    <div class="nk-wgw sm">
                                                        <a class="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div class="nk-wgw-name">
                                                                <div class="nk-wgw-icon">
                                                                    <em class="icon ni ni-sign-btc"></em>
                                                                </div>
                                                                <h5 class="nk-wgw-title title">Bitcoin Wallet</h5>
                                                            </div>
                                                            <div class="nk-wgw-balance">
                                                                <div class="amount">4.434953<span class="currency currency-btc">BTC</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="card bg-light">
                                                    <div class="nk-wgw sm">
                                                        <a class="nk-wgw-inner" href="html/crypto/wallet-bitcoin.html">
                                                            <div class="nk-wgw-name">
                                                                <div class="nk-wgw-icon">
                                                                    <em class="icon ni ni-sign-eth"></em>
                                                                </div>
                                                                <h5 class="nk-wgw-title title">Ethereum Wallet</h5>
                                                            </div>
                                                            <div class="nk-wgw-balance">
                                                                <div class="amount">0.000560<span class="currency currency-eth">ETH</span></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div class="nk-block nk-block-lg">
                                        <PlanListBox />
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div class="nk-block nk-block-lg">
                            <div class="row gy-gs">
                                <div class="col-md-6">
                                    <RecentActivity />
                                </div>
                                <div class="col-md-6">
                                    <BalanceFlowChart />
                                </div>
                            </div>
                        </div>
                        <div class="nk-block">
                            <ReferalBox />
                        </div>
                        <div class="nk-block">
                            <SupportBox />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard