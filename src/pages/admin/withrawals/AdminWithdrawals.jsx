import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../../../components/layout/layout/layout.component';
import Spinner from '../../../components/spinner/spinner.component';
import { confirmWithdraw, deleteWithdraw, getAllWithdrawals, reset } from '../../../redux/admin/admin.action';
import AdminNav from '../components/AdminNav';
import AdminWithdrawalItem from './AdminWithdrawalItem';

const AdminWithdrawals = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const allWithdrawals = useSelector(state => state.admin.withdrawals);
    const loading = useSelector(state => state.admin.loading);

    const confirmWithdrawResponse = useSelector(state => state.admin.confirmWithdraw);
    const deleteWithdrawResponse = useSelector(state => state.admin.deleteWithdraw);

    useEffect(() => {
        dispatch(getAllWithdrawals())
    }, [])

    useEffect(() => {
        if(confirmWithdrawResponse?.message){
            toast.info(confirmWithdrawResponse.message);
            setTimeout(() => dispatch(reset()), 2000);
        }
        if(deleteWithdrawResponse?.message){
            toast.info(deleteWithdrawResponse.message);
            setTimeout(() => dispatch(reset()), 2000);
        }
        dispatch(getAllWithdrawals())
    }, [confirmWithdrawResponse?.message, deleteWithdrawResponse?.message])


    const handleCopyWallet = (e) => {
        e.preventDefault();
    }
    
    const handleConfirmWithdrawal = (e, withdraw_id) => {
        e.preventDefault();
       if(window.confirm("Do you really want to confirm this withdraw?")){
        dispatch(confirmWithdraw({withdraw_id}))
       }
    }
    
    const handleDeleteWithdrawRecord = (e, withdraw_id) => {
        e.preventDefault();
        if(window.confirm("Do you really want to delete this withdraw?")){
            dispatch(deleteWithdraw({withdraw_id}))
           }
    }

    

    return (
        <Layout>
            <div class="nk-content nk-content-fluid">
                <div class="container-xl wide-lg">
                    <div class="nk-content-body">
                        <div class="nk-block-head">
                            <div class="nk-block-head-sub"><span>Welcome!</span>
                            </div>
                            <div class="nk-block-between-md g-4">
                                <div class="nk-block-head-content">
                                    <h2 class="nk-block-title fw-normal">{user && user.fullname}</h2>
                                    <div class="nk-block-des">
                                        <p>Here, you can manage your users' withdrawals.</p>
                                    </div>
                                </div>
                                <div class="nk-block-head-content">
                                    <ul class="nk-block-tools gx-3">

                                        <li class="opt-menu-md dropdown">
                                            <a href="#" class="btn btn-white btn-light btn-icon" data-toggle="dropdown"><em class="icon ni ni-setting"></em></a>
                                            <AdminNav />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="nk-block nk-block-lg">

                            <div class="card card-bordered card-preview">
                                <div class="card-inner">
                                    <table class="datatable-init nk-tb-list nk-tb-ulist table-responsive" data-auto-responsive="false">
                                        <thead>
                                            <tr class="nk-tb-item nk-tb-head">

                                                <th class="nk-tb-col"><span class="sub-text">User</span></th>
                                                <th class="nk-tb-col tb-col-mb"><span class="sub-text">Withdrawal Amount</span></th>
                                                <th class="nk-tb-col tb-col-mb"><span class="sub-text">Withdrawal Method</span></th>
                                                <th class="nk-tb-col tb-col-md"><span class="sub-text">Wallet Address / Paypal</span></th>
                                                <th class="nk-tb-col tb-col-lg"><span class="sub-text">Transaction Date</span></th>
                                                <th class="nk-tb-col tb-col-md"><span class="sub-text">Status</span></th>
                                                <th class="nk-tb-col nk-tb-col-tools text-right">
                                                    <div class="dropdown">
                                                        <a href="#" class="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-toggle="dropdown" data-offset="0,5"><em class="icon ni ni-plus"></em></a>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && <Spinner />}
                                            {allWithdrawals.map((withdrawal, index) => <AdminWithdrawalItem 
                                                key={index} 
                                                withdrawal={withdrawal}
                                                handleCopyWallet={handleCopyWallet}    
                                                handleConfirmWithdrawal={handleConfirmWithdrawal} 
                                                handleDeleteWithdrawRecord={handleDeleteWithdrawRecord}
                                            /> )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default AdminWithdrawals