import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const getUserAction = (id) => asyncRequest(Types.GET_USER, `users/${id}`, 'get');

export const getUsersAction = (params={period:'', userType:'', s:''}) =>
  asyncRequest(Types.GET_USERS, `users`, 'get', {}, {}, params);

export const createUserAction = (payload) =>
  asyncRequest(Types.GET_USERS, 'users/invite', 'post', payload);

export const viewUserAction = (id, params) =>
  asyncRequest(Types.GET_A_USER_PROFILE, `users/${id}`, 'get', {}, {}, params);

export const editUserAction = (id, body) =>
  asyncRequest(Types.EDIT_A_USER_PROFILE, `users/${id}`, 'put', body, {});

export const detachProgrammeAction = (id, body={}) =>
  asyncRequest(Types.DETACH_PROGRAMME, `users/programmes/${id}`, 'delete', body, {});     

export const getUserProfileAction = () => asyncRequest(Types.GET_USER_PROFILE, 'profile', 'get');
