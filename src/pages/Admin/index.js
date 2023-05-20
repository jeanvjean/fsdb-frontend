import React, { Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AkuPeps from './AkuPeps';
import Approvals from './Approvals';
import AuditLogs from './AuditLogs';
import DisbursementLogs from './DisbursementLogs';
import FlaggedTransactions from './FlaggedTransactions';
import AllTransactions from './AllTransactions';
import AdminDashboard from './Dash';
import SmsTransaction from './SmsTransaction';
import Profile from '../Common/Profile';
import AddRepPage from './AddRepPage';
import NotFoundPage from './NotFound';
import ReportsRoute from './Reports';
import { getUserProfileAction } from '../../redux/actions/users.actions';
import { asyncActions } from '../../api';
import AdminRoute from '../../Components/Auth/AdminRoutes';
import AkuPayDisbursementRoute from '../../Components/Auth/AkuPayDisbursementRoutes';
import SettingsPage from './Settings';
import ErrorResponsePage from './ErrorResponsePage';
import UploadErrorLogs from './UploadErrorLogs';
import ManageUsers from './ManageUsers';
import Transactions from './Transactions';
import SmsPage from './Sms';
import FlaggedTransactionsApproval from './FlaggedTransactionsApproval';
import SmsBulkOutbox from './SmsBulkOutbox';
import ManageProgramme from './ManageProgramme';
import UploadLogsPage from './UploadLogsPage';


const AdminRouter = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loggedInUser, user } = useSelector(({ auth, users }) => ({
    loggedInUser: auth.loggedInUser,
    user: users.user,
  }));

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await getUserProfile();
  //     } catch (error) {
  //       localStorage.removeItem('token');
  //       asyncActions('LOGOUT').loading(true);
  //       asyncActions('LOGOUT').success(true);
  //       history.replace('/login');
  //       history.go(0);
  //     }
  //   })();
  // }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!loggedInUser && !user && !token) {
      localStorage.removeItem('token');
      asyncActions('LOGOUT').loading(true);
      asyncActions('LOGOUT').success(true);
      history.replace('/login');
      history.go(0);
    }
  }, []);



  // const getUserProfile = useCallback((payload) => dispatch(getUserProfileAction()), [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/dashboard" render={(props) => <AdminDashboard {...props} />} />
          <Route
            exact
            path="/dashboard/resolve-sms"
            render={(props) => <SmsTransaction {...props} />}
          />
          <AdminRoute exact path="/dashboard/approvals" component={Approvals} />
          <AdminRoute exact path="/dashboard/audit-logs" component={AuditLogs} />
          <AdminRoute exact path="/dashboard/aku-reps" component={AkuPeps} />
          <Route exact path="/dashboard/aku-reps/:id" render={(props) => <AddRepPage {...props} />} />
          <AkuPayDisbursementRoute
            exact
            path="/disbursements-logs"
            component={DisbursementLogs}
          />
          <AdminRoute exact path="/dashboard/flagged-transactions" component={FlaggedTransactions} />
          <AdminRoute exact path="/dashboard/transactions" component={Transactions} />
          <AdminRoute exact path="/dashboard/settings" component={SettingsPage} />
          <AdminRoute exact path="/dashboard/settings/sms" component={SmsPage} />
          <AdminRoute exact path="/dashboard/settings/add-programme" component={ManageProgramme} />
          <AkuPayDisbursementRoute
            exact
            path="/dashboard/all-transactions"
            component={AllTransactions}
          />
          <Route exact path="/dashboard/profile" render={(props) => <Profile {...props} />} />
          <Route exact path="/dashboard/reports" render={(props) => <ReportsRoute {...props} />} />
          <Route exact path="/dashboard/settings/add" render={(props) => <AddRepPage {...props} />} />
          <Route exact path="/dashboard/response-logs" render={(props) => <ErrorResponsePage {...props} />} />
          <Route exact path="/dashboard/upload-error-logs" render={(props) => <UploadErrorLogs {...props} />} />
          <Route exact path="/dashboard/settings/manage-users" render={(props) => <ManageUsers {...props} />} />
          <Route exact path="/dashboard/settings/manage-users/:id" render={(props) => <AddRepPage {...props} />} />
          <Route exact path="/dashboard/flagged-transactions-approval" render={(props) => <FlaggedTransactionsApproval {...props} />} />
          <Route exact path="/dashboard/beneficiary-upload-logs" render={(props) => <UploadLogsPage {...props} />} />
          <Route exact path="/dashboard/all-sms" render={(props) => <SmsBulkOutbox {...props} />} />
          <Route exact path="/login" render={(props) => null} />
          <Route exact render={(props) => <NotFoundPage {...props} />} />
        </Switch>
      </Suspense>

    </BrowserRouter>
  );
};

export default AdminRouter;
