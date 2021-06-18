import { DropdownButton, Dropdown } from "react-bootstrap"

const AccountEmpty = ({setShowModal}) => {
    return (<div className="alert alert-warning">
    <div className="alert-cta flex-wrap flex-md-nowrap g-2">
        <div className="alert-text">
            <p className="mb-sm-1"><strong>You have not added any withdraw account yet in your account.</strong></p>
            <p>Please add the personal or company accounts that you'd like to withdraw funds.</p>
        </div>
        <div className="alert-actions">
            <ul className="gx-3 my-1 my-sm-0">
                <li className="order-md-last dropdown">

                    <DropdownButton id="dropdown-item-button" title="Add Account" variant="warning">
                        <Dropdown.Item as="button"><em className="icon ni ni-paypal-alt"></em>
                            <span>PayPal Account</span></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setShowModal(true)}><em className="icon ni ni-wallet-fill"></em>
                            <span>Crypto Wallet</span></Dropdown.Item>
                    </DropdownButton>
                </li>
            </ul>
        </div>
    </div>
</div>)
}

export default AccountEmpty