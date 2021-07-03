import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../redux/profile/profile.actions";

const ChangePasswordModal = ({onHide}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = e => {
        const {name,value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(data.newPassword !== data.confirmPassword){
            return setError("Password mismatch")
        }
        dispatch(changePassword(data))
    }

    return (
        <>
            <div class="modal-body modal-body-md">
                <h5 class="title">Change Password</h5>
                {error !== null && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} class="form-validate is-alter mt-4 form-authentic" id="change-password-form" >
                    <div class="form-group">
                        <label class="form-label" hmtlFor="current-password">Current Password  <span class="text-danger">*</span></label>
                        <div class="form-control-wrap">
                            <input type="password" name="current_password" class="form-control form-control-lg" id="current-password"
                                placeholder="Enter Current Password"  
                                name="currentPassword"
                                value={data.currentPassword} 
                                onChange={handleChange}
                                required
                                maxLength="190" 
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" hmtlFor="new-password">New Password <span class="text-danger">*</span></label>
                        <div class="form-control-wrap">
                            <input type="password" name="new_password" class="form-control form-control-lg" id="new-password"
                                placeholder="Enter new password" 
                                name="newPassword"
                                value={data.newPassword}
                                onChange={handleChange}
                                required="" 
                                maxLength="190" 
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" hmtlFor="new-password">Retype New Password <span class="text-danger">*</span></label>
                        <div class="form-control-wrap">
                            <input type="password" name="new_password_confirmation" class="form-control form-control-lg"
                                id="new-password-confirmation"
                                placeholder="Retype new password"
                                maxLength="190" 
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <ul class="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                            <button type="submit" id="update-password" class="btn btn-primary">Update Password</button>
                        </li>
                        <li>
                            <button type="button" onClick={onHide} class="link link-light">Cancel</button>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordModal