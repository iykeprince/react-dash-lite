import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthLayout from "../../components/layout/auth/auth.component"
import { requestLogin } from "../../redux/auth/auth.actions";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [visible, setVisible ] = useState(false)

    const location = useHistory();
    const dispatch = useDispatch();
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
    }, [isAuthenticated, error])

    console.log('loading', loading)

    const handleSubmit = e => {
        const data = {email, password};
        dispatch(requestLogin(data))

        e.preventDefault()
    }

    return (<AuthLayout>
        
        <div className="brand-logo pb-5">
            <a href="#" className="logo-link">
                <img className="logo-light logo-img logo-img-lg" src="./assets/logos/brandmark_blue.png" alt="logo" />
                <img className="logo-dark logo-img logo-img-lg" src="./assets/logos/brandmark_blue.png" alt="logo-dark" />
            </a>
        </div>
        <div className="nk-block-head">
            <div className="nk-block-head-content">
                <h5 className="nk-block-title">Sign-In</h5>
                <div className="nk-block-des">
                    <p>Access your BitFetter Account using your email and passcode.</p>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">Email or Username</label>
                    {/* <a className="link link-primary link-sm" tabIndex="-1" href="#">Need Help?</a> */}
                </div>
                <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="default-01" 
                    placeholder="Enter your email address or username" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <div className="form-label-group">
                    <label className="form-label" htmlFor="password">Passcode</label>
                    <Link className="link link-primary link-sm" tabIndex="-1" to="/forgotpassword">Forgot Code?</Link>
                </div>
                <div className="form-control-wrap">
                    <a tabIndex="-1" onClick={() => setVisible(!visible)} className="form-icon form-icon-right passcode-switch" data-target="password">
                        <em className="passcode-icon icon-show icon ni ni-eye"></em>
                        <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input 
                        type={visible ? "text" : "password"} 
                        className="form-control form-control-lg" 
                        id="password" 
                        placeholder="Enter your passcode" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block" type="submit">{loading ? (<span><i className="fa fa-spinner fa-spin"></i> Authenticating...</span>) : `Sign in`}</button>
            </div>
        </form>
        <div className="form-note-s2 pt-4"> New here? <Link to="/register">Create an account</Link>
        </div>
        <ToastContainer />
    </AuthLayout>)
}

export default Login