import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../../components/layout/layout/layout.component"
import { getAllUsers } from "../../../redux/admin/admin.action";
import { getInitials } from "../admin-utils";
import AdminNav from "../components/AdminNav";
import DashModal from "../../../components/modal/modal.component"
import AdminTopUpModal from "./AdminTopUpModal";

const AdminTopUp = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.admin.users);
    const user = useSelector(state => state.auth.user);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    const totalBalanace = ({ amount_in_stock, available_profit, trade_bonus, referal_bonus }) => {
        return parseFloat(amount_in_stock) + parseFloat(available_profit) + parseFloat(trade_bonus) + parseFloat(referal_bonus);
    }

    const onHideModal = () => setShowModal(false);

    const handleShowTopUp = (e, user) => {
        e.preventDefault();
        setShowModal(true);
        setSelectedUser(user);
    }

    return (
        <Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <div className="nk-block-head">
                            <div className="nk-block-head-sub"><span>Welcome!</span>
                            </div>
                            <div className="nk-block-between-md g-4">
                                <div className="nk-block-head-content">
                                    <h2 className="nk-block-title fw-normal">{user && user.fullname}</h2>
                                    <div className="nk-block-des">
                                        <p>Here you can top up your users' accounts.</p>
                                    </div>
                                </div>
                                <div className="nk-block-head-content">
                                    <ul className="nk-block-tools gx-3">

                                        <li className="opt-menu-md dropdown">
                                            <a href="#" className="btn btn-white btn-light btn-icon" data-toggle="dropdown"><em className="icon ni ni-setting"></em></a>
                                            <AdminNav />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block nk-block-lg">

                            <div className="card card-bordered card-preview">
                                <div className="card-inner">
                                    <table className="datatable-init nk-tb-list nk-tb-ulist" data-auto-responsive="false">
                                        <thead>
                                            <tr className="nk-tb-item nk-tb-head">

                                                <th className="nk-tb-col"><span className="sub-text">User</span></th>
                                                <th className="nk-tb-col tb-col-mb"><span className="sub-text">Investment</span></th>
                                                <th className="nk-tb-col tb-col-mb"><span className="sub-text">Profit</span></th>
                                                <th className="nk-tb-col tb-col-md"><span className="sub-text">Trade Bonus</span></th>
                                                <th className="nk-tb-col tb-col-lg"><span className="sub-text">Referral Bonus</span></th>
                                                <th className="nk-tb-col tb-col-lg"><span className="sub-text">Total Balance</span></th>
                                                <th className="nk-tb-col tb-col-md"><span className="sub-text">Investment Status</span></th>
                                                <th className="nk-tb-col nk-tb-col-tools text-right">
                                                    <div className="dropdown">
                                                        <a 
                                                            href="#" 
                                                            className="btn btn-xs btn-outline-light btn-icon dropdown-toggle" 
                                                            data-toggle="dropdown" 
                                                            data-offset="0,5">
                                                            <em className="icon ni ni-plus"></em>
                                                        </a>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers.map((user, i) => (<tr key={i} className="nk-tb-item">
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
                                                <td className="nk-tb-col tb-col-mb">
                                                    <span className="tb-amount"><span className="currency">$</span>{user.trade_bonus}</span>
                                                </td>
                                                <td className="nk-tb-col tb-col-mb">
                                                    <span className="tb-amount"><span className="currency">$</span>{user.referal_bonus}</span>
                                                </td>
                                                <td className="nk-tb-col tb-col-lg">
                                                    <span className="tb-amount"><span className="currency">$</span>{totalBalanace(user)}</span>
                                                </td>
                                                <td className="nk-tb-col tb-col-md">
                                                    {user.verified === '1' ? <span className="tb-status text-success">Active</span> : <span className="tb-status text-info">Unverified</span>}
                                                </td>
                                                <td className="nk-tb-col nk-tb-col-tools">
                                                    <ul className="nk-tb-actions gx-1">


                                                        <li>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#" onClick={(e) => handleShowTopUp(e, user)} data-toggle="modal" data-target="#profile-edit"><em className="icon ni ni-wallet-fill"></em><span>Top Up Account</span></a></li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DashModal  show={showModal} onHide={onHideModal} title="Top Up" >
                <AdminTopUpModal 
                    selectedUser={selectedUser} 
                    onHideModal={onHideModal} 
                />
            </DashModal>
        </Layout>
    )
}

export default AdminTopUp