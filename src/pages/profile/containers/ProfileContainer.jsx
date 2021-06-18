import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileNav from "../components/ProfileNav"

const ProfileContainer = () => {
    const user = useSelector(state => state.auth.user)
    return (<div class="nk-content-body">
        <ProfileNav activeLink="profile"  />
        <div class="nk-block">
            <div class="nk-block"></div>

            <div class="nk-block-head">
                <div class="nk-block-head-content">
                    <h5 class="nk-block-title">Personal Information</h5>
                    <div class="nk-block-des">
                        <p>Basic info, like your name and address, that you use on our platform.</p>
                    </div>
                </div>
            </div>

            <div class="card card-bordered">
                <div class="nk-data data-list">
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">Full Name</span>
                            <span class="data-value">{user.fullname}</span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">Display Name</span>
                            <span class="data-value">{user.fullname.split(' ')[0]}</span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item">
                        <div class="data-col">
                            <span class="data-label">Email</span>
                            <span class="data-value">{user.email}</span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more disable"><em class="icon ni ni-lock-alt"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">Phone Number</span>
                            <span class="data-value">
                                {user.mobile}
                        </span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">Telegram</span>
                            <span class="data-value text-soft font-italic">
                                Not added yet
                        </span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">Date of Birth</span>
                            <span class="data-value">
                                Jul 07, 1970
                        </span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                        <div class="data-col">
                            <span class="data-label">Country</span>
                            <span class="data-value">
                                Afghanistan
                        </span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div class="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                        <div class="data-col">
                            <span class="data-label">Address</span>
                            <span class="data-value text-soft font-italic">
                                Not add yet
                        </span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ProfileContainer