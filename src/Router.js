import React, { useEffect, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import Profile from './pages/Common/Profile';
import AdminRouter from './pages/Admin';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import SetPassword from './Components/Auth/SetPassword';
import ProtectedRoute from './Components/Auth/ProtectedRoutes';
import { Box, Flex } from 'rebass';
import { UserProvider } from './context/UserContext';
import { useUser } from './hooks/useUser';
import { Spinner } from './Components/Elements/Spinner';
import SidebarProvider, { SidebarContext } from './context/SidebarContext';
import { useSidebar } from './hooks/useSidebar';

const LoginPage = lazy(() => import('./Components/Auth/Login'))

const Landing = (props) => {
  const history = useHistory();
  useEffect(() => {
    history.push('/dashboard');
  }, [history]);
  return null;
};

const Scroll = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [props.location]);
  return props.children;
};

export const Protected = ({children}) => {
  const { loading, user } = useUser();
  const {push} = useHistory()

  if (loading) return (
    <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
      <Spinner color="black" />
    </Flex>
  )

  if (!Object.keys(user).length) push('/login') 
  
  return  {...children}
};

const ScrollToTop = withRouter(Scroll);
class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <SidebarProvider>
            <ScrollToTop>
              <Suspense fallback={<Box>loading...</Box>}>
                <Switch>
                  <ProtectedRoute exact path="/" component={Landing} />
                  <ProtectedRoute path="/login" component={LoginPage} />
                  <ProtectedRoute path="/reset-password" component={ResetPassword}/>
                  <ProtectedRoute path="/forgot-password" component={ForgotPassword}/>
                  <ProtectedRoute path="/set-password" component={SetPassword}/>
                  <Protected>
                    <AdminRouter />
                  </Protected>
                </Switch>  
              </Suspense>
            </ScrollToTop>
          </SidebarProvider>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default Router;
