import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './utils/private.route';

import Layout from './components/layout/layout/layout.component';
import Spinner from './components/spinner/spinner.component';
import './App.css'
import { useDispatch } from 'react-redux';
import { getUser } from './redux/auth/auth.actions';
import VerifyAccount from './pages/auth/VerifyAccount';
import AdminRoute from './utils/admin.route';

const KycStarterPage = React.lazy(() => import('./pages/kyc/KycStarterPage'));
const KycFormPage = React.lazy(() => import('./pages/kyc/KycFormPage'));

const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const DepositPage = React.lazy(() => import('./pages/deposit/DepositPage'));
const DepositorSuccessPage = React.lazy(() => import('./pages/deposit/DepositorSuccessPage'));
const WithdrawPage = React.lazy(() => import('./pages/withdraw/WithdrawPage'));
const ProfilePage = React.lazy(() => import('./pages/profile/ProfilePage'));
const TransactionPage = React.lazy(() => import('./pages/transaction/TransactionPage'))
const WithdrawSuccessPage = React.lazy(() => import('./pages/withdraw/WithdrawSuccessPage'))
const InvestmentPage = React.lazy(() => import('./pages/investment/InvestmentPage'))
const PlanPage = React.lazy(() => import('./pages/plans/PlanPage'))
const InvestmentDetailPage = React.lazy(() => import('./pages/investment/InvestmentDetailPage'))
const ReferralsPage = React.lazy(() => import('./pages/referrals/Referrals'))
const SyncPage = React.lazy(() => import('./pages/sync/Sync'))

const AdminUsers = React.lazy(() => import('./pages/admin/users/AdminUsers'))
const AdminWithdrawals = React.lazy(() => import('./pages/admin/withrawals/AdminWithdrawals'));
const AdminTopUp = React.lazy(() => import('./pages/admin/topup/AdminTopUp'))
const AdminPayment = React.lazy(() => import('./pages/admin/payments/AdminPayment'))

const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const App = () => {

  return (
  <>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" render={(props) => token ? <Redirect to={`/`} /> : (<Login {...props} />)} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/verifyAccount" component={VerifyAccount} />

        <PrivateRoute exact path="/" component={DashboardPage} />
        <PrivateRoute exact path="/deposit" component={DepositPage} />
        <PrivateRoute path="/deposit/success" component={DepositorSuccessPage} />
        <PrivateRoute exact path="/withdraw" component={WithdrawPage} />
        <PrivateRoute path="/withdraw/success" component={WithdrawSuccessPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/transactions" component={TransactionPage} />
        <PrivateRoute path="/plans" component={PlanPage} />
        <PrivateRoute path="/investment" component={InvestmentPage} />
        <PrivateRoute path="/investment-detail/:investmentId" component={InvestmentDetailPage} />
        <PrivateRoute path="/referrals" component={ReferralsPage} />
        <PrivateRoute path="/kyc" component={KycStarterPage} />
        <PrivateRoute path="/kyc-form" component={KycFormPage} />
        <PrivateRoute path="/sync" component={SyncPage} />

        <AdminRoute path="/admin-users" component={AdminUsers} />
        <AdminRoute path="/admin-withdrawals" component={AdminWithdrawals} />
        <AdminRoute path="/admin-topup" component={AdminTopUp} />
        <AdminRoute path="/admin-payments" component={AdminPayment} />
      </Switch>
    </Suspense>
  </>);
  }


export default App;
