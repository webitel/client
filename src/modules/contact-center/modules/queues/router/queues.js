import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import QueuesRoutesName from './_internals/QueuesRoutesName.enum.js';

const Queues = () => import('../components/the-queues.vue');
const OpenedQueue = () => import('../components/opened-queue.vue');

const Agents = () => import('../modules/agents/components/opened-queue-agents.vue');
const Buckets = () => import('../modules/buckets/components/opened-queue-buckets.vue');
const Hooks = () => import('../modules/hooks/components/opened-queue-hooks.vue');
const Logs = () => import('../modules/logs/components/opened-queue-logs.vue');
const Resources = () => import('../modules/res-groups/components/opened-queue-resources.vue');
const Skills = () => import('../modules/skills/components/opened-queue-skills.vue');
const General = () => import('../components/opened-queue-general.vue');
const Params = () => import('../components/opened-queue-params.vue');
const Processing = () => import('../components/opened-queue-processing.vue');
const Amd = () => import('../components/shared/amd/opened-queue-amd.vue');
const Variables = () => import('../components/shared/variables/opened-queue-variables.vue');
const Permissions = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const Members = () => import('../modules/members/components/the-queue-members.vue');
const OpenedMember = () => import('../modules/members/components/opened-queue-member.vue');
const Communication = () => import('../modules/members/components/communications/opened-queue-member-communication.vue');
const MembersGeneral = () => import('../modules/members/components/opened-queue-member-general.vue');
const MembersVariables = () => import('../modules/members/components/opened-queue-member-variables.vue');

const QueuesRoutes = [
  {
    path: '/contact-center/queues',
    name: RouteNames.QUEUES,
    component: Queues,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'create-queue',
        meta: { createQueue: true },
        name: QueuesRoutesName.CREATE_QUEUE,
        component: Queues,
      }
    ],
  },
  {
    path: '/contact-center/queues/:id/:type',
    name: `${RouteNames.QUEUES}-card`,
    redirect: {name: QueuesRoutesName.GENERAL},
    component: OpenedQueue,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: QueuesRoutesName.GENERAL,
        component: General,
      },{
        path: 'parameters',
        name: QueuesRoutesName.PARAMETERS,
        component: Params,
      },{
        path: 'processing',
        name: QueuesRoutesName.PROCESSING,
        component: Processing,
      },{
        path: 'agents',
        name: QueuesRoutesName.AGENTS,
        component: Agents,
      },{
        path: 'skills/:skillId?',
        name: QueuesRoutesName.SKILLS,
        component: Skills,
      },{
        path: 'amd',
        name: QueuesRoutesName.AMD,
        component: Amd,
      },{
        path: 'resources',
        name: QueuesRoutesName.RESOURCES,
        component: Resources,
      },{
        path: 'buckets',
        name: QueuesRoutesName.BUCKETS,
        component: Buckets,
      },{
        path: 'hooks/:hookId?',
        name: QueuesRoutesName.HOOKS,
        component: Hooks,
      },{
        path: 'variables',
        name: QueuesRoutesName.VARIABLES,
        component: Variables,
      },{
        path: 'permissions/:permissionId?',
        name: QueuesRoutesName.PERMISSIONS,
        component: Permissions,
      },{
        path: 'logs',
        name: QueuesRoutesName.LOGS,
        component: Logs,
      }
    ],
  },
  {
    path: '/contact-center/queues/:queueId/members',
    name: RouteNames.MEMBERS,
    component: Members,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'uploadCSV',
        name: QueuesRoutesName.UPLOAD_CSV,
        meta: { uploadCSV: true },
        component: Members,
      }
    ],
  },
  {
    path: '/contact-center/queues/:queueId/members/:id',
    name: `${RouteNames.MEMBERS}-card`,
    redirect: {name: QueuesRoutesName.MEMBERS_GENERAL},
    component: OpenedMember,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: QueuesRoutesName.MEMBERS_GENERAL,
        component: MembersGeneral,
      },{
        path: 'communication-type/:communicationIndex?',
        name: QueuesRoutesName.MEMBERS_COMMUNICATION_TYPE,
        component: Communication,
      },{
        path: 'variables',
        name: QueuesRoutesName.MEMBERS_VARIABLES,
        component: MembersVariables,
      }
    ]
  },
];
export default QueuesRoutes;
