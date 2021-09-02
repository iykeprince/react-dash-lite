import moment from "moment"
import CopyToClipboard from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import withdraw from "../../../services/withdraw.service"
import { getInitials } from "../admin-utils"

const AdminWithdrawalItem = ({
    withdrawal,
    handleCopyWallet,
    handleConfirmWithdrawal,
    handleDeleteWithdrawRecord
}) => {

    
    return (<tr className="nk-tb-item">
        <td className="nk-tb-col">
            <div className="user-card">
                <div className="user-avatar bg-dim-primary d-none d-sm-flex">
                    <span>{getInitials(withdrawal)}</span>
                </div>
                <div className="user-info">
                    <span className="tb-lead">{withdrawal.fullname} <span className="dot dot-success d-md-none ml-1"></span></span>
                    <span>{withdrawal.email}</span>
                </div>
            </div>
        </td>
        <td className="nk-tb-col tb-col-mb">
            <span className="tb-amount"><span className="currency">$</span>{withdrawal.amount}</span>
        </td>
        <td className="nk-tb-col tb-col-mb">
            <span>CRYPTO</span>
        </td>
        <td className="nk-tb-col tb-col-md">
            <span>{withdrawal.btc_address}</span>
        </td>

        <td className="nk-tb-col tb-col-lg">
            <span>{moment(withdrawal.date_pledged).format('MMMM D, YYYY')}</span>
        </td>
        <td className="nk-tb-col tb-col-md">
            {withdrawal.confirmation === '1' ? <span className="tb-status text-success">Confirmed</span> : <span className="tb-status text-info">Pending</span> }
        </td>
        <td className="nk-tb-col nk-tb-col-tools">
            <ul className="nk-tb-actions gx-1">

                <li>
                    <div className="drodown">
                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="link-list-opt no-bdr">
                                <li><CopyToClipboard text={withdrawal.btc_address} onCopy={() => toast.info('copied')}><a href="#" onClick={e => handleCopyWallet(e)}><em className="icon ni ni-copy"></em><span>Copy Wallet Address</span></a></CopyToClipboard></li>
                                <li><a href="#" onClick={e => handleConfirmWithdrawal(e, withdrawal.withdraw_id) }><em className="icon ni ni-check-circle"></em><span>Confirm Withdrawal</span></a></li>

                                <li className="divider"></li>
                                <li><a href="#" onClick={e => handleDeleteWithdrawRecord(e, withdrawal.withdraw_id) }><em className="icon ni ni-na"></em><span>Delete Record</span></a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </td>
    </tr>)
}

export default AdminWithdrawalItem