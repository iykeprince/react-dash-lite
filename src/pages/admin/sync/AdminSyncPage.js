import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layout/layout/layout.component'
import DashModal from '../../../components/modal/modal.component';
import { getAllUsers, toggleUserStatus } from '../../../redux/admin/admin.action';
import AdminNav from '../components/AdminNav';
import AdminUserItem from './AdminUserItem';
import AdminUserQuickView from './AdminUserQuickView';
import AdminUserResetPasswordModal from './AdminUserResetPasswordModal';
import AdminUserTransactionModal from './AdminUserTransactionModal';
import AdminUserViewAccountModal from './AdminUserViewAccountModal';

const AdminSyncPage = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.admin.users);
    const user = useSelector(state => state.auth.user);
    const userStatus = useSelector(state => state.admin.toggleUserStatus);
    const [selectedUserId, setSelectedUserId] = useState(-1);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showQuickViewModal, setShowQuickViewModal] = useState(false);
    const [showViewAccountModal, setShowViewAccountModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    useEffect(() => {
        if(userStatus?.message){
            dispatch(getAllUsers())
        }
    }, [userStatus?.message])
    const onHideQuickViewModal = () => setShowQuickViewModal(false);
    const onHideViewAccountModal = () => setShowViewAccountModal(false)
    const onHideTransactionModal = () => setShowTransactionModal(false);
    const onHideResetPasswordModal = () => setShowResetPasswordModal(false);

    const onHandleBlockUser = (user) => {
        if(window.confirm(`Do you really want to block ${user.fullname}`)){
            dispatch(toggleUserStatus({userId: user.id}))
        }
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
                                        <p>Here's a detailed summary of your syncs.</p>
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
                                                <th className="nk-tb-col tb-col-mb"><span className="sub-text">Stock Email</span></th>
                                                <th className="nk-tb-col tb-col-mb"><span className="sub-text">Stock Password</span></th>
                                                <th className="nk-tb-col tb-col-md"><span className="sub-text">Forex Email</span></th>
                                                <th className="nk-tb-col tb-col-lg"><span className="sub-text">Forex Password</span></th>
                                                <th className="nk-tb-col tb-col-lg"><span className="sub-text">Last Login</span></th>
                                                <th className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></th>
                                                <th className="nk-tb-col nk-tb-col-tools text-right">
                                                    <div className="dropdown">
                                                        <a href="#" 
                                                            className="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-toggle="dropdown" data-offset="0,5"><em className="icon ni ni-plus"></em></a>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers.map((user) => <AdminUserItem
                                                key={user.id}
                                                user={user} 
                                                setSelectedUserId={setSelectedUserId} 
                                                setSelectedUser={setSelectedUser} 
                                                setShowTransactionModal={setShowTransactionModal} 
                                                setShowQuickViewModal={setShowQuickViewModal} 
                                                setShowViewAccountModal={setShowViewAccountModal} 
                                                setShowResetPasswordModal={setShowResetPasswordModal} 
                                                onHandleBlockUser={onHandleBlockUser}
                                            />)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DashModal show={showTransactionModal} onHide={onHideTransactionModal}>
                <AdminUserTransactionModal
                    showModal={showTransactionModal}
                    onHideModal={onHideTransactionModal}
                    selectedUserId={selectedUserId}
                />
            </DashModal>
            <DashModal show={showViewAccountModal} onHide={onHideViewAccountModal}>
                <AdminUserViewAccountModal 
                    showModal={showViewAccountModal} 
                    onHideModal={onHideViewAccountModal} 
                    selectedUser={selectedUser}
                />
            </DashModal>
            <DashModal show={showQuickViewModal} onHide={onHideQuickViewModal}>
                <AdminUserQuickView 
                    showModal={showQuickViewModal} 
                    onHideModal={onHideQuickViewModal} 
                    selectedUser={selectedUser}
                />
            </DashModal>
            <DashModal show={showResetPasswordModal} onHide={onHideResetPasswordModal}>
                <AdminUserResetPasswordModal 
                    showModal={showResetPasswordModal}
                    onHideModal={onHideResetPasswordModal} 
                    selectedUser={selectedUser}
                />
            </DashModal>
        </Layout>
    )
}

export default AdminSyncPage