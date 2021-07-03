import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import DashModal from "../../../components/modal/modal.component"
import ProfileNav from "../components/ProfileNav"
import ChangeEmailModal from "../modals/security/ChangeEmailModal"
import ChangePasswordModal from "../modals/security/ChangePasswordModal"
import ChangePasswordSuccessModal from "../modals/security/ChangePasswordSuccessModal"

const SecurityContainer = () => {
    const changePasswordMessage = useSelector(state => state.profile.changePasswordMessage)
    const changePasswordStatus = useSelector(state => state.profile.changePasswordStatus)
    const [checked, setChecked] = useState({
        activity_log: false,
        unusual_activity: false
    });
    const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showChangePasswordSuccessModal, setShowChangePasswordSuccessModal] = useState(false);

    useEffect(() => {
        if(changePasswordMessage !== null){
            if(changePasswordStatus === 200){
                
                toast.success(changePasswordMessage);
                setShowChangePasswordModal(false);
                setShowChangePasswordSuccessModal(true);
            }else
                toast.info(changePasswordMessage);
        }
    }, [changePasswordMessage])

    const onHideChangeEmailModal = () => setShowChangeEmailModal(false);
    const onHideChangePasswordModal = () => setShowChangePasswordModal(false);
    const onHideChangePasswordSuccessModal = () => setShowChangePasswordSuccessModal(false);

    const handleCheckedChange = e => {
        const {name, checked} = e.target;
        console.log('name', name, 'checked', checked)
        setChecked({...checked, [name]: checked})
    }

    return (
        <>
            <div className="nk-content-body">
                <ProfileNav activeLink="security" />

                <div className="nk-block">

                    <div className="nk-block-head">
                        <div className="nk-block-head-content">
                            <h5 className="nk-block-title">Settings</h5>
                            <div className="nk-block-des">
                                <p>These settings are helps you keep your account secure.</p>
                            </div>
                        </div>
                    </div>

                    <div className="card card-bordered">
                        <div className="card-inner-group">
                            {/* <div className="card-inner">
                                <div className="between-center flex-wrap flex-md-nowrap g-3">
                                    <div className="nk-block-text">
                                        <h6>Save my Activity Logs</h6>
                                        <p>Save your all <Link to="#" className="link link-primary">activity logs</Link> including unusual activity detected.</p>
                                    </div>
                                    <div className="nk-block-actions">
                                        <ul className="align-center gx-3">
                                            <li className="order-md-last">
                                                <div className="custom-control custom-switch mr-n2">
                                                    <input type="checkbox" name="activity_log" className="custom-control-input quick-update-profile" 
                                                        checked={checked.activity_log} onChange={handleCheckedChange} id="activity-log" data-key="setting"  />
                                                    <label className="custom-control-label" hmtlFor="activity-log"></label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            <div className="card-inner">
                                <div className="between-center flex-wrap flex-md-nowrap g-3">
                                    <div className="nk-block-text">
                                        <h6>Email me if encounter unusual activity</h6>
                                        <p>You will get email notification whenever encounter invalid login activity.</p>
                                    </div>
                                    <div className="nk-block-actions">
                                        <ul className="align-center gx-3">
                                            <li className="order-md-last">
                                                <div className="custom-control custom-switch mr-n2">
                                                    <input type="checkbox" name="unusual_activity" className="custom-control-input quick-update-profile" onChange={handleCheckedChange} checked={checked.unusualActivity} id="unusual-activity" data-key="setting" />
                                                    <label className="custom-control-label" hmtlFor="unusual-activity"></label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="card-inner">
                                <div className="between-center flex-wrap flex-md-nowrap g-3">
                                    <div className="nk-block-text">
                                        <h6>Change Email Address</h6>
                                        <p>Update your current email address to new email address.</p>
                                    </div>
                                    <div className="nk-block-actions">
                                        <button type="button" onClick={() => setShowChangeEmailModal(true)} className="btn btn-sm btn-primary" id="email-modal-tgl">Change Email</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-inner">
                                <div className="between-center flex-wrap flex-md-nowrap g-3">
                                    <div className="nk-block-text">
                                        <h6>Change Password</h6>
                                        <p>Set a unique password to protect your account.</p>
                                    </div>
                                    <div className="nk-block-actions flex-shrink-sm-0">
                                        <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                            <li className="order-md-last">
                                                <button id="settings-change-password" onClick={() => setShowChangePasswordModal(true)} className="btn btn-sm btn-primary">Change Password</button>
                                            </li>
                                            <li>
                                                <em className="text-soft text-date fs-12px">Last changed: <span>N/A</span></em>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card-inner">
                                <div className="between-center flex-wrap flex-md-nowrap g-3">
                                    <div className="nk-block-text">
                                        <h6>
                                            2FA Authentication
                                            <span className="badge badge-danger">Disabled</span>
                                        </h6>
                                        <p>Secure your account with 2FA security. When it is activated you will need to enter not only your password, but also a special code using your mobile.</p>
                                    </div>
                                    <div className="nk-block-actions">
                                        <Link to="#" id="settings-enable-2fa" data-toggle="modal" data-target="#enable-2fa" className="btn btn-sm btn-primary">Enable</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
            <DashModal show={showChangeEmailModal} onHide={onHideChangeEmailModal} title="Change Email">
                <ChangeEmailModal onHide={onHideChangeEmailModal} />
            </DashModal>
            <DashModal show={showChangePasswordModal} onHide={onHideChangePasswordModal} title="Change Password">
                <ChangePasswordModal onHide={onHideChangePasswordModal} />
            </DashModal>
            <DashModal show={showChangePasswordSuccessModal} onHide={onHideChangePasswordSuccessModal} title="Password Reset Success">
                <ChangePasswordSuccessModal onHide={onHideChangePasswordSuccessModal} />
            </DashModal>

            <ToastContainer />
        </>
    )



}

export default SecurityContainer