import { asyncActionNames } from '../../api';
import * as Types from '../types/index.js';

const initialState = {
  summary: {},
  loadingSummary: false,
  charts: {},
  loadingChart: false,
  errorSummary: false,
  errorCharts: false,
  fetchingProgrammes: false,
  programmes: [],
  creatingProgramme: false, 
  deletingProgramme: false, 
  editingProgramme: false, 
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN USER
    case asyncActionNames(Types.GET_DASHBOARD_SUMMARY).loading: {
      return {
        ...state,
        loadingSummary: true,
      };
    }
    case asyncActionNames(Types.GET_DASHBOARD_SUMMARY).success: {
      return {
        ...state,
        loadingSummary: false,
        summary: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_DASHBOARD_SUMMARY).failure: {
      return {
        ...state,
        loadingSummary: false,
        summary: null,
        errorSummary: true,
      };
    }

    case asyncActionNames(Types.GET_DASHBOARD_CHARTS_DATA).loading: {
      return {
        ...state,
        loadingChart: true,
        charts: []
      };
    }
    case asyncActionNames(Types.GET_DASHBOARD_CHARTS_DATA).success: {
      return {
        ...state,
        loadingChart: false,
        charts: action.payload.data,
      };
    }

    case asyncActionNames(Types.GET_DASHBOARD_CHARTS_DATA).failure: {
      return {
        ...state,
        loadingChart: false,
        charts: [],
        errorCharts: true,
      };
    }

    case asyncActionNames(Types.GET_PROGRAMMES).loading: {
      return {
        ...state,
        fetchingProgrammes: true,
        programmes: []
      };
    }
    case asyncActionNames(Types.GET_PROGRAMMES).success: {
      return {
        ...state,
        fetchingProgrammes: false,
        programmes: [...action.payload.data]
      };
    }

    case asyncActionNames(Types.GET_PROGRAMMES).failure: {
      return {
        ...state,
        fetchingProgrammes: false,
        programmes: []
      };
    }  
    
    case asyncActionNames(Types.CREATE_PROGRAMMES).loading: {
      return {
        ...state,
        creatingProgramme: true,
      };
    }
    case asyncActionNames(Types.CREATE_PROGRAMMES).success: {
      return {
        ...state,
        creatingProgramme: false,
      };
    }

    case asyncActionNames(Types.CREATE_PROGRAMMES).failure: {
      return {
        ...state,
        creatingProgramme: false,
      };
    }
    
    case asyncActionNames(Types.DELETE_PROGRAMME).loading: {
      return {
        ...state,
        deletingProgramme: true,
      };
    }
    case asyncActionNames(Types.DELETE_PROGRAMME).success: {
      return {
        ...state,
        deletingProgramme: false,
      };
    }

    case asyncActionNames(Types.DELETE_PROGRAMME).failure: {
      return {
        ...state,
        deletingProgramme: false,
      };
    }
    
    case asyncActionNames(Types.EDIT_PROGRAMME).loading: {
      return {
        ...state,
        editingProgramme: true,
      };
    }
    case asyncActionNames(Types.EDIT_PROGRAMME).success: {
      return {
        ...state,
        editingProgramme: false,
      };
    }

    case asyncActionNames(Types.EDIT_PROGRAMME).failure: {
      return {
        ...state,
        editingProgramme: false,
      };
    }       

    default:
      return state;
  }
};

export default dashboardReducer;
