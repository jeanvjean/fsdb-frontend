import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  users: [],
  loadingSingleUser: false,
  user: {},
  meta: false,
  loading: false,
  error: false,
  errorSingleUser: false,
  aUser: {},
  loadingAUser: false,
  editUser: {},
  loadingEditUser: false,
  userMeta: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN USER
    case asyncActionNames(Types.GET_USERS).loading: {
      return {
        ...state,
        loading: true,
        userMeta: {}
      };
    }
    case asyncActionNames(Types.GET_USERS).success: {
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        userMeta: action.payload.meta,
      };
    }

    case asyncActionNames(Types.GET_USERS).failure: {
      return {
        ...state,
        loading: false,
        users: null,
        error: true,
        userMeta: {}
      };
    }


    case asyncActionNames(Types.GET_A_USER_PROFILE).loading: {
      return {
        ...state,
        editUser: true,
        aUser: {},
      };
    }

    case asyncActionNames(Types.GET_A_USER_PROFILE).success: {
      return {
        ...state,
        loadingAUser: false,
        aUser: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_A_USER_PROFILE).failure: {
      return {
        ...state,
        loadingAUser: false,
        aUser: {},
        error: true,
      };
    }
    
    case asyncActionNames(Types.EDIT_A_USER_PROFILE).loading: {
      return {
        ...state,
        loadingEditUser: true,
        aUser: {},
      };
    }

    case asyncActionNames(Types.EDIT_A_USER_PROFILE).success: {
      return {
        ...state,
        loadingEditUser: false,
        aUser: action.payload.data,
      };
    }

    case asyncActionNames(Types.EDIT_A_USER_PROFILE).failure: {
      return {
        ...state,
        loadingEditUser: false,
        aUser: {},
        error: true,
      };
    }

    case asyncActionNames(Types.DETACH_PROGRAMME).loading: {
      return {
        ...state,
        detachingProgramme: true,
      };
    }

    case asyncActionNames(Types.DETACH_PROGRAMME).success: {
      return {
        ...state,
        detachingProgramme: false,
      };
    }

    case asyncActionNames(Types.DETACH_PROGRAMME).failure: {
      return {
        ...state,
        detachingProgramme: false,
        error: true,
      };
    }       

    case asyncActionNames(Types.GET_USER).loading: {
      return {
        ...state,
        loadingSingleUser: true,
      };
    }
    case asyncActionNames(Types.GET_USER).success: {
      return {
        ...state,
        loadingSingleUser: false,
        user: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_USER).failure: {
      return {
        ...state,
        loadingSingleUser: false,
        user: null,
        errorSingleUser: true,
      };
    }

    case asyncActionNames(Types.GET_USER_PROFILE).loading: {
      return {
        ...state,
        loadingSingleUser: true,
      };
    }
    case asyncActionNames(Types.GET_USER_PROFILE).success: {
      return {
        ...state,
        loadingSingleUser: false,
        user: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_USER_PROFILE).failure: {
      return {
        ...state,
        loadingSingleUser: false,
        user: null,
        errorSingleUser: true,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
