import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeEmail } from "../../../../redux/profile/profile.actions";

const ChangeEmailModal = ({onHide}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        confirmEmail: '',
        password: ''
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setData({...data, [name]: value });
    }

    const handleSubmit = e => {
        dispatch(changeEmail(data))
        e.preventDefault();
    }

    return (
        <div className="modal-body modal-body-md">
                    <h5 className="title">Change Email</h5>
                    <form onSubmit={handleSubmit} className="form-validate is-alter mt-4 form-authentic" id="change-email-form">
                        <div className="form-group">
                            <label className="form-label" hmtlFor="email-address">Current Email Address</label>
                            <div className="form-control-wrap">
                                <input 
                                    type="email" 
                                    className="form-control form-control-lg" 
                                    id="email-address"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" hmtlFor="new-email-address">New Email Address  <span className="text-danger">*</span></label>
                            <div className="form-control-wrap">
                                <input 
                                    type="email" 
                                    name="confirmEmail" 
                                    value={data.confirmEmail}
                                    onChange={handleChange} 
                                    className="form-control form-control-lg" 
                                    id="new-email-address" 
                                    placeholder="Enter Email Address" 
                                    required
                                    maxLength="190" />
                            </div>
                            <div className="form-note">New email address only updated once you verified.</div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" hmtlFor="password">Current Password  <span className="text-danger">*</span></label>
                            <div className="form-control-wrap">
                                <input 
                                    type="password" 
                                    autocomplete="new-password" 
                                    name="password" 
                                    className="form-control form-control-lg" 
                                    id="password" 
                                    placeholder="Enter current password" 
                                    maxLength="190"
                                    value={data.password}
                                    onChange={handleChange}   
                                    required
                                />
                            </div>
                        </div>
                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                            <li>
                                <button type="submit" id="update-email" className="btn btn-md btn-primary">Change Email</button>
                            </li>
                            <li>
                                <button type="button" onClick={onHide} className="link link-light">Cancel</button>
                            </li>
                        </ul>
                        <div className="notes mt-gs">
                            <ul>
                                <li className="alert-note is-plain text-danger">
                                    <em className="icon ni ni-alert-circle"></em>
                                    <p>We will send you a link to your new email address to confirm the change.</p>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
    )
}

export default ChangeEmailModal