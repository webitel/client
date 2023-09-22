import { AgentStatus } from 'webitel-sdk';
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

/**
 * Status to filter
 * @enum
 * @readonly
 */
const LogsStatusOptions = Object.freeze([
  {
    value: 'create',
    locale: `objects.agent.status.create`,
  },
  {
    value: 'update',
    locale: `objects.agent.status.update`,
  },
  {
    value: 'delete',
    locale: `objects.agent.status.delete`,
  },

]);

export default LogsStatusOptions;
