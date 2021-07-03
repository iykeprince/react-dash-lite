const ChangePasswordSuccessModal = ({onHide}) => {
    return (
        <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
                <em class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success"></em>
                <h4 class="nk-modal-title title">Password changed successfully!</h4>
                <div class="nk-modal-text">
                    <p class="caption-text">Your password for your account has been successfully changed. You will need to sign in with your new password next time.</p>
                    <p class="sub-text-sm">Reset your password, if you forgot or lost.</p>
                </div>
                <div class="nk-modal-action-lg">
                    <ul class="btn-group gx-4">
                        <li><button onClick={onHide} class="btn btn-mw btn-primary">Return</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordSuccessModal