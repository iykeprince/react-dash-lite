import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/layout/layout.component"
import Spinner from "../../../components/spinner/spinner.component";
import { activatePayment, deletePayment, getAllDeposits, reset } from "../../../redux/admin/admin.action";
import AdminNav from "../components/AdminNav";
import AdminPaymentItem from "./AdminPaymentItem";

const AdminPayment = () => {
    const dispatch = useDispatch();
    const allDeposits = useSelector(state => state.admin.deposits);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.admin.loading)
    const activatePaymentResponse = useSelector(state => state.admin.activatePayment);   
    const deletePaymentResponse = useSelector(state => state.admin.deletePayment);

    useEffect(()=>{
        dispatch(getAllDeposits())
    }, [])

    useEffect(() => {
        if(activatePaymentResponse?.message){
            toast.info(activatePaymentResponse.message);
            setTimeout(() => dispatch(reset()), 2000);
        }
        if(deletePaymentResponse?.message){
            toast.info(deletePaymentResponse.message);
            setTimeout(() => dispatch(reset()), 2000);
        }
        dispatch(getAllDeposits())
    }, [activatePaymentResponse?.message])


    const handleViewPaymentHash = (e, depositorId) => {
        e.preventDefault();
        //Todo: View payment hash
    }

    const handleDeletePaymentRecord = (e, depositorId) => {
        e.preventDefault();
        if(window.confirm("Do you really want to delete this record?")){
            dispatch(deletePayment(depositorId))
        }
    }

    const handleActivatePayment = (e, depositorId) => {
        e.preventDefault();
        if(window.confirm("Do you really want to proceed?")){
            dispatch(activatePayment(depositorId));
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
                                            <p>Here, you can manage your users' payments.</p>
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
                                                    <th className="nk-tb-col tb-col-mb"><span className="sub-text">Payment Amount</span></th>
                                                    <th className="nk-tb-col tb-col-mb"><span className="sub-text">Payment Method</span></th>
                                                    <th className="nk-tb-col tb-col-md"><span className="sub-text">Wallet Address / Paypal</span></th>
                                                    <th className="nk-tb-col tb-col-lg"><span className="sub-text">Transaction Date</span></th>
                                                    <th className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></th>
                                                    <th className="nk-tb-col nk-tb-col-tools text-right">
                                                        <div className="dropdown">
                                                            <a href="#" className="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-toggle="dropdown" data-offset="0,5"><em className="icon ni ni-plus"></em></a>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading && <Spinner />}
                                               {allDeposits.map((deposit, index) => (<AdminPaymentItem 
                                                    key={index} 
                                                    deposit={deposit} 
                                                    handleActivatePayment={handleActivatePayment} 
                                                    handleDeletePaymentRecord={handleDeletePaymentRecord} 
                                                    handleViewPaymentHash={handleViewPaymentHash}
                                                />))}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    )
}

export default AdminPayment