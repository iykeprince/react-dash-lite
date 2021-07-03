import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AuthLayout from "../../components/layout/auth/auth.component"
import { resetChangePassword } from "../../redux/auth/auth.actions";

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

const ResetPassword = () => {
    const query = useQuery();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState(query.get('code') || '');

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.message);
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)

    useEffect(() => {
        if(message){
            toast.info(message)
        }
        if(error){
            toast.error(error)
        }
      
    }, [message, error])

    const handleSubmit = e => {
        e.preventDefault();
        if(!code.length){
            return toast.error('Invalid CODE!')
        }
        if(newPassword !== confirmPassword){
            return toast.error('Password mismatch');
        }
        dispatch(resetChangePassword(newPassword, code))
    }

    return (
        <AuthLayout>
            <div className="brand-logo pb-5">
                <a href="index.html" className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./assets/logos/brandmark_blue@4x.png" alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./assets/logos/brandmark_blue@4x.png" alt="logo-dark" />
                </a>
            </div>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Reset your password</h5>
                    <div className="nk-block-des">
                        <p>You can now reset your password.</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">New Password</label>
                    </div>
                    <input type="password" className="form-control form-control-lg" id="default-01" placeholder="Enter your new password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">Confirm Password</label>
                    </div>
                    <input type="password" className="form-control form-control-lg" id="default-01" placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label><strong>Code</strong> {query.get('code')}</label>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block" type="submit">{loading ? (<span><i className="fa fa-spinner fa-spin"></i> Resetting your password...</span>) : `Reset Password`}</button>
                </div>
            </form>
            <div className="form-note-s2 pt-5">
                <Link to="/login"><strong>Return to login</strong></Link>
            </div>
            <ToastContainer />
        </AuthLayout>
    )
}

export default ResetPassword