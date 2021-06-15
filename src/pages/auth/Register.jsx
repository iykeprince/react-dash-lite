import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthLayout from "../../components/layout/auth/auth.component";
import { createAccount } from "../../redux/auth/auth.actions";

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const location = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        tos: '',
        referal_code: ''
    });

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
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
        if(isAuthenticated){
            console.log('redirecting to dashboard')
            location.push('/')
        }
    }, [isAuthenticated, message,error])

    const handleSubmit = e => {
        dispatch(createAccount(data))

        e.preventDefault();
    }

    return (<AuthLayout>
        <div className="brand-logo pb-5">
            <a href="index.html" className="logo-link">
                <img className="logo-light logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                <img className="logo-dark logo-img logo-img-lg" src="./assets/logos/brandmark_blue@4x.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
            </a>
        </div>
        <div className="nk-block-head">
            <div className="nk-block-head-content">
                <h5 className="nk-block-title">Create a Bitfetter Account</h5>
                <div className="nk-block-des">
                    <p></p>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name" value={data.name} onChange={e => setData({...data, name: e.target.value})} required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email or Username</label>
                <input type="text" className="form-control form-control-lg" id="email" placeholder="Enter your email address or username" value={data.email} onChange={e => setData({...data, email: e.target.value})} required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="password">Passcode</label>
                <div className="form-control-wrap">
                    <a tabIndex="-1" href="#" className="form-icon form-icon-right passcode-switch" data-target="password">
                        <em className="passcode-icon icon-show icon ni ni-eye"></em>
                        <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your passcode" value={data.password} onChange={e => setData({...data, password: e.target.value})} required />
                </div>
            </div>
            <div className="form-group">
                <div className="custom-control custom-control-xs custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="checkbox" checked={data.tos} onChange={e => {setData({...data, tos: e.target.checked});}} required/>
                    <label className="custom-control-label" htmlFor="checkbox">I agree to <a tabIndex="-1" href="#">Privacy Policy</a> &amp; <a tabIndex="-1" href="#"> Terms.</a></label>
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block">{loading ? (<span><i className="fa fa-spinner fa-spin"></i> Authenticating...</span>) : `Register`}</button>
            </div>
        </form>
        <div className="form-note-s2 pt-4"> Already have an account ? <Link to="/login"><strong>Sign in instead</strong></Link>
        </div>
        <ToastContainer />
    </AuthLayout>)
}
export default Register;