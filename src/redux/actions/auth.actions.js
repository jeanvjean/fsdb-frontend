import { asyncRequest } from '../../api';
import * as Types from '../types';

export const loginAction = (payload) => asyncRequest(Types.LOGIN, 'auth/login', 'post', payload);
export const activateUserAction = (id) => asyncRequest(Types.ACTIVATE_USER, `/users/${id}/activate`, 'post', {});
export const deActivateUserAction = (id) => asyncRequest(Types.DE_ACTIVATE_USER, `/users/${id}/deactivate`, 'post', {});
