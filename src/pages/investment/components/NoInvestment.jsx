import { Button } from "react-bootstrap"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const NoInvestment = () => {
    return (<div className="alert alert-warning">
    <div className="alert-cta flex-wrap flex-md-nowrap g-2">
        <div className="alert-text">
            <p className="mb-sm-1"><strong>You don't have any active investment in your account.</strong></p>
            <p>Please go invest in a plan.</p>
        </div>
        <div className="alert-actions">
            <ul className="gx-3 my-1 my-sm-0">
                <li className="order-md-last dropdown">

                    <Link to={`/plans`} id="dropdown-item-button" title="" variant="warning">Choose Plan</Link>
                </li>
            </ul>
        </div>
    </div>
</div>)
}

export default NoInvestment