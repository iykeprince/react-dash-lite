import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalProfile } from "../../../redux/profile/profile.actions";

const PersonalProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const updating = useSelector(state => state.profile.updatingProfile);

    const [data, setData] = useState({fullname: '', nickname: '', phone: '', telegram: '', dob: ''});

    useEffect(() => {
        setData({
            ...data, 
            fullname: user.fullname, 
            nickname: user.nickname, 
            phone: user.mobile, 
            telegram: user.telegram, 
            dob: user.dob
        })
    }, [user]);

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmit = e => {
        dispatch(updatePersonalProfile(data))
        // console.log(data)
        e.preventDefault();
    }
    return (<>
        <form onSubmit={handleSubmit} className="form-validate is-alter form-profile" id="profile-personal-form">
            <div className="row gy-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="full-name">Full Name  <span className="text-danger">*</span></label>
                        </div>

                        <div className="form-control-wrap">
                            <input type="text" name="fullname" value={data.fullname} onChange={handleChange} className="form-control form-control-lg" id="full-name" placeholder="Enter Full name" required="" maxLength="190" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="display-name">Nice Name <span className="text-danger">*</span></label>
                        </div>

                        <div className="form-control-wrap">
                            <input type="text" name="nickname" value={data.nickname} onChange={handleChange}className="form-control form-control-lg" id="display-name" placeholder="Enter display name" required="" maxLength="190" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="phone-no">Phone Number</label>
                        </div>

                        <div className="form-control-wrap">
                            <input type="text"name="phone" value={data.phone} onChange={handleChange} className="form-control form-control-lg" id="phone-no" placeholder="Phone Number" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="telegram">Telegram</label>
                        </div>

                        <div className="form-control-wrap">
                            <input type="text" name="telegram" value={data.telegram} onChange={handleChange} className="form-control form-control-lg" id="telegram" placeholder="Telegram" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="birth-day">Date of Birth</label>
                        <input type="text" name="dob" value={data.dob} onChange={handleChange} data-date-start-date="-85y" data-date-end-date="-12y" className="form-control form-control-lg date-picker-alt" id="birth-day" placeholder="Enter your date of birth" />
                    </div>
                </div>
                {/* <div className="col-12">
                    <div className="custom-control custom-switch">
                        <input type="checkbox" name="profile_display_full_name" className="custom-control-input" id="display-full-name" checked="" />
                        <label className="custom-control-label" htmlFor="display-full-name">Use full name to display</label>
                    </div>
                </div> */}
                <div className="col-12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2 pt-2">
                        <li>
                            <button type="submit" id="update-profile" className="btn btn-lg btn-primary" disabled={updating}>{updating ? 'UPdating...' : 'Update Profile'}</button>
                        </li>
                        {/* <li>
                            <a href="#" data-dismiss="modal" className="link link-light">Cancel</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </form>
    </>)
}

export default PersonalProfileForm