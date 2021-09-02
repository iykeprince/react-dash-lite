import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setActiveLink, toggleSidebar } from "../../redux/util/util.actions";

const Sidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    const exchangeData = useSelector(state => state.util.exchangeData);
    const loadingExchange = useSelector(state => state.util.loading);
    // const [activeLink, setActiveLink] = useState("dashboard");

    const toggleState = useSelector(state => state.util.showSidebar)
    const activeLink = useSelector(state => state.util.activeLink);

    useEffect(() => {

    }, [toggleState])

    const navToggler = e => {
        e.preventDefault();
        dispatch(toggleSidebar());
    }

    const handleNavigate = (link) => {
        console.log('current nav link', link)
        dispatch(setActiveLink(link))
    }

    return (
        <>
            <div id="sidebarContainer" className={`nk-sidebar nk-sidebar-fat nk-sidebar-fixed ${toggleState ? 'nk-sidebar-active' : ''}`}>
                <div className="nk-sidebar-element nk-sidebar-head">
                    <div className="nk-sidebar-brand">
                        <a href="/" className="logo-link nk-sidebar-logo">
                            <img className="logo-light logo-img" src="./assets/logos/brandmark_blue.png" srcSet="./assets/logos/brandmark_blue.png" alt="logo" />
                            <img className="logo-dark logo-img" src="./assets/logos/brandmark_blue.png" srcSet="./assets/logos/brandmark_blue.png" alt="logo-dark" />
                            {/* <span className="nio-version">Crypto</span> */}
                        </a>
                    </div>
                    <div className="nk-menu-trigger mr-n2">
                        <a href="#" className={`nk-nav-toggle nk-quick-nav-icon d-xl-none ${toggleState ? 'toggle-active' : ''}`} onClick={navToggler}><em className="icon ni ni-arrow-left"></em></a>
                    </div>
                </div>
                <div className="nk-sidebar-element">
                    <div className="nk-sidebar-body" data-simplebar>
                        <div className="nk-sidebar-content">
                            <div className="nk-sidebar-widget d-none d-xl-block">
                                <div className="user-account-info between-center">
                                    <div className="user-account-main">
                                        <h6 className="overline-title-alt">Available Balance</h6>
                                        <div className="user-balance">${new Intl.NumberFormat().format(user.trading_wallet)} <small className="currency currency-btc">USD</small></div>
                                        <div className="user-balance-alt">{loadingExchange ? '...' : exchangeData === null ? "--" : `${(user.trading_wallet / exchangeData.price).toFixed(4)}`}
                                            <span className="currency currency-btc"> BTC</span>
                                            <span className="text-info ml-2">{exchangeData && parseFloat(exchangeData.change).toFixed(1)}% <em className="icon ni ni-arrow-long-up"></em></span>
                                        </div>
                                    </div>
                                    <a href="#" className="btn btn-white btn-icon btn-light"><em className="icon ni ni-line-chart"></em></a>
                                </div>
                                <ul className="user-account-data gy-1">
                                    <li>
                                        <div className="user-account-label">
                                            <span className="sub-text">Profits</span>
                                        </div>
                                        <div className="user-account-value">
                                            <span className="lead-text">{new Intl.NumberFormat().format(user.available_profit)} <span className="currency currency-btc">USD</span></span>
                                            {/* <span className="text-success ml-2">3.1% <em className="icon ni ni-arrow-long-up"></em></span> */}
                                        </div>
                                    </li>
                                    <li>
                                        {/* <div className="user-account-label">
                                        <span className="sub-text">Last Deposit</span>
                                    </div>
                                    <div className="user-account-value">
                                        <span className="sub-text">$73,004 <span className="currency currency-btc">USD</span></span>
                                    </div> */}
                                    </li>
                                </ul>
                                <div className="user-account-actions">
                                    <ul className="g-3">
                                        <li><Link to="/deposit" className="btn btn-lg btn-primary"><span>Deposit</span></Link></li>
                                        <li><Link to="/withdraw" className="btn btn-lg btn-warning"><span>Withdraw</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0">
                                <a className="nk-profile-toggle toggle-expand" data-target="sidebarProfile" href="#">
                                    <div className="user-card-wrap">
                                        <div className="user-card">
                                            <div className="user-avatar">
                                                <span>{user.fullname && user.fullname.split(' ').map(u => u[0])}</span>
                                            </div>
                                            <div className="user-info">
                                                <span className="lead-text">{user.fullname}</span>
                                                <span className="sub-text">{user.email}</span>
                                            </div>
                                            <div className="user-action">
                                                <em className="icon ni ni-chevron-down"></em>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="nk-profile-content toggle-expand-content" >
                                    <div className="user-account-info between-center">
                                        <div className="user-account-main">
                                            <h6 className="overline-title-alt">Available Balance</h6>
                                            <div className="user-balance">$2,014,095 <small className="currency currency-btc">USD</small></div>
                                            <div className="user-balance-alt">18,934.84 <span className="currency currency-btc">BTC</span></div>
                                        </div>
                                        <a href="#" className="btn btn-icon btn-light"><em className="icon ni ni-line-chart"></em></a>
                                    </div>
                                    <ul className="user-account-data">
                                        <li>
                                            <div className="user-account-label">
                                                <span className="sub-text">Profits (7d)</span>
                                            </div>
                                            <div className="user-account-value">
                                                <span className="lead-text">+ $5,526 <span className="currency currency-btc">USD</span></span>
                                                <span className="text-success ml-2">3.1% <em className="icon ni ni-arrow-long-up"></em></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="user-account-label">
                                                <span className="sub-text">Last Deposit</span>
                                            </div>
                                            <div className="user-account-value">
                                                <span className="sub-text text-base">$7,540 <span className="currency currency-btc">(3.200BTC)</span></span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="user-account-links">
                                        <li><a href="#" className="link"><span>Withdraw Funds</span> <em className="icon ni ni-wallet-out"></em></a></li>
                                        <li><a href="#" className="link"><span>Deposit Funds</span> <em className="icon ni ni-wallet-in"></em></a></li>
                                    </ul>
                                    <ul className="link-list">
                                        <li><a href="profile.html"><em className="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                        <li><a href="profile-security.html"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                        <li><a href="profile-activity.html"><em className="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                    </ul>
                                    <ul className="link-list">
                                        <li><a href="#"><em className="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="nk-sidebar-menu">

                                <ul className="nk-menu">
                                    <li className="nk-menu-heading">
                                        <h6 className="overline-title">Menu</h6>
                                    </li>
                                    <li className={`nk-menu-item ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigate('dashboard')}>
                                        <Link to="/" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-dashboard"></em></span>
                                            <span className="nk-menu-text">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className={`nk-menu-item ${activeLink === 'transactions' ? 'active' : ''}`} onClick={() => handleNavigate('transactions')}>
                                        <Link to="/transactions" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-repeat"></em></span>
                                            <span className="nk-menu-text">Transaction</span>
                                        </Link>
                                    </li>
                                    <li className={`nk-menu-item ${activeLink === 'investment' ? 'active' : ''}`} onClick={() => handleNavigate('investment')}>
                                        <Link to="/investment" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-user-c"></em></span>
                                            <span className="nk-menu-text">Investment</span>
                                        </Link>
                                    </li>
                                    <li className={`nk-menu-item ${activeLink === 'plans' ? 'active' : ''}`} onClick={() => handleNavigate('plans')}>
                                        <Link to="/plans" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-wallet-alt"></em></span>
                                            <span className="nk-menu-text">Our Plans</span>
                                        </Link>
                                    </li>

                                    <li className={`nk-menu-item ${activeLink === 'profile' ? 'active' : ''}`} onClick={() => handleNavigate('profile')}>
                                        <Link to="/profile" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-account-setting"></em></span>
                                            <span className="nk-menu-text">My Profile</span>
                                        </Link>
                                    </li>
                                    <li className={`nk-menu-item ${activeLink === 'referrals' ? 'active' : ''}`} onClick={() => handleNavigate('referrals')}>
                                        <Link to="/referrals" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-cloud"></em></span>
                                            <span className="nk-menu-text">Referrals</span>
                                        </Link>
                                    </li>

                                    <li className={`nk-menu-item ${activeLink === 'kyc' ? 'active' : ''}`} onClick={() => handleNavigate('kyc')}>
                                        <Link to="/kyc" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                            <span className="nk-menu-text">KYC Application</span>
                                        </Link>
                                    </li>

                                    <li className={`nk-menu-item ${activeLink === 'sync' ? 'active' : ''}`} onClick={() => handleNavigate('sync')}>
                                        <Link to="/sync" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                            <span className="nk-menu-text">Account Sync</span>
                                        </Link>
                                    </li>
                                </ul>
                                {user.role === 'admin' && (
                                    <>
                                        <ul className="nk-menu">
                                            <li className="nk-menu-heading">
                                                <h6 className="overline-title">Admin Menu</h6>
                                            </li>
                                            <li className={`nk-menu-item ${activeLink === 'admin-users' ? 'active' : ''}`} onClick={() => handleNavigate('admin-users')}>
                                                <Link to="/admin-users" className="nk-menu-link">
                                                    <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                                    <span className="nk-menu-text">Admin Users</span>
                                                </Link>
                                            </li>

                                            <li className={`nk-menu-item ${activeLink === 'admin-topup' ? 'active' : ''}`} onClick={() => handleNavigate('admin-topup')}>
                                                <Link to="/admin-topup" className="nk-menu-link">
                                                    <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                                    <span className="nk-menu-text">Admin Topup</span>
                                                </Link>
                                            </li>

                                            <li className={`nk-menu-item ${activeLink === 'admin-payments' ? 'active' : ''}`} onClick={() => handleNavigate('admin-payments')}>
                                                <Link to="/admin-payments" className="nk-menu-link">
                                                    <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                                    <span className="nk-menu-text">Admin Payments</span>
                                                </Link>
                                            </li>

                                            <li className={`nk-menu-item ${activeLink === 'admin-withdrawals' ? 'active' : ''}`} onClick={() => handleNavigate('admin-withdrawals')}>
                                                <Link to="/admin-withdrawals" className="nk-menu-link">
                                                    <span className="nk-menu-icon"><em className="icon ni ni-file-text"></em></span>
                                                    <span className="nk-menu-text">Admin Withdrawals</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>

                            <div className="nk-sidebar-footer">
                                <ul className="nk-menu nk-menu-footer">
                                    <li className="nk-menu-item">
                                        <a href="mailto:support@bitfetter.com" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-help-alt"></em></span>
                                            <span className="nk-menu-text">Support</span>
                                        </a>
                                    </li>
                                    {/* <li className="nk-menu-item ml-auto">
                                    <div className="dropup">
                                        <a href="#" className="nk-menu-link dropdown-indicator has-indicator" data-toggle="dropdown" data-offset="0,10">
                                            <span className="nk-menu-icon"><em className="icon ni ni-globe"></em></span>
                                            <span className="nk-menu-text">English</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                            <ul className="language-list">
                                                <li>
                                                    <a href="#" className="language-item">
                                                        <img src="./images/flags/english.png" alt="" className="language-flag" />
                                                        <span className="language-name">English</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="language-item">
                                                        <img src="./images/flags/spanish.png" alt="" className="language-flag" />
                                                        <span className="language-name">Español</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="language-item">
                                                        <img src="./images/flags/french.png" alt="" className="language-flag" />
                                                        <span className="language-name">Français</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="language-item">
                                                        <img src="./images/flags/turkey.png" alt="" className="language-flag" />
                                                        <span className="language-name">Türkçe</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div onClick={navToggler} className={`${toggleState ? 'nk-sidebar-overlay' : ''}`} ></div> */}
        </>
    )
};

export default Sidebar