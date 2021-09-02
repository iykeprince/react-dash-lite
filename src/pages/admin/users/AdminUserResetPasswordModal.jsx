import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getAllUsers, reset, updatePassword } from '../../../redux/admin/admin.action';

const AdminUserResetPasswordModal = ({
    showModal,
    onHideModal,
    selectedUser
}) => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = React.useState("");
    const resetPasswordMessage = useSelector(state => state.admin.resetPasswordMessage)

    useEffect(() => {
        if(resetPasswordMessage?.message){
            toast.info(resetPasswordMessage.message);
            onHideModal()
        }
        return () => {
            dispatch(reset())
            dispatch(getAllUsers())
        }
    }, [resetPasswordMessage])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updatePassword({userId: selectedUser.id, newPassword}))
    }

    return (
        <div className="modal-body">
            <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                    <h5 className="nk-block-title">Reset {selectedUser.fullname.split(' ')[0]}'s Password</h5>
                </div>
                <div className="card ">
                    <form onSubmit={handleSubmit}>
                        <p>Your Password - <strong>{selectedUser.password}</strong></p>
                        <div className="form-group">
                            <input  
                                placeholder="Enter your new password"
                                className="form-control"
                                type="text" 
                                onChange={e => setNewPassword(e.target.value)} 
                                value={newPassword} 
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminUserResetPasswordModal