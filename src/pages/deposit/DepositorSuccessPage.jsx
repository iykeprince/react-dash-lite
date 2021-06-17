import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DashboardLayout from "../../components/layout/dashboard/dashboard.component"

import './css/investorm-app.css'

const DepositorSuccessPage = () => {
    const postData = useSelector(state => state.deposit.postData)

    return (
        <DashboardLayout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">

                        <div className="page-dw wide-xs m-auto">
                            <div className="nk-pps-apps">
                                <div className="nk-pps-result">
                                    <em className="icon icon-circle icon-circle-xxl ni ni-check bg-success"></em>
                                    <h3 className="title">Deposit Succeeded!</h3>
                                    <div className="nk-pps-text">
                                        <p className="caption-text">The amount will be credited into your account upon admin confirmation.</p>

                                        <p className="sub-text">Transaction ID {postData.hashValue}</p>
                                    </div>
                                    <div className="nk-pps-action">
                                        <ul className="btn-group-vertical align-center gy-3">
                                            <li><Link to="/deposit" className="btn btn-lg btn-mw btn-primary">Deposit More</Link></li>
                                            <li><Link to="/" className="link link-primary">Go back to Dashboard</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default DepositorSuccessPage