import { useSelector } from "react-redux";
import AccountItem from "./AccountItem"

const AccountList = () => {
    const accounts = useSelector(state => state.withdraw.accounts);
    return (<>
        <div className="nk-block-head">
            <div className="nk-block-between-md g-3">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Your Accounts</h5>
                    <div className="nk-block-des">
                        <p>Below accounts that you’d like to withdraw funds.</p>
                    </div>
                </div>
                <div className="nk-block-head-tools">
                    <div className="dropdown">
                        <a href="#" className="btn btn-primary" data-toggle="dropdown">Add Account</a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="link-list-opt no-bdr">
                                <li>
                                    <a href="#" className="wd-new-account" data-action="https://investorm.xyz/withdraw/account/paypal" data-modal="wdm-account">
                                        <em className="icon ni ni-paypal-alt"></em>
                                        <span>PayPal Account</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="wd-new-account" data-action="https://investorm.xyz/withdraw/account/crypto-withdraw" data-modal="wdm-account">
                                        <em className="icon ni ni-wallet-fill"></em>
                                        <span>Crypto Wallet</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="wd-new-account" data-action="https://investorm.xyz/withdraw/account/bank" data-modal="wdm-account">
                                        <em className="icon ni ni-building-fill"></em>
                                        <span>Bank Account</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card card-bordered" id="wd-account-list">
            <div className="nk-data data-list">
                {accounts.map((account, index) => <AccountItem key={index} account={account} />)}
                
            </div>
        </div>
        <div className="notes mt-4">
            <ul>
                <li className="alert-note is-plain text-danger">
                    <em className="icon ni ni-alert-circle"></em>
                    <p>Caution: Your updated information only effect on new withdraw request.</p>
                </li>
                <li className="alert-note is-plain">
                    <em className="icon ni ni-info"></em>
                    <p>You should enter your correct information for receiving payment.</p>
                </li>
            </ul>
        </div>
    </>
    )
}

export default AccountList