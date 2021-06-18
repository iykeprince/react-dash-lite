import { Link } from 'react-router-dom'

const WithdrawInitial = () => {

    return (<div className="page-dw wide-xs m-auto" id="wd-step-container">
        <div className="nk-pps-apps">
            <div className="nk-pps-result">
                <em className="icon icon-circle icon-circle-xxl ni ni-wallet-out bg-info"></em>
                <h4 className="title">You're almost ready to withdraw!</h4>
                <div className="nk-pps-text sm">
                    <p className="caption-text">To make a withdraw, please add a withdraw account from your profile (withdraw accounts).</p>
                </div>
                <div className="nk-pps-action">
                    <ul className="btn-group-vertical align-center gy-3">
                        <li>
                            <Link to="/profile/account" className="btn btn-lg btn-mw btn-primary">Add Withdraw Account</Link>
                        </li>
                        <li>
                            <Link to="/" className="link link-primary">Go to Dashboard</Link>
                        </li>
                    </ul>
                </div>
                <div className="nk-pps-notes text-center">
                    Please feel free to contact us if you have any question.
        </div>
            </div>
        </div>
    </div>
    );
}
export default WithdrawInitial