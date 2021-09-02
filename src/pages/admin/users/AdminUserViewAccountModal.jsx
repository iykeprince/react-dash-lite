import React from 'react';

const AdminUserViewAccountModal = ({
    selectedUser
}) => {
    return (
        <div className="modal-body">
            <div className="card">
                <div className="card-body">
                    <div className="card-item">
                        <p>Fullname</p>
                        <h4>{selectedUser.fullname}</h4>
                    </div>
                    <div className="card-item">
                        <p>Email</p>
                        <h4>{selectedUser.email}</h4>
                    </div>
                    <div className="card-item">
                        <p>Phone</p>
                        <h4>{selectedUser.mobile}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserViewAccountModal