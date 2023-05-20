import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  loggedInUser: null,
  loginLoading: false,
  loginError: false,
  activatingUser: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN USER
    case asyncActionNames(Types.LOGIN).loading: {
      return {
        ...state,
        loginLoading: true,
      };
    }
    case asyncActionNames(Types.LOGIN).success: {
      return {
        ...state,
        loginLoading: false,
        loggedInUser: action.payload.data,
      };
    }

    case asyncActionNames(Types.LOGIN).failure: {
      return {
        ...state,
        loginLoading: false,
        loggedInUser: null,
        loginError: true,
      };
    }

    case asyncActionNames(Types.LOGOUT).loading: {
      return {
        ...state,
        logoutLoading: true,
      };
    }
    case asyncActionNames(Types.LOGOUT).success: {
      return {
        ...state,
        logoutLoading: false,
        loggedInUser: null,
      };
    }

    case asyncActionNames(Types.DE_ACTIVATE_USER).failure: {
      return {
        ...state,
        activatingUser: false,
      };
    }

    case asyncActionNames(Types.DE_ACTIVATE_USER).loading: {
      return {
        ...state,
        activatingUser: true,
      };
    }
    case asyncActionNames(Types.DE_ACTIVATE_USER).success: {
      return {
        ...state,
        activatingUser: false,
      };
    }
    

    case asyncActionNames(Types.ACTIVATE_USER).failure: {
      return {
        ...state,
        activatingUser: false,
      };
    }

    case asyncActionNames(Types.ACTIVATE_USER).loading: {
      return {
        ...state,
        activatingUser: true,
      };
    }
    case asyncActionNames(Types.ACTIVATE_USER).success: {
      return {
        ...state,
        activatingUser: false,
      };
    }       

    default:
      return state;
  }
};

export default authReducer;
