import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const uploadBeneficiaryAccountAction = (formData, config) =>
  asyncRequest(Types.UPLOAD_BENEFICAIRY_ACCOUNT, `beneficiary-acc-upload`, 'post', formData, config)
  
export const beneficiaryUploadLogsAction = (params) =>
  asyncRequest(Types.BENEFICIARY_UPLOAD_LOGS, `beneficiary-upload-logs`, 'get', {}, {}, params);  
