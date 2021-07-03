import AddressProfileForm from "./AddressProfileForm"
import PersonalProfileForm from "./PersonalProfileForm"

const UpdateProfileModal = () => {
    
    return (<>
        <div className="" style={{width: '400px'}}>
            {/* <h4 className="title">Update Profile</h4> */}
            <ul className="nk-nav nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#personal">Personal</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#address">Address</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active" id="personal">
                    <PersonalProfileForm />
                </div>
                <div className="tab-pane" id="address">
                    <AddressProfileForm />
                </div>
            </div>
        </div>
    </>)
}

export default UpdateProfileModal