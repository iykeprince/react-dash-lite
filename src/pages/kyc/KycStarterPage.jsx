import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Layout from "../../components/layout/layout/layout.component"
import { getKyc } from "../../redux/kyc/kyc.actions";

const KycStarterPage = () => {
    const user = useSelector(state => state.auth.user);
    const kycData = useSelector(state => state.kyc.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getKyc())
    }, []);

    return (<Layout>
        <div className="nk-content nk-content-fluid">
            <div className="container-xl wide-lg">
                <div className="nk-content-body">
                    <div className="kyc-app wide-sm m-auto">
                        <div className="nk-block-head nk-block-head-lg wide-xs mx-auto">
                            <div className="nk-block-head-content text-center">
                                <h2 className="nk-block-title fw-normal">KYC Verification</h2>
                                <div className="nk-block-des">
                                    <p>To comply with regulation each participant will have to go through indentity verification (KYC/AML) to prevent fraud causes. </p>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block">
                            <div className="card card-bordered">
                                <div className="card-inner card-inner-lg">
                                    <div className="nk-kyc-app p-sm-2 text-center">
                                        <div className="nk-kyc-app-icon">
                                            <em className="icon ni ni-files"></em>
                                        </div>
                                        <div className="nk-kyc-app-text mx-auto">
                                            <p className="lead">You have not submitted your necessary documents to verify your identity. In order to purchase our tokens, please verify your identity.</p>
                                        </div>
                                        {kycData === null
                                            ? <div className="nk-kyc-app-action">
                                                <Link to="/kyc-form" className="btn btn-lg btn-primary">Click here to complete your KYC</Link>
                                            </div>
                                            : <div className="nk-kyc-app-action">
                                                <Link to="/kyc-form" className="btn btn-lg btn-primary">Update your KYC</Link>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center pt-4">
                                <p>If you have any question, please contact our support team <a href="mailto:info@bitfetter.com">info@bitfetter.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>)
}

export default KycStarterPage