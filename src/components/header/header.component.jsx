import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import useAuth from '../../hooks/auth.hook';
import { toggleSidebar } from '../../redux/util/util.actions';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const auth = useAuth;

    const toggleState = useSelector(state => state.util.showSidebar)

    const navToggler = (e) =>{ 
        e.preventDefault();
        dispatch(toggleSidebar());
    }

    const handleSignOut = () => {
        auth.signOut(() => {
            window.location.href = "/login"
        });
    }


    return (
        <div className="nk-header nk-header-fluid nk-header-fixed is-light">
            <div className="container-fluid">
                <div className="nk-header-wrap">
                    <div className="nk-menu-trigger d-xl-none ml-n1">
                        <a href="#" onClick={navToggler} className={`nk-nav-toggle nk-quick-nav-icon ${toggleState ? 'toggle-active' : ''}`}><em className="icon ni ni-menu"></em></a>
                    </div>
                    <div className="nk-header-brand d-xl-none">
                        <a href="html/crypto/index.html" className="logo-link">
                            <img className="logo-light logo-img" src="./assets/logos/brandmark_black@4x.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                            <img className="logo-dark logo-img" src="./assets/logos/brandmark_blue@4x.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            {/* <span className="nio-version">Crypto</span> */}
                        </a>
                    </div>
                    <div className="nk-header-news d-none d-xl-block">
                        <div className="nk-news-list">
                            <a className="nk-news-item" href="#">
                                <div className="nk-news-icon">
                                    <em className="icon ni ni-card-view"></em>
                                </div>

                            </a>
                        </div>
                    </div>
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav">
                            <li className="dropdown user-dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <div className="user-toggle">
                                        <div className="user-avatar sm">
                                            <em className="icon ni ni-user-alt"></em>
                                        </div>
                                        <div className="user-info d-none d-md-block">
                                            {user.verified === "1"
                                                ? (<div className="user-status user-status-verified">Verified</div>)
                                                : (<div className="user-status user-status-unverified">Unverified</div>)}
                                            <div className="user-name dropdown-indicator">{user.fullname}</div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                        <div className="user-card">
                                            <div className="user-avatar">
                                                <span>{user.fullname && user.fullname.split(' ').map(u => u[0])}</span>
                                            </div>
                                            <div className="user-info">
                                                <span className="lead-text">{user.fullname}</span>
                                                <span className="sub-text">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-inner user-account-info">
                                        <h6 className="overline-title-alt">BitFetter Account</h6>
                                        <div className="user-balance">${new Intl.NumberFormat().format(user.amount_in_stock)} <small className="currency currency-btc">USD</small></div>
                                        <div className="user-balance-sub"><span>34.4939 <span className="currency currency-btc">BTC</span></span></div>
                                        <Link to="/withdraw" className="link"><span>Withdraw Funds</span> <em className="icon ni ni-wallet-out"></em></Link>
                                    </div>
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li><Link to="/profile"><em className="icon ni ni-user-alt"></em><span>View Profile</span></Link></li>
                                            <li><Link to="/profile/account"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></Link></li>
                                            {/* <li><a href="profile-activity.html"><em className="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li> */}
                                        </ul>
                                    </div>
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li><a onClick={handleSignOut}><em className="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown notification-dropdown mr-n1">
                                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown">
                                    <div className="icon-status icon-status-info"><em className="icon ni ni-bell"></em></div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                                    <div className="dropdown-head">
                                        <span className="sub-title nk-dropdown-title">Notifications</span>
                                        <a href="#">Mark All as Read</a>
                                    </div>
                                    <div className="dropdown-body">
                                        <div className="nk-notification">
                                            <div className="nk-notification-item dropdown-inner">
                                                <div className="nk-notification-icon">
                                                    <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                </div>
                                                <div className="nk-notification-content">
                                                    <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                </div>
                                            </div>

                                            <div className="nk-notification-item dropdown-inner">
                                                <div className="nk-notification-icon">
                                                    <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                </div>
                                                <div className="nk-notification-content">
                                                    <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-foot center">
                                        <a href="#">View All</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header