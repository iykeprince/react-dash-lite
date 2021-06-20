import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
    console.log('token', token)
    if (!token) {
        console.log('no token of you')
    } else {
        console.log('check we have token')
    }
    return (
        <Route
            {...rest}
            render={({ location, ...otherProps }) => {
                if (!token) {
                    window.location.href = '/login';
                    return true;
                } else {
                    return <Component {...otherProps} />
                }
            }}
        />
    )
}

export default PrivateRoute