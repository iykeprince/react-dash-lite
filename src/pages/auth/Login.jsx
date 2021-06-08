import AuthLayout from "../../components/layout/auth/auth.component"

const Login = () => {

    return (<AuthLayout>
        <div className="brand-logo pb-5">
            <a href="index.html" className="logo-link">
                <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo" />
                <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark" />
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
        <form action="#">
            <div className="form-group">
                <div className="form-label-group">
                    <label className="form-label" for="default-01">Email or Username</label>
                    <a className="link link-primary link-sm" tabindex="-1" href="#">Need Help?</a>
                </div>
                <input type="text" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address or username" />
            </div>
            <div className="form-group">
                <div className="form-label-group">
                    <label className="form-label" for="password">Passcode</label>
                    <a className="link link-primary link-sm" tabindex="-1" href="auth-reset.html">Forgot Code?</a>
                </div>
                <div className="form-control-wrap">
                    <a tabindex="-1" href="#" className="form-icon form-icon-right passcode-switch" data-target="password">
                        <em className="passcode-icon icon-show icon ni ni-eye"></em>
                        <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your passcode" />
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block">Sign in</button>
            </div>
        </form>
        <div className="form-note-s2 pt-4"> New here? <a href="auth-register.html">Create an account</a>
        </div>
    </AuthLayout>)
}

export default Login