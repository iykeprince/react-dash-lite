import { Route, Switch, useRouteMatch } from "react-router"
import Layout from "../../components/layout/layout/layout.component"
import AccountContainer from "./containers/AccountContainer"
import ProfileContainer from "./containers/ProfileContainer"
import SecurityContainer from "./containers/SecurityContainer"

const ProfilePage = () => {
    const match = useRouteMatch()

    return (

        <Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <Route exact path={`${match.path}/`} render={(props) => <ProfileContainer {...props} />} />
                    <Route path={`${match.path}/account`} render={(props) => <AccountContainer {...props} />} />
                    <Route path={`${match.path}/security`} render={(props) => <SecurityContainer {...props} /> } />
                </div>
            </div>
        </Layout>
    )
}

export default ProfilePage