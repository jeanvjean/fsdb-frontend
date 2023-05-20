import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  loadingAllDisbursements: false,
  disbursementsLogs: [],
  reportsSummary: {},
  reportsLoading: false,
  reportsDisburesmentLoading: false,
  reportsRetractionLoading: false,
  reportsCashedOutLoading: false,
  reportsFundingLoading: false,
  reportsFunding: [],
  reportsRetraction: [],
  reportsCashedOut: [],
  reportsDisbursements: [],
  reportsFundingMeta: {},
  disbursementsLogsMeta: {},
  errorAllDisbursements: false,
  flaggedTransactions: [],
  flaggedTransactionsMeta: {},
  loadingFlaggedTransactions: false,
  approvingFlaggedTrasaction: false,
  fetchingFlaggedTrasactions: false,
  flaggedTrasactions: [],
  flaggedTrasactionMeta: {},
  exportingRetractedData: false,

};

const disbursementReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionNames(Types.GET_DISBURSEMENT_LOGS).loading: {
      return {
        ...state,
        loadingAllDisbursements: true,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
      };      
    }
    case asyncActionNames(Types.GET_DISBURSEMENTS_USSD_SESSIONS).loading:
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
      };      
    case asyncActionNames(Types.GET_DISBURSEMENTS_SMS).loading: {
      return {
        ...state,
        loadingAllDisbursements: true,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENT_LOGS).success:{
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: action.payload.data,
        disbursementsLogsMeta: action.payload.meta,
      };      
    }
    case asyncActionNames(Types.GET_DISBURSEMENTS_USSD_SESSIONS).success: {
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: action.payload.data,
        disbursementsLogsMeta: action.payload.meta,
      };      
    }
    case asyncActionNames(Types.GET_DISBURSEMENTS_SMS).success: {
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: action.payload.data,
        disbursementsLogsMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENT_LOGS).failure: {
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
        errorAllDisbursements: true,
      };      
    }
    case asyncActionNames(Types.GET_DISBURSEMENTS_USSD_SESSIONS).failure: {
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
        errorAllDisbursements: true,
      };      
    }
    case asyncActionNames(Types.GET_DISBURSEMENTS_SMS).failure: {
      return {
        ...state,
        loadingAllDisbursements: false,
        disbursementsLogs: [],
        disbursementsLogsMeta: {},
        errorAllDisbursements: true,
      };
    }

    case asyncActionNames(Types.GET_FLAGGED_TRANSACTIONS).loading: {
      return {
        ...state,
        loadingFlaggedTransactions: true,
      };
    }

    case asyncActionNames(Types.GET_FLAGGED_TRANSACTIONS).success: {
      return {
        ...state,
        loadingFlaggedTransactions: false,
        flaggedTransactions: action.payload.data,
        flaggedTransactionsMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_FLAGGED_TRANSACTIONS).failure: {
      return {
        ...state,
        loadingFlaggedTransactions: false,
        flaggedTransactions: [],
        flaggedTransactionsMeta: {},
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_SUMMARY).loading: {
      return {
        ...state,
        reportsLoading: true,
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_SUMMARY).success: {
      return {
        ...state,
        reportsLoading: false,
        reportsSummary: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_SUMMARY).failure: {
      return {
        ...state,
        reportsLoading: false,
        reportsSummary: {},
        
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_FUNDS).loading: {
      return {
        ...state,
        reportsFundingLoading: true,
        reportsFunding: [],
        reportsFundingMeta: {}
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_FUNDS).success: {
      return {
        ...state,
        reportsFundingLoading: false,
        reportsFunding: action.payload.data,
        reportsFundingMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_FUNDS).failure: {
      return {
        ...state,
        reportsFundingLoading: false,
        reportsFunding: [],
        reportsFundingMeta: {},
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_DISBURSEMENT).loading: {
      return {
        ...state,
        reportsDisburesmentLoading: true,
        reportsDisbursements: [],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_DISBURSEMENT).success: {

      const disbursementData = action.payload.data.data;
      const totals = action.payload.data.total;

      // console.log('a=-==-=--totals-==-=-', totals)
      // console.log('disbursementDatadisbursementData', action.payload.data)      

      const patchedData = [
        {
          amount: 'Total Disbursed',
          beneficiaries: totals.total_disburse,
          disbursed_amount: totals.total_sum_disburse,
        },
        {
          amount: 'Unique',
          beneficiaries: totals.total_unique_disburse,
          disbursed_amount: 'N/A',
        },
      ];

      return {
        ...state,
        reportsDisburesmentLoading: false,
        reportsDisbursements: [...disbursementData, ...patchedData],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_DISBURSEMENT).failure: {
      return {
        ...state,
        reportsDisburesmentLoading: false,
        reportsDisbursements: [],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_RETRACTION).loading: {
      return {
        ...state,
        reportsRetractionLoading: true,
        reportsRetraction: [],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_RETRACTION).success: {
  
      const retractedData = action.payload.data.data;
      const totals = action.payload.data.total;

      const patchedData = [
        {
          amount: 'Total Retracted',
          beneficiaries: totals.total_retracted,
          disbursed_amount: totals.total_sum_retracted,
        },
        {
          amount: 'Unique',
          beneficiaries: totals.total_unique_retracted,
          disbursed_amount: 'N/A',
        },
      ];

      return {
        ...state,
        reportsRetractionLoading: false,
        reportsRetraction: [...retractedData, ...patchedData],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_RETRACTION).failure: {
      return {
        ...state,
        reportsRetractionLoading: false,
        reportsRetraction: [],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_CASHEDOUT).loading: {
      return {
        ...state,
        reportsCashedOutLoading: true,
        reportsCashedOut:[]
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_CASHEDOUT).success: {
      const cashedOutdData = action.payload.data.data;
      const totals = action.payload.data.total;

      const patchedData = [
        {
          amount: 'Total Cashed Out',
          beneficiaries: totals.total_cash_out,
          disbursed_amount: totals.total_sum_cash_out,
        },
        {
          amount: 'Unique',
          beneficiaries: totals.total_unique_cashed_out,
          disbursed_amount: 'N/A',
        },
      ];

      return {
        ...state,
        reportsCashedOutLoading: false,
        reportsCashedOut: [...cashedOutdData, ...patchedData],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_REPORTS_CASHEDOUT).failure: {
      return {
        ...state,
        reportsCashedOutLoading: false,
        reportsCashedOut: [],
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).loading: {
      return {
        ...state,
        approvingFlaggedTrasaction: true,
        
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).success: {
      return {
        ...state,
        approvingFlaggedTrasaction: false,
      };
    }

    case asyncActionNames(Types.GET_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).failure: {
      return {
        ...state,
        approvingFlaggedTrasaction: false,
      };
    }
    
    case asyncActionNames(Types.GET_ALL_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).loading: {
      return {
        ...state,
        fetchingFlaggedTrasactions: true,
        flaggedTrasactions: [],
        flaggedTrasactionMeta: {}
      };
    }

    case asyncActionNames(Types.GET_ALL_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).success: {
      return {
        ...state,
        fetchingFlaggedTrasactions: false,
        flaggedTrasactions: action?.payload?.data || [],
        flaggedTrasactionMeta: action?.payload?.meta || {}
      };
    }

    case asyncActionNames(Types.GET_ALL_DISBURSEMENTS_APPROVE_FLAGGED_TRANSC).failure: {
      return {
        ...state,
        fetchingFlaggedTrasactions: false,
        flaggedTrasactions: [],
        flaggedTrasactionMeta: {}        
      };
    } 
    
    case asyncActionNames(Types.EXPORT_RETRACTED_TABLE_DATA).loading: {
      return {
        ...state,
        exportingRetractedData: true,
      };
    }

    case asyncActionNames(Types.EXPORT_RETRACTED_TABLE_DATA).success: {
      return {
        ...state,
        exportingRetractedData: false,
      };
    }

    case asyncActionNames(Types.EXPORT_RETRACTED_TABLE_DATA).failure: {
      return {
        ...state,
        exportingRetractedData: false,     
      };
    }
    
    case asyncActionNames(Types.EXPORT_FUNDING_TABLE_DATA).loading: {
      return {
        ...state,
        exportingRetractedData: true,
      };
    }

    case asyncActionNames(Types.EXPORT_FUNDING_TABLE_DATA).success: {
      return {
        ...state,
        exportingRetractedData: false,
      };
    }

    case asyncActionNames(Types.EXPORT_FUNDING_TABLE_DATA).failure: {
      return {
        ...state,
        exportingRetractedData: false,     
      };
    }
    
    case asyncActionNames(Types.EXPORT_DISBURSEMENT_TABLE_DATA).loading: {
      return {
        ...state,
        exportingRetractedData: true,
      };
    }

    case asyncActionNames(Types.EXPORT_DISBURSEMENT_TABLE_DATA).success: {
      return {
        ...state,
        exportingRetractedData: false,
      };
    }

    case asyncActionNames(Types.EXPORT_DISBURSEMENT_TABLE_DATA).failure: {
      return {
        ...state,
        exportingRetractedData: false,     
      };
    }
    
    
    case asyncActionNames(Types.EXPORT_CASHOUT_TABLE_DATA).loading: {
      return {
        ...state,
        exportingRetractedData: true,
      };
    }

    case asyncActionNames(Types.EXPORT_CASHOUT_TABLE_DATA).success: {
      return {
        ...state,
        exportingRetractedData: false,
      };
    }

    case asyncActionNames(Types.EXPORT_CASHOUT_TABLE_DATA).failure: {
      return {
        ...state,
        exportingRetractedData: false,     
      };
    } 
    
    case asyncActionNames(Types.EXPORT_UPLOAD_ERRORS_DATA).loading: {
      return {
        ...state,
        exportingRetractedData: true,
      };
    }
    case asyncActionNames(Types.EXPORT_UPLOAD_ERRORS_DATA).success: {
      return {
        ...state,
        exportingRetractedData: false,
      };
    }
    case asyncActionNames(Types.EXPORT_UPLOAD_ERRORS_DATA).failure: {
      return {
        ...state,
        exportingRetractedData: false,     
      };
    }      

    default:
      return state;
  }
};

export default disbursementReducer;
