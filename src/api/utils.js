import { toastMessage } from '../Components/Elements';

const { apiCall } = require('.');

export const utils = {
  login: async (payload) => {
    const res = await apiCall('auth/login', 'post', payload);
    return res;
  },
  getLoggedInUser: async () => {
    const res = await apiCall('profile', 'get');
    return res;
  },
  createUser: async (payload) => {
    const res = await apiCall('users', 'post', payload);
    return res;
  },
  viewAuser: async (id, params = {}) => {
    const res = await apiCall(`users/${id}`, 'get', {}, {}, params);
    return res;
  },
  fetchTransactions: async (params = {}) => {
    const res = await apiCall(`disbursements/transactions`, 'get', {}, {}, params);
    return res;
  },
  sendResetPasswdEmail: async (payload) => {
    try {
      const res = await apiCall('auth/forgot-password', 'post', payload);
      return res.data.data;
    } catch (error) {
      if (error.request) {
        toastMessage({
          type: 'warning',
          message: 'Connection problem!',
        });
      }
    }
  },
  resetPasswd: async (payload) => {
    try {
      const res = await apiCall('auth/reset-password', 'post', payload);
      return res;
    } catch (error) {
      if (error.request) {
        console.log(error, '-->error', error.response, 'response', error.request);
        toastMessage({
          type: 'error',
          message: 'Error resetting password',
        });
      }
    }
  },
  updateProfile: async (payload) => {
    try {
      const res = await apiCall(`profile`, 'put', payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  triggerSMSResendForTransactions: async (payload) => {
    try {
      const res = await apiCall(`send-sms`, 'post', payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  retryTransaction: async (payload) => {
    try {
      const res = await apiCall(`disbursements/transactions/retry`, 'post', payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  requeryTransaction: async (payload) => {
    try {
      const res = await apiCall(`disbursements/transactions/requery`, 'post', payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getAllAuditLogs: async (period, s, page) => {
    try {
      const res = await apiCall(`audit-logs?period=${period}&s=${s}&page=${page}`, 'get');
      return res;
    } catch (error) {
      throw error;
    }
  },

  getAllResponseLogs: async (payload) => {
    try {
      const res = await apiCall(`logs/webhook-response`, 'get', {}, {}, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUploadErrorLogs: async (payload) => {
    try {
      const res = await apiCall(`logs/upload-errors`, 'get', {}, {}, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getUserActivity: async () => {
    try {
      const res = await apiCall(`profile/activity`, 'get');
      return res;
    } catch (error) {
      throw error;
    }
  },

  addDisbursementFunding: async (payload) => {
    try {
      const res = await apiCall(`funds`, 'post', payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  authenticatePassword: async (password) => {
    try {
      const res = await apiCall(`auth/confirm-password`, 'post', { password });
      return res;
    } catch (error) {
      throw error;
    }
  },

  addFundingBand: async (body = {}) => {
    try {
      const res = await apiCall(`bands`, 'post', { ...body });
      return res;
    } catch (error) {
      throw error;
    }
  },

  fetchAllProgrammes: async (params = {}) => {
    try {
      const res = await apiCall(`programmes`, 'get', {}, {}, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  fetchUserProgrammes: async (params = {}) => {
    try {
      const res = await apiCall(`users/programmes`, 'get', {}, {}, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  fetchAllBands: async (params = {}) => {
    try {
      const res = await apiCall(`bands`, 'get', {}, {}, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (payload = {}) => {
    try {
      const res = await apiCall(`users/change-password`, 'patch', payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
