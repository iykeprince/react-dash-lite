import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AuthLayout from "../../components/layout/auth/auth.component"

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { verifyAccount } from "../../redux/auth/auth.actions";
import Spinner from "../../components/spinner/spinner.component";

const VerifyAccount = () => {
    const query = useQuery();
    const [code, setCode] = useState(query.get('code') || '');
    const [token, setToken] = useState(query.get('token') || '');

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.message);
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)

    useEffect(() => {
        if(message){
            return toast.info(message)
        }
        if(error){
           return toast.error(error)
        }

        requestVerifyAccount()
        
        
    }, [message, error])
    
    const requestVerifyAccount = () => {
        if(!code.length){
            return toast.error('Invalid CODE!')
        }
        if(!token.length){
            return toast.error('Invalid TOKEN');
        }
        console.log('token', token, 'code', code)
        dispatch(verifyAccount(token, code))
    }

    return (
        <AuthLayout>
            <div className="brand-logo pb-5">
                <a href="/" className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src="./assets/logos/brandmark_blue.png" srcSet="./assets/logos/brandmark_blue.png" alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src="./assets/logos/brandmark_blue.png" srcSet="./assets/logos/brandmark_blue.png" alt="logo-dark" />
                </a>
            </div>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Verify Account</h5>
                    <div className="nk-block-des">
                       {loading && <Spinner />}
                       {message && <p className="alert alert-success">{message}</p>}
                       {error && <p className="alert alert-danger">{error}</p>}
                    </div>
                </div>
            </div>
            
            <div className="form-note-s2 pt-5">
                <Link to="/login"><strong>Return to login</strong></Link>
            </div>
            <ToastContainer />
        </AuthLayout>
    )
}

export default VerifyAccount