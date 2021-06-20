import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { nav1 } from "../../../redux/deposit/deposit.actions";

const DepositContainer5 = () => {
    const postData = useSelector(state => state.deposit.postData)
    const dispatch = useDispatch();

    const handleClick = () => dispatch(nav1())
    return (
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
                            <li><button onClick={handleClick} className="btn btn-lg btn-mw btn-primary">Deposit More</button></li>
                            <li><Link to="/" className="link link-primary">Go back to Dashboard</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepositContainer5