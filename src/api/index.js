/* eslint-disable no-throw-literal */
import 'dotenv';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastMessage } from '../Components/Elements';

const composeData = (method, body, params={}) =>
  method === 'post' || method === 'put' || method === 'delete' || method === 'patch' ? { data: body } : {params};

/**
 * Returns a promise for an HTTP request
 */
export const apiCall = (url, method, body, configOptions = {}, params, data={}) => {
  const requestUrl = `${process.env.REACT_APP_BASEURL}${url}`;

  console.log({ requestUrl, url: process.env.REACT_APP_BASEURL }, 'console==>');

  axios.interceptors.request.use(
    function (options) {
      options.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
      options.timeout = 40000;
      return options;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Do something with response error
    if(error?.response?.status == 401){
      toast.error('Unauthorized')
      localStorage.removeItem('token')
    
      // window.location.reload()
      return
    }

    if(error.response.status == 500){
      toast.error(error?.response?.data?.message || 'Internal Server Error')
      return
    }

    // toast.error(error?.response?.data?.message || 'Internal Server Error')

    return Promise.reject(error);
  });

  return axios({
    method,
    url: requestUrl,
    ...composeData(method, body, params, data),
    ...configOptions,
  });
};

/**
 * Constructs async action Types
 * @param baseName {string}
 * @returns {Object}
 */
export const asyncActionNames = (baseName) => ({
  failure: `${baseName}_FAILURE`,
  loading: `${baseName}_LOADING`,
  success: `${baseName}_SUCCESS`,
  request: `${baseName}_REQUEST`,
});

/**
 * Constructs Redux thunk async actions
 * @param {string} actionName
 * @returns {Object}
 */
export const asyncActions = (actionName) => ({
  loading: (bool) => ({
    type: asyncActionNames(actionName).loading,
    payload: bool,
  }),
  failure: (bool, error) => ({
    type: asyncActionNames(actionName).failure,
    payload: { error, status: bool },
  }),
  success: (payload) => ({
    type: asyncActionNames(actionName).success,
    payload,
  }),
  request: () => ({
    type: asyncActionNames(actionName).request,
  }),  
});

let reqError = false;
/**
 * Dispatches Redux thunk Actions
 * @returns {AppThunk} - Function that dispatches Redux Actions
 * @param actionName {string}
 * @param url {string}
 * @param method {string}
 * @param body {Object}
 * @param configOptions {Object}
 * @param params {Object}
 */
export const asyncRequest = (actionName, url, method, body, configOptions, params) => async (dispatch) => {
  dispatch(asyncActions(actionName).loading(true));
  dispatch(asyncActions(actionName).request());
  try {
    const res = await apiCall(url, method, body, configOptions, params);
    dispatch(asyncActions(actionName).success(res?.data || ''));
    return res;
  } catch (err) {

    // console.log('err?.response', err?.response, err);
    if (err?.response) {
      if (err.response?.data?.message?.length > 100) {
        toastMessage({
          type: 'error',
          message: 'Server error!',
        });
        throw null;
      }
      dispatch(asyncActions(actionName).failure(true, err.response?.data || {}));
    } else if (err.request && !reqError) {
      reqError = true;
      toastMessage({
        type: 'warning',
        message: 'Connection problem!',
      });
    }
    throw err;
  }
};
