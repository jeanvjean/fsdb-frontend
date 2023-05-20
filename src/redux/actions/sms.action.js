import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const addSmsMessageAction = (id, body) =>
  asyncRequest(Types.ADD_SMS_MESSAGE, `programmes/sms/${id}`, 'put', body);
  // asyncRequest(Types.ADD_SMS_MESSAGE, `programmes/${id}/sms`, 'put', body);

export const fetchSmsMessageAction = (id, params) =>
  asyncRequest(Types.FETCH_SMS_MESSAGE, `programmes/${id}/sms`, 'get', {}, {}, params);
  
export const fetchAllSMSLogsAction = (params) =>
  asyncRequest(Types.FETCH_ALL_SMS_LOGS, `disbursements/sms/logs`, 'get', {}, {}, params);

export const fetchAllIncomingSMSLogsAction = (params) =>
  asyncRequest(Types.FETCH_ALL_INCOMING_SMS_LOGS, `disbursements/sms/applicant-replies`, 'get', {}, {}, params);
  
export const handleDownloadSMSLogsAction = (params) =>
  asyncRequest(Types.DOWNLOAD_SMS_LOGS, `disbursements/sms/applicant-replies/export`, 'get', {}, {}, params);
  
export const handleSMSExportLogsaAction = (payload) =>
  asyncRequest(Types.EXPORT_SMS_LOGS_TABLE, `disbursements/sms/logs/export`, 'post', payload);

export const handleExportResponseLogsAction = (payload) =>
  asyncRequest(Types.EXPORT_RESPONSE_LOGS,`logs/webhook-response/export`, 'post', payload);    
  
  
  