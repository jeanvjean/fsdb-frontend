import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  transactionsDataRep: [],
  transactionsDataRepMeta: {},
  transactionsDataAdmin: [],
  transactionsDataAdminMeta: {},
  allTransactions: [],
  allTransactionsMeta: {},
  loadingAllTransactions: false,
  errorAllTransactions: false,
  meta: false,
  loading: false,
  error: false,
  processing: false,
  approving: false,
  resolving: false,
};

const smsTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionNames(Types.GET_ALL_TRANSACTIONS).loading: {
      return {
        ...state,
        loadingAllTransactions: true,
      };
    }
    case asyncActionNames(Types.GET_ALL_TRANSACTIONS).success: {
      return {
        ...state,
        loadingAllTransactions: false,
        allTransactions: action.payload.data,
        allTransactionsMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_ALL_TRANSACTIONS).failure: {
      return {
        ...state,
        loadingAllTransactions: false,
        allTransactions: [],
        errorAllTransactions: true,
      };
    }

    case asyncActionNames(Types.GET_ALL_TRANSACTIONS).request: {
      return {
        ...state,
        allTransactions: [],
      };
    }    

    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_REP).loading: {
      return {
        ...state,
        loading: true,
      };
    }
    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_REP).success: {
      return {
        ...state,
        loading: false,
        transactionsDataRep: action.payload.data,
        transactionsDataRepMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_REP).failure: {
      return {
        ...state,
        loading: false,
        transactionsDataRep: [],
        error: true,
      };
    }


    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_REP).request: {
      return {
        ...state,
        transactionsDataRep: [],
      };
    }       

    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_ADMIN).loading: {
      return {
        ...state,
        loading: true,
      };
    }
    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_ADMIN).success: {
      return {
        ...state,
        loading: false,
        transactionsDataAdmin: action.payload.data,
        transactionsDataAdminMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_ADMIN).failure: {
      return {
        ...state,
        loading: false,
        transactionsDataAdmin: [],
        error: true,
      };
    }

    case asyncActionNames(Types.GET_SMS_TRANSACTIONS_ADMIN).request: {
      return {
        ...state,
        transactionsDataAdmin: [],
      };
    }    

    case asyncActionNames(Types.APPROVE_SMS_TRANSACTIONS).loading: {
      return {
        ...state,
        approving: true,
      };
    }

    case asyncActionNames(Types.APPROVE_SMS_TRANSACTIONS).success: {
      let idExist;
      const transactions = state.transactionsDataAdmin.map((trxn) => {
        idExist = action.payload?.data?.find((tx) => tx.transaction_id === trxn.id);
        if (idExist && idExist.success) {
          trxn.status = 'approved';
        }
        if (idExist && !idExist.success) {
          trxn.status = 'process_for_approval';
        }
        return trxn;
      });
      return {
        ...state,
        approving: false,
        transactionsDataRep: transactions,
        transactionsDataAdmin: transactions,
      };
    }

    case asyncActionNames(Types.APPROVE_SMS_TRANSACTIONS).failure: {
      return {
        ...state,
        approving: false,
        error: action.payload?.error?.message,
      };
    }

    case asyncActionNames(Types.APPROVE_SMS_TRANSACTIONS).request: {
      return {
        ...state,
        transactionsDataRep: [],
        transactionsDataAdmin: [],
      };
    }    

    case asyncActionNames(Types.PROCESS_SMS_TRANSACTIONS).loading:
      return { ...state, processing: true, error: false };
    case asyncActionNames(Types.PROCESS_SMS_TRANSACTIONS).success: {
      let idExist;
      const transactions = state.transactionsDataRep.map((trxn) => {
        idExist = action.payload?.data?.find((tx) => tx.transaction_id === trxn.id);
        if (idExist && idExist.success) {
          trxn.status = 'process_for_approval';
        }
        if (idExist && !idExist.success) {
          trxn.status = 'resolved';
        }
        return trxn;
      });
      return {
        ...state,
        processing: false,
        transactionsDataRep: transactions,
        transactionsDataAdmin: transactions,
      };
    }
    case asyncActionNames(Types.PROCESS_SMS_TRANSACTIONS).failure: {
      return { ...state, error: action.payload?.error?.message, processing: false };
    }

    case asyncActionNames(Types.RESOLVE_SMS_TRANSACTIONS).loading:
      return { ...state, resolving: true, error: false };
    case asyncActionNames(Types.RESOLVE_SMS_TRANSACTIONS).success: {
      let idExist;
      const transactions = state.transactionsDataRep.map((trxn) => {
        idExist = action.payload?.data?.find((tx) => tx.transaction_id === trxn.id);
        if (idExist && idExist.success) {
          trxn.status = 'resolved';
        }
        if (idExist && !idExist.success) {
          trxn.status = 'not_resolved';
        }
        return trxn;
      });
      return {
        ...state,
        resolving: false,
        transactionsDataRep: transactions,
        transactionsDataAdmin: transactions,
      };
    }
    case asyncActionNames(Types.RESOLVE_SMS_TRANSACTIONS).failure: {
      return { ...state, error: action.payload?.error?.message, resolving: false };
    }

    default:
      return state;
  }
};

export default smsTransactionReducer;
