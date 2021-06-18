import { Route, Switch, useRouteMatch } from "react-router"
import AccountContainer from "./containers/AccountContainer"
import ProfileContainer from "./containers/ProfileContainer"

const ProfilePage = () => {
    const match = useRouteMatch()

    return (

        <div className="nk-content nk-content-fluid">
            <div className="container-xl wide-lg">
                <Route exact path={`${match.path}/`} render={(props) => <ProfileContainer {...props} />} />
                <Route path={`${match.path}/account`} render={(props) => <AccountContainer {...props} />} />
            </div>
        </div>
    )
}

export default ProfilePage