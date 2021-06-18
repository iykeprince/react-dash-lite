import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Layout from "../../components/layout/layout/layout.component"

const WithdrawSuccessPage = () => {
    const postData = useSelector(state => state.deposit.postData)

    return (
        <Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">

                        <div className="page-dw wide-xs m-auto">
                            <div className="nk-pps-apps">
                                <div className="nk-pps-result">
                                    <em className="icon icon-circle icon-circle-xxl ni ni-check bg-info"></em>
                                    <h3 className="title">Withdraw Fund Requested!</h3>
                                    <div className="nk-pps-text">
                                        <p className="caption-text">The amount will be credited into your account upon admin confirmation.</p>

                                        {/* <p className="sub-text">Fund Requested {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(postData.USD)}</p> */}
                                    </div>
                                    <div className="nk-pps-action">
                                        <ul className="btn-group-vertical align-center gy-3">
                                            <li><Link to="/transactions" className="btn btn-lg btn-mw btn-primary">View Transactions</Link></li>
                                            <li><Link to="/" className="link link-primary">Go back to Dashboard</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default WithdrawSuccessPage