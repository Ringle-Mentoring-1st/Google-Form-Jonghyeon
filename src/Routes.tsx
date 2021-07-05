import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Components
import Container from './ui/Container';
import NavBar from './components/NavBar';
import { useAppSelector } from './store/hooks';

function Routes() {
  const userProfile = useAppSelector(state => state.user.userProfile);
  return (
    <Router>
      {userProfile.uid && <NavBar />}
      <Container>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/signup" component={SignupPage} exact />
        </Switch>
      </Container>
    </Router>
  );
}
export default Routes;
