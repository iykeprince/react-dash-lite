import moment from "moment";
import { getInitials } from "../admin-utils";

const AdminUserItem = ({
    user, 
    setSelectedUserId, 
    setSelectedUser,
    setShowTransactionModal,
    setShowQuickViewModal,
    setShowViewAccountModal,
    setShowResetPasswordModal,
    onHandleBlockUser
}) => {
    const randomAvatarColors = ['bg-dark', 'bg-dim-primary'];

    const handleActionQuickView = (e, user) => {
        e.preventDefault();
        setShowQuickViewModal(true);
        setSelectedUser(user);
    }
    
    const handleActionViewUserAccount = (e, user) => {
        e.preventDefault();
        setShowViewAccountModal(true);
        setSelectedUser(user)
    }
    
    const handleActionViewUserTransactions = (e, id) => {
        e.preventDefault();
        setSelectedUserId(id)
        setShowTransactionModal(true);
    }
    
    const handleActionResetPassword = (e, user) => {
        e.preventDefault();
        setShowResetPasswordModal(true);
        setSelectedUser(user);
        console.log('open the reset passsword modal')
    }
    const handleActionBlockUser = (e, user) => {
        e.preventDefault();
        
        onHandleBlockUser(user);
    }

    return (
        <tr className="nk-tb-item">
            <td className="nk-tb-col">
                <div className="user-card">
                    <div className="user-avatar bg-dim-primary d-none d-sm-flex">
                        <span>{getInitials(user)}</span>
                    </div>
                    <div className="user-info">
                        <span className="tb-lead">{user.fullname} <span className="dot dot-success d-md-none ml-1"></span></span>
                        <span>{user.email}</span>
                    </div>
                </div>
            </td>
            <td className="nk-tb-col tb-col-mb">
                <span className="tb-amount"><span className="currency">$</span>{user.amount_in_stock}</span>
            </td>
            <td className="nk-tb-col tb-col-mb">
                <span className="tb-amount"><span className="currency">$</span>{user.available_profit}</span>
            </td>
            <td className="nk-tb-col tb-col-md">
                <span>{user.mobile}</span>
            </td>
            <td className="nk-tb-col tb-col-lg">
                <ul className="list-status">
                    <li><em className={user.verified == "1" ? "icon text-success ni ni-check-circle" : "icon ni ni-alert-circle"}></em> <span>Email</span></li>
                    <li><em className={user.kyc == "1" ? "icon text-success ni ni-check-circle" : "icon ni ni-alert-circle"}></em> <span>KYC</span></li>
                </ul>
            </td>
            <td className="nk-tb-col tb-col-lg">
                <span>{moment(user.user_created_at).format('DD MMM, YYYY')}</span>
            </td>
            <td className="nk-tb-col tb-col-md">
               {user.status === 'active' ? <span className="tb-status text-success">Active</span> : <span className="tb-status text-danger">Block</span>}
            </td>
            <td className="nk-tb-col nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1">
                    <li className="nk-tb-action-hidden">
                        <a href="#" className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Wallet">
                            <em className="icon ni ni-wallet-fill"></em>
                        </a>
                    </li>
                    <li className="nk-tb-action-hidden">
                        <a href="#" className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Send Email">
                            <em className="icon ni ni-mail-fill"></em>
                        </a>
                    </li>
                    <li className="nk-tb-action-hidden">
                        <a href="#" onClick={e => handleActionBlockUser(e, user)} className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Block">
                            <em className="icon ni ni-user-cross-fill"></em>
                        </a>
                    </li>
                    <li>
                        <div className="drodown">
                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul className="link-list-opt no-bdr">
                                    {/* <li><a href="#" onClick={e => handleActionQuickView(e, user)}><em className="icon ni ni-focus"></em><span>Quick View</span></a></li> */}
                                    <li><a href="#" onClick={e => handleActionViewUserAccount(e, user)}><em className="icon ni ni-eye"></em><span>View Account</span></a></li>
                                    <li><a href="#" onClick={e => handleActionViewUserTransactions(e, user.id)}><em className="icon ni ni-repeat"></em><span>Transaction</span></a></li>

                                    <li className="divider"></li>
                                    <li><a href="#" onClick={e => handleActionResetPassword(e, user)}><em className="icon ni ni-shield-star"></em><span>Reset Pass</span></a></li>
                                    <li><a href="#" onClick={(e) => handleActionBlockUser(e, user) }><em className="icon ni ni-na"></em><span>Block User</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </td>
        </tr>
    )
}


export default AdminUserItem