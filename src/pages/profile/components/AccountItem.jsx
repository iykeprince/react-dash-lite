import formatWalletAddress from "../../../utils/formatWalletAddress"

const AccountItem = ({account}) => (
    <div className="data-item">
        <div className="data-col">
            <span className="data-label">
                Crypto Wallet ({account.wallet_label})
                                                    <br />
                <em className="small text-soft"></em>
            </span>
            <span className="data-value">{account.wallet_name} / {formatWalletAddress(account.wallet_address)}<br /></span>
        </div>
        <div className="data-col data-col-end">
            {/* <a className="wd-view-account" href="#" data-modal="wdm-account"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></a> */}
        </div>
    </div>
)
export default AccountItem