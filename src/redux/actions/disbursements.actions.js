import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';


// ?period=${period}&page=${page}&s=${s}&status=paid&bands=${band}

export const getDisbursementsBeneficiariesAction = (params) =>
  asyncRequest(
    Types.GET_DISBURSEMENT_LOGS,
    `disbursements`,
    'get',
    {},
    {},
    params
  );

export const getDisbursementsUSSDSessions = (params) =>
  asyncRequest(
    Types.GET_DISBURSEMENTS_USSD_SESSIONS,
    `disbursements`,
    'get',
    {},
    {},
    params
  );

export const getDisbursementsSMS = (params) =>
  asyncRequest(
    Types.GET_DISBURSEMENTS_SMS,
    `disbursements`,
    'get',
    {},
    {},
    params
  );

export const getDisbursementsReportSummary = (params) =>
  asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_SUMMARY, `disbursements/reports/summary`, 'get', {}, {}, params);

// export const getDisbursementsFundingData = (params={}) =>
//   asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_FUNDS, `funds`, 'get', {}, {}, params);

export const getDisbursementsFundingData = (params={}) =>
  asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_FUNDS, `funds/logs`, 'get', {}, {}, params);

export const getReportsDisbursements = (params={}) =>
  asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_DISBURSEMENT, `transactions/disbursement`, 'get', {}, {}, params);

export const getReportsRetractions = (params) =>
  asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_RETRACTION, `transactions/retracted`, 'get', {}, {}, params);

export const getReportsCashedOut = (params) =>
  asyncRequest(Types.GET_DISBURSEMENTS_REPORTS_CASHEDOUT, `transactions/cashout`, 'get', {}, {}, params);

export const getApproveFlaggedTransactionAction = (body={}) =>
  asyncRequest(Types.GET_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC, `disbursements/flagged/approve`, 'post', body);
  
export const getAllApprovedFlaggedTransactionsAction = (params) =>
  asyncRequest(Types.GET_ALL_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC, `disbursements/flagged/approve`, 'get', {}, {}, params);
  
export const exportRetractedTableDataAction = (payload) =>
  asyncRequest(Types.EXPORT_RETRACTED_TABLE_DATA, `transactions/retracted/export`, 'post', payload);

export const exportFundingTableDataAction = (payload) =>
  asyncRequest(Types.EXPORT_FUNDING_TABLE_DATA, `funds/export`, 'post', payload);

export const exportDisbursementTableDataAction = (payload) =>
  asyncRequest(Types.EXPORT_DISBURSEMENT_TABLE_DATA, `disbursements/export`, 'post', payload);

export const exportCashedoutTableDataAction = (payload) =>
  asyncRequest(Types.EXPORT_CASHOUT_TABLE_DATA, `transactions/cashout/export`, 'post', payload);

export const exportFlaggedTransactionsAction = (payload) =>
  asyncRequest(Types.EXPORT_FLAGED_TRANSC_TABLE_DATA, `disbursements/flagged/approve/export`, 'post', payload);

export const exportUploadErrorLogsAction = (payload) =>
  asyncRequest(Types.EXPORT_UPLOAD_ERRORS_DATA, `logs/upload-errors/export`, 'post', payload);    
