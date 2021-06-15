import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AuthLayout from "../../components/layout/auth/auth.component"
import { requestResetPassword } from "../../redux/auth/auth.actions";

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
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
        dispatch(requestResetPassword(email))
        e.preventDefault();
    }
    return (
        <AuthLayout>
            <div className="brand-logo pb-5">
                <a href="index.html" className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                </a>
            </div>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Forgot password</h5>
                    <div className="nk-block-des">
                        <p>If you forgot your password, We’ll email you instructions to reset your password.</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">Email</label>
                        <a className="link link-primary link-sm" href="#">Need Help?</a>
                    </div>
                    <input type="text" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block" type="submit">{loading ? (<span><i className="fa fa-spinner fa-spin"></i> Authenticating...</span>) : `Send Reset Link`}</button>
                </div>
            </form>
            <div className="form-note-s2 pt-5">
                <Link to="/login"><strong>Return to login</strong></Link>
            </div>
            <ToastContainer />
        </AuthLayout>
    )
}

export default ForgotPassword