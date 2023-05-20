import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import usersReducer from './users.reducer';
import smsTransactionsReducer from './smsTransaction.reducer';
import dashboardReducer from './dashboard.reducer';
import disbursementReducer from './disbursements.reducer';
import smsMessage from './sms.reducer'
import auditLogs from './audit-logs.reducer'
import uploadBeneficiaryAccount from './upload-beneficiary-account.reducer'

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  smsTransactions: smsTransactionsReducer,
  dashboard: dashboardReducer,
  disbursement: disbursementReducer,
  smsMessage: smsMessage,
  auditLogs: auditLogs,
  uploadBeneficiaryAccount: uploadBeneficiaryAccount
});
