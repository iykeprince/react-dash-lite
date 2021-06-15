import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'

import { getUser } from './redux/auth/auth.actions';
import PrivateRoute from './utils/private.route';

const Login = React.lazy( () =>  import('./pages/auth/Login') );
const Register = React.lazy(() => import('./pages/auth/Register'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));

const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');

const App = () => {
  const dispatch = useDispatch();
  // const token = useSelector(state => state.auth.token) || localStorage.getItem('BITFETTER_AUTH_TOKEN')

  // useEffect(() => {
  //   if(token){
  //     console.log('token is available and therefore loading user profile');
  //     dispatch(getUser())
  //   }
  // }, [token]);

  return (
    <>
      <Suspense fallback={<h3 className="d-flex justify-content-center">loading...</h3>}>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" render={(props) => token ? <Redirect to={`/`} /> : (<Login {...props} />) } />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
      </Switch>
      </Suspense>
    </>
  );
}

export default App;
