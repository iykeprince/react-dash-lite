import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileNav from "../components/ProfileNav"

const ProfileContainer = () => {
    const user = useSelector(state => state.auth.user)
    return (<div className="nk-content-body">
        <ProfileNav activeLink="profile"  />
        <div className="nk-block">
            <div className="nk-block"></div>

            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Personal Information</h5>
                    <div className="nk-block-des">
                        <p>Basic info, like your name and address, that you use on our platform.</p>
                    </div>
                </div>
            </div>

            <div className="card card-bordered">
                <div className="nk-data data-list">
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div className="data-col">
                            <span className="data-label">Full Name</span>
                            <span className="data-value">{user.fullname}</span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div className="data-col">
                            <span className="data-label">Display Name</span>
                            <span className="data-value">{user.fullname.split(' ')[0]}</span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item">
                        <div className="data-col">
                            <span className="data-label">Email</span>
                            <span className="data-value">{user.email}</span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more disable"><em className="icon ni ni-lock-alt"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div className="data-col">
                            <span className="data-label">Phone Number</span>
                            <span className="data-value">
                                {user.mobile}
                        </span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div className="data-col">
                            <span className="data-label">Telegram</span>
                            <span className="data-value text-soft font-italic">
                                Not added yet
                        </span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                        <div className="data-col">
                            <span className="data-label">Date of Birth</span>
                            <span className="data-value">
                                Jul 07, 1970
                        </span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                        <div className="data-col">
                            <span className="data-label">Country</span>
                            <span className="data-value">
                                Afghanistan
                        </span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                    <div className="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                        <div className="data-col">
                            <span className="data-label">Address</span>
                            <span className="data-value text-soft font-italic">
                                Not add yet
                        </span>
                        </div>
                        <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ProfileContainer