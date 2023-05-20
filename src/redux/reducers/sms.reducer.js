import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  addingSmsMessage: false,
  fetchingSmsMessage: false,
  smsMessage: "",
  fetchingAllSmsLogs: false,
  allSmsLogs: [],
  smsLogsMeta: {},
  fetchingAllSmsLogs: false,
  exportingSmsLogs: false,
  exportingResponseLogs: false,
};

const smsReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case asyncActionNames(Types.ADD_SMS_MESSAGE).loading: {
      return {
        ...state,
        addingSmsMessage: true,
      };
    }
    case asyncActionNames(Types.ADD_SMS_MESSAGE).success: {
      return {
        ...state,
        addingSmsMessage: false,
      };
    }

    case asyncActionNames(Types.ADD_SMS_MESSAGE).failure: {
      return {
        ...state,
        addingSmsMessage: false,
      };
    }

    case asyncActionNames(Types.FETCH_SMS_MESSAGE).loading: {
      return {
        ...state,
        fetchingSmsMessage: true,
        smsMessage: ""
      };
    }
    case asyncActionNames(Types.FETCH_SMS_MESSAGE).success: {
      
      return {
        ...state,
        fetchingSmsMessage: false,
        smsMessage: action?.payload?.data || ""
      };
    }

    case asyncActionNames(Types.FETCH_SMS_MESSAGE).failure: {
      return {
        ...state,
        fetchingSmsMessage: false,
        smsMessage: ""
      };
    } 
    
    case asyncActionNames(Types.FETCH_ALL_SMS_LOGS).loading: {
      return {
        ...state,
        fetchingAllSmsLogs: true,
        allSmsLogs: [],
        smsLogsMeta: {},
      };
    }
    case asyncActionNames(Types.FETCH_ALL_SMS_LOGS).success: {
      
      return {
        ...state,
        fetchingAllSmsLogs: false,
        allSmsLogs: [...action.payload.data],
        smsLogsMeta: action.payload.meta
      };
    }

    case asyncActionNames(Types.FETCH_ALL_SMS_LOGS).failure: {
      return {
        ...state,
        fetchingAllSmsLogs: false,
        allSmsLogs: [],
        smsLogsMeta: {}
      };
    }

    case asyncActionNames(Types.FETCH_ALL_INCOMING_SMS_LOGS).loading: {
      return {
        ...state,
        fetchingAllSmsLogs: true,
        allSmsLogs: [],
        smsLogsMeta: {},
      };
    }
    case asyncActionNames(Types.FETCH_ALL_INCOMING_SMS_LOGS).success: {
      
      return {
        ...state,
        fetchingAllSmsLogs: false,
        allSmsLogs: [...action.payload.data],
        smsLogsMeta: action.payload.meta
      };
    }

    case asyncActionNames(Types.FETCH_ALL_INCOMING_SMS_LOGS).failure: {
      return {
        ...state,
        fetchingAllSmsLogs: false,
        allSmsLogs: [],
        smsLogsMeta: {}
      };
    }
    
    case asyncActionNames(Types.DOWNLOAD_SMS_LOGS).loading: {
      return {
        ...state,
        downloadingSmsLogs: true,
      };
    }
    case asyncActionNames(Types.DOWNLOAD_SMS_LOGS).success: {
      
      return {
        ...state,
        downloadingSmsLogs: false,
      };
    }

    case asyncActionNames(Types.DOWNLOAD_SMS_LOGS).failure: {
      return {
        ...state,
        downloadingSmsLogs: false,
      };
    }
    
    case asyncActionNames(Types.EXPORT_SMS_LOGS_TABLE).loading: {
      return {
        ...state,
        exportingSmsLogs: true,
      };
    }
    case asyncActionNames(Types.EXPORT_SMS_LOGS_TABLE).success: {
      
      return {
        ...state,
        exportingSmsLogs: false,
      };
    }

    case asyncActionNames(Types.EXPORT_SMS_LOGS_TABLE).failure: {
      return {
        ...state,
        exportingSmsLogs: false,
      };
    }
    
    case asyncActionNames(Types.EXPORT_RESPONSE_LOGS).loading: {
      return {
        ...state,
        exportingResponseLogs: true,
      };
    }
    case asyncActionNames(Types.EXPORT_RESPONSE_LOGS).success: {
      
      return {
        ...state,
        exportingResponseLogs: false,
      };
    }

    case asyncActionNames(Types.EXPORT_RESPONSE_LOGS).failure: {
      return {
        ...state,
        exportingResponseLogs: false,
      };
    }      

    default:
      return state;
  }
};

export default smsReducer;
