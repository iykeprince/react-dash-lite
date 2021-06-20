import { Redirect, Route } from "react-router";

console.log('bearer token', localStorage.getItem('BITFETTER_AUTH_TOKEN'))
const PrivateRoute = ({component: Component, ...rest}) => {
    // return <Redirect to={`/login`} />
    return (
        <Route 
            {...rest} 
            render={({location, ...otherProps}) => {
                if(localStorage.getItem('BITFETTER_AUTH_TOKEN') !== null){
                    return <Component {...otherProps} />
                }
                
                window.location.href= '/login';
                return true;
            }}
        />
    )
}

export default PrivateRoute