import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  exportingAuditLogs: false
};

const smsReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case asyncActionNames(Types.EXPORT_AUDIT_LOGS).loading: {
      return {
        ...state,
        exportingAuditLogs: true,
      };
    }
    case asyncActionNames(Types.EXPORT_AUDIT_LOGS).success: {
      
      return {
        ...state,
        exportingAuditLogs: false,
      };
    }

    case asyncActionNames(Types.EXPORT_AUDIT_LOGS).failure: {
      return {
        ...state,
        exportingAuditLogs: false,
      };
    }     

    default:
      return state;
  }
};

export default smsReducer;
