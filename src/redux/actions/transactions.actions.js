import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const getSMSTransactionsRepAction = (period, s = '', filter = '', page = 1) =>
  asyncRequest(
    Types.GET_SMS_TRANSACTIONS_REP,
    `pending-resolve?period=${period}&s=${s}&status=${filter}&page=${page}`,
    'get'
  );
  // period, s = '', page
export const getAllTransactionsAction = (params) =>
  asyncRequest(
    Types.GET_ALL_TRANSACTIONS,
    `disbursements`,
    'get',
    {},
    {},
    params
  );

export const getFlaggedTransactionsAction = (params={flagged:true}) =>
  asyncRequest(
    Types.GET_FLAGGED_TRANSACTIONS,
    `disbursements`,
    'get',
    {},
    {},
    params
  );
  // `pending-approval?period=${period}&s=${s}&status=${filter}`
export const getSMSTransactionsAdminAction = (params) =>
  asyncRequest(
    Types.GET_SMS_TRANSACTIONS_ADMIN,
    `pending-approval`,
    'get',
    {},
    {},
    params
  );

export const approveSMSTransactionsAction = (payload) =>
  asyncRequest(Types.APPROVE_SMS_TRANSACTIONS, `approve-transactions`, 'post', payload);

export const resolveSMSTransactionsAction = (payload) =>
  asyncRequest(Types.RESOLVE_SMS_TRANSACTIONS, `resolve-transactions`, 'post', payload);

export const processSMSTransactionsAction = (payload) =>
  asyncRequest(Types.PROCESS_SMS_TRANSACTIONS, `process-transactions`, 'post', payload);
