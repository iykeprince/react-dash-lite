import AuthLayout from "../../components/layout/auth/auth.component"

const ResetPassword = () => {

    return (
        <AuthLayout>
            <div className="brand-logo pb-5">
                <a href="index.html" className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark" />
                </a>
            </div>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Reset password</h5>
                    <div className="nk-block-des">
                        <p>If you forgot your password, We’ll email you instructions to reset your password.</p>
                    </div>
                </div>
            </div>
            <form action="auth-success.html">
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" for="default-01">Email</label>
                        <a className="link link-primary link-sm" href="#">Need Help?</a>
                    </div>
                    <input type="text" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address" />
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block">Send Reset Link</button>
                </div>
            </form>
            <div className="form-note-s2 pt-5">
                <a href="auth-login.html"><strong>Return to login</strong></a>
            </div>
        </AuthLayout>
    )
}

export default ResetPassword