import moment from "moment"
import { activatePayment } from "../../../redux/admin/admin.action";
import { getInitials } from "../admin-utils"

const AdminPaymentItem = ({
    deposit,
    handleActivatePayment,
    handleDeletePaymentRecord,
    handleViewPaymentHash
}) => {

   

    return <tr className="nk-tb-item">
        <td className="nk-tb-col">
            <div className="user-card">
                <div className="user-avatar bg-dim-primary d-none d-sm-flex">
                    <span>{getInitials(deposit)}</span>
                </div>
                <div className="user-info">
                    <span className="tb-lead">{deposit.fullname} <span className="dot dot-success d-md-none ml-1"></span></span>
                    <span>{deposit.email}</span>
                </div>
            </div>
        </td>
        <td className="nk-tb-col tb-col-mb">
            <span className="tb-amount"><span className="currency">$</span>{deposit.amount}</span>
        </td>
        <td className="nk-tb-col tb-col-mb">
            <span>CRYPTO</span>
        </td>
        <td className="nk-tb-col tb-col-md">
            <span>N/A</span>
        </td>

        <td className="nk-tb-col tb-col-lg">
            <span>{moment(deposit.fund_created_at).format('MMMM D, YYYY')}</span>
        </td>
        <td className="nk-tb-col tb-col-md">
            {deposit.payment_confirmation === "1" ? <span className="tb-status text-success">Confirmed</span> : <span className="tb-status text-info">Pending</span>}
        </td>
        <td className="nk-tb-col nk-tb-col-tools">
            <ul className="nk-tb-actions gx-1">
                <li>
                    <div className="drodown">
                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="link-list-opt no-bdr">
                                <li><a href="#" onClick={e => handleViewPaymentHash(e, deposit.depositor_id)}><em className="icon ni ni-focus"></em><span>View Payment Hash</span></a></li>
                                <li><a href="#" onClick={e => handleActivatePayment(e, deposit.depositor_id)}><em className="icon ni ni-check-circle"></em><span>Confirm Payment</span></a></li>

                                <li className="divider"></li>
                                <li><a href="#" onClick={e => handleDeletePaymentRecord(e, deposit.depositor_id)}><em className="icon ni ni-na"></em><span>Delete Record</span></a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </td>
    </tr>
}

export default AdminPaymentItem