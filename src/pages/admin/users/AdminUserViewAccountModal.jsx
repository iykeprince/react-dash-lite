import React from 'react';

const AdminUserViewAccountModal = ({
    selectedUser
}) => {
    return (
        <div className="modal-body">
            <div className="card">
                <div className="card-body">
                    <div className="card-item">
                       <h5>Stock</h5>
                       <p>{selectedUser.stock_email}</p>
                       <p>{selectedUser.stock_password}</p>
                    </div>
                    <hr />
                    <div className="card-item">
                        <h5>Forex</h5>
                        <p>{selectedUser.forex_email}</p>
                        <p>{selectedUser.forex_password}</p>
                    </div>
                    <hr />
                    <div className="card-item">
                        <h5>Crypto Wallet</h5>
                        <p>{selectedUser.crypto_wallet_id}</p>
                        <p>{selectedUser.crypto_wallet_password}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserViewAccountModal