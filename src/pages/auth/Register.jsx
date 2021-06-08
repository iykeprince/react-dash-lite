import AuthLayout from "../../components/layout/auth/auth.component";

const Register = () => {
    return (<AuthLayout>
        <div className="brand-logo pb-5">
            <a href="index.html" className="logo-link">
                <img className="logo-light logo-img logo-img-lg" src="../images/logo.png" srcset="./images/logo2x.png 2x" alt="logo" />
                <img className="logo-dark logo-img logo-img-lg" src="../images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark" />
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
        <form action="auth-success.html">
            <div className="form-group">
                <label className="form-label" for="name">Name</label>
                <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
                <label className="form-label" for="email">Email or Username</label>
                <input type="text" className="form-control form-control-lg" id="email" placeholder="Enter your email address or username" />
            </div>
            <div className="form-group">
                <label className="form-label" for="password">Passcode</label>
                <div className="form-control-wrap">
                    <a tabindex="-1" href="#" className="form-icon form-icon-right passcode-switch" data-target="password">
                        <em className="passcode-icon icon-show icon ni ni-eye"></em>
                        <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your passcode" />
                </div>
            </div>
            <div className="form-group">
                <div className="custom-control custom-control-xs custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="checkbox" />
                    <label className="custom-control-label" for="checkbox">I agree to <a tabindex="-1" href="#">Privacy Policy</a> &amp; <a tabindex="-1" href="#"> Terms.</a></label>
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block">Register</button>
            </div>
        </form>
        <div className="form-note-s2 pt-4"> Already have an account ? <a href="auth-login.html"><strong>Sign in instead</strong></a>
        </div>

    </AuthLayout>)
}
export default Register;