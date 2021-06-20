import { Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
   
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