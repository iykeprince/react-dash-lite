import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './utils/private.route';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const DepositPage = React.lazy(() => import('./pages/deposit/DepositPage'));
const DepositorSuccessPage = React.lazy(() => import('./pages/deposit/DepositorSuccessPage'));

const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');

const App = () => {
  const user = useSelector(state => state.auth.user);
  console.log('user from selector', user)
  return (
  <>
    <Suspense fallback={<h3 className="d-flex justify-content-center">loading...</h3>}>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" render={(props) => token ? <Redirect to={`/`} /> : (<Login {...props} />)} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />

        <PrivateRoute exact path="/" component={DashboardPage}/>
        <PrivateRoute exact path="/deposit" component={DepositPage} />
        <PrivateRoute path="/deposit/success" component={DepositorSuccessPage} />
      </Switch>
    </Suspense>
  </>
)}

export default App;
