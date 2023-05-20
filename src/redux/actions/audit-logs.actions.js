import { asyncRequest } from '../../api';
import * as Types from '../types/index.js';

export const exportAuditLogsAction = (payload) => asyncRequest(Types.EXPORT_AUDIT_LOGS, 'audit-logs/export', 'post', payload);
