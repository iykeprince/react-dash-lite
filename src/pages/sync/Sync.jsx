import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import Layout from "../../components/layout/layout/layout.component"
import DashModal from "../../components/modal/modal.component";
import { actionAccountSync, reset } from "../../redux/admin/admin.action";
import { getUser } from "../../redux/auth/auth.actions";
import SyncModal from "./SyncModal";

const SyncPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const accountSyncResponse = useSelector(state => state.admin.accountSync);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        stockEmail: '',
        stockPassword: '',
        forexEmail: '',
        forexPassword: '',
        cryptoWalletId: '',
        cryptoWalletPassword: '',
        bitfetterId: ''
    });

    useEffect(() => {
        if(accountSyncResponse?.message){
            toast.info(accountSyncResponse.message);
            onHideModal();
            dispatch(reset())
            dispatch(getUser())
        }
    }, [accountSyncResponse?.message]);

    const handleShowSyncModal = () => setShowModal(true)

    const onHideModal = () => setShowModal(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        data.userId = user.id;
        dispatch(actionAccountSync(data))
    }

    return (<Layout>
        <div className="nk-content nk-content-fluid">
            <div className="container-xl wide-lg">


                <div className="nk-content-body">
                    <div className="nk-content-wrap">
                        <div className="nk-block-head nk-block-head-lg">
                            <div className="nk-block-head-sub"><span></span></div>
                            <div className="nk-block-between-md g-4">
                                <div className="nk-block-head-content">
                                    <h2 className="nk-block-title fw-normal">Account Synchronization</h2>
                                    <div className="nk-block-des">
                                        <p>Synchronize all of your trading apps and earn profit with ease via our premium Copy-Trading feature. <span className="text-primary"><em className="icon ni ni-info"></em></span></p>
                                    </div>
                                </div>
                                <div className="nk-block-head-content">
                                    <ul className="nk-block-tools gx-3">
                                        <li className="order-md-last"><a href="html/subscription/pricing.html" className="btn btn-white btn-dim btn-outline-primary"><span>Back to Dashboard</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="nk-block">
                            <div className="card card-bordered sp-plan">
                                <div className="row no-gutters">
                                    <div className="col-md-8">
                                        <div className="sp-plan-info card-inner">
                                            <div className="row gx-0 gy-3">
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="sp-plan-name">
                                                        <h6 className="title"><a href="html/subscription/subscriptions-detail.html">Synchronization Process {user?.sync === "1" && <span className="badge badge-success badge-pill">Completed</span>}</a></h6>
                                                        <p>Sync ID: <span className="text-base">100394949</span></p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-sm-4">
                                                    {/* <!-- <div className="sp-plan-opt">
                                                                <div className="custom-control custom-switch">
                                                                    <input type="checkbox" className="custom-control-input" id="auto-plan-p1" checked>
                                                                    <label className="custom-control-label text-soft" for="auto-plan-p1">Auto Renew</label>
                                                                </div>
                                                            </div> --> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sp-plan-desc card-inner">
                                            <ul className="row gx-1">
                                                <li className="col-6 col-lg-3">
                                                    <p><span className="text-soft">Last Sync Date</span> Oct 12, 2018</p>
                                                </li>
                                                <li className="col-6 col-lg-3">
                                                    <p><span className="text-soft">No. of Accounts</span> 3</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="sp-plan-action card-inner">
                                            {user?.sync !== "1" ? <div className="sp-plan-btn">
                                                <button type="button" onClick={handleShowSyncModal} className="btn btn-xl btn-primary" ><span>Start Sync</span></button>
                                            </div> : <div className="sp_plan_btn"><span className="badge badge-success">Account Synced</span></div>   }
                                            {/* <div className="sp-plan-note text-md-center">
                                                        <p>Next Billing on <span>Oct 11, 2020</span></p>
                                                    </div>  */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>




                        <div className="nk-block">
                            <div className="card card-bordered">
                                <div className="card-inner card-inner-lg">
                                    <div className="nk-help">
                                        <div className="nk-help-img">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 118">
                                                <path d="M8.916,94.745C-.318,79.153-2.164,58.569,2.382,40.578,7.155,21.69,19.045,9.451,35.162,4.32,46.609.676,58.716.331,70.456,1.845,84.683,3.68,99.57,8.694,108.892,21.408c10.03,13.679,12.071,34.71,10.747,52.054-1.173,15.359-7.441,27.489-19.231,34.494-10.689,6.351-22.92,8.733-34.715,10.331-16.181,2.192-34.195-.336-47.6-12.281A47.243,47.243,0,0,1,8.916,94.745Z" transform="translate(0 -1)" fill="#f6faff"></path>
                                                <rect x="18" y="32" width="84" height="50" rx="4" ry="4" fill="#fff"></rect>
                                                <rect x="26" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect>
                                                <rect x="50" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect>
                                                <rect x="74" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect>
                                                <rect x="38" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect>
                                                <rect x="62" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect>
                                                <path d="M98,32H22a5.006,5.006,0,0,0-5,5V79a5.006,5.006,0,0,0,5,5H52v8H45a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H73a2,2,0,0,0,2-2V94a2,2,0,0,0-2-2H66V84H98a5.006,5.006,0,0,0,5-5V37A5.006,5.006,0,0,0,98,32ZM73,94v4H45V94Zm-9-2H54V84H64Zm37-13a3,3,0,0,1-3,3H22a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H98a3,3,0,0,1,3,3Z" transform="translate(0 -1)" fill="#798bff"></path>
                                                <path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="#6576ff"></path>
                                                <path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="none" stroke="#6576ff" strokeMiterlimit="10" strokeWidth="2"></path>
                                                <line x1="40" y1="22" x2="57" y2="22" fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                                                <line x1="40" y1="27" x2="57" y2="27" fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                                                <line x1="40" y1="32" x2="50" y2="32" fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                                                <line x1="30.5" y1="87.5" x2="30.5" y2="91.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round"></line>
                                                <line x1="28.5" y1="89.5" x2="32.5" y2="89.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round"></line>
                                                <line x1="79.5" y1="22.5" x2="79.5" y2="26.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round"></line>
                                                <line x1="77.5" y1="24.5" x2="81.5" y2="24.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round"></line>
                                                <circle cx="90.5" cy="97.5" r="3" fill="none" stroke="#9cabff" strokeMiterlimit="10"></circle>
                                                <circle cx="24" cy="23" r="2.5" fill="none" stroke="#9cabff" strokeMiterlimit="10"></circle></svg>
                                        </div>
                                        <div className="nk-help-text">
                                            <h5>We’re here to help you!</h5>
                                            <p className="text-soft">Ask a question or file a support ticketn or report an issues. Our team support team will get back to you by email.</p>
                                        </div>
                                        <div className="nk-help-action">
                                            <a href="mailto:support@bitfetter.com" className="btn btn-lg btn-outline-primary">Get Support Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

        <DashModal title="Apps Synchronization" onHide={onHideModal} show={showModal} >
            <SyncModal 
                onHide={onHideModal} 
                user={user} 
                data={data} 
                setData={setData}
                handleSubmit={handleSubmit}
            />
        </DashModal>
    </Layout>)
}

export default SyncPage