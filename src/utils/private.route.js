import { Redirect, Route } from "react-router";

const PrivateRoute = ({component: Component, ...rest}) => {
    // return <Redirect to={`/login`} />
    return (
        <Route 
            {...rest} 
            render={({location, ...otherProps}) => {
                
                if(localStorage.getItem('BITFETTER_AUTH_TOKEN')){
                    return <Component {...otherProps} />
                }
                
                return <Redirect to={{pathname: `/login`, state: {from: location}}} />
            }}
        />
    )
}

export default PrivateRoute