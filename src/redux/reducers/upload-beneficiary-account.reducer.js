import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  uploadingAccount: false,
  loadingLogs: false,
  uploadLogs: [],
  meta: {},
};

const uploadBeneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case asyncActionNames(Types.UPLOAD_BENEFICAIRY_ACCOUNT).loading: {
      return {
        ...state,
        uploadingAccount: true,
      };
    }
    case asyncActionNames(Types.UPLOAD_BENEFICAIRY_ACCOUNT).success: {
      return {
        ...state,
        uploadingAccount: false,
      };
    }
    case asyncActionNames(Types.UPLOAD_BENEFICAIRY_ACCOUNT).failure: {
      return {
        ...state,
        uploadingAccount: false,
      };
    }    
    
    case asyncActionNames(Types.BENEFICIARY_UPLOAD_LOGS).loading: {
      return {
        ...state,
        loadingLogs: true,
        uploadLogs: [],
        meta: {},        
      };
    }
    case asyncActionNames(Types.BENEFICIARY_UPLOAD_LOGS).success: {
      
      return {
        ...state,
        loadingLogs: false,
        uploadLogs: [...action.payload.data],
        meta: {...action.payload.meta}
      };
    }
    case asyncActionNames(Types.BENEFICIARY_UPLOAD_LOGS).failure: {
      return {
        ...state,
        loadingLogs: false,
        uploadLogs: [],
        meta: {},
      };
    }     

    default:
      return state;
  }
};

export default uploadBeneficiaryReducer;
