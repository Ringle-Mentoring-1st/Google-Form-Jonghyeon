import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FormListPage from './pages/FormListPage';
import FormCreatorPage from './pages/FormCreatorPage';
import FormResultPage from './pages/FormResultPage';
import FormResponsePage from './pages/FormResponsePage';
// Store
import { useAppSelector } from './store/hooks';
// Components
import Container from './ui/Container';
import NavBar from './components/NavBar';
// Assets
import Logo from './assets/logo512.png';

function Routes() {
  const userProfile = useAppSelector((state) => state.user.userProfile);
  return (
    <Router>
      {userProfile.uid && <NavBar logoSrc={Logo} />}
      <Container>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/signup" component={SignupPage} exact />
          <Route path="/form/list" component={FormListPage} exact />
          <Route
            path="/form/:formId/creator"
            component={FormCreatorPage}
            exact
          />
          <Route path="/form/:formId/result" component={FormResultPage} exact />
          <Route
            path="/form/:formId/response"
            component={FormResponsePage}
            exact
          />
        </Switch>
      </Container>
    </Router>
  );
}
export default Routes;
