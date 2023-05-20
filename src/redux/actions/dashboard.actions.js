import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const getDashboardSummaryAction = (params) =>
  asyncRequest(Types.GET_DASHBOARD_SUMMARY, `services/dashboard/summary`, 'get', {}, {}, params);

export const getDashboardChartsAction = (period) =>
  asyncRequest(Types.GET_DASHBOARD_CHARTS_DATA, `sms-transactions-chart?period=${period}`, 'get');

export const getAllProgrammesAction = (params) =>
  asyncRequest(Types.GET_PROGRAMMES, `programmes`, 'get', {}, {}, params);  

export const createProgrammeAction = (payload) =>
  asyncRequest(Types.CREATE_PROGRAMMES, `programmes`, 'post', payload);

export const deleteProgrammeAction = (id) =>
  asyncRequest(Types.DELETE_PROGRAMME, `programmes/${id}`, 'delete'); 
  
export const editProgrammeAction = (id, payload) =>
  asyncRequest(Types.EDIT_PROGRAMME, `programmes/${id}`, 'put', payload);   
