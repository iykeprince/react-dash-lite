import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpassword" component={ResetPassword} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
