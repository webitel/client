import Vue from 'vue';
import Router from 'vue-router';
import auth from '@webitel/ui-sdk/src/modules/Userinfo/components/the-auth.vue';
import RouteNames from './_internals/RouteNames.enum';

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const moduleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap');
const home = () => import('../../modules/_unused/home/components/the-home');
const StartPage = () => import('../../modules/start-page/components/the-start-page');
const settings = () => import('../../modules/settings/components/the-settings');
const AccessDenied = () => import('../../modules/error-pages/components/the-access-denied-component');
const notFound = () => import('../../modules/error-pages/components/the-not-found-component');
const permissionsRoles = () => import('../../modules/permissions/modules/roles/components/the-roles');
const openedPermissionsRoles = () => import('../../modules/permissions/modules/roles/components/opened-role');
const permissionsObjects = () => import('../../modules/permissions/modules/objects/components/the-objects-permissions');
const openedPermissionsObjects = () => import('../../modules/permissions/modules/objects/components/opened-object-permissions');
const devices = () => import('../../modules/directory/modules/devices/components/the-devices');
const openedDevice = () => import('../../modules/directory/modules/devices/components/opened-device');
const users = () => import('../../modules/directory/modules/users/components/the-users');
const openedUser = () => import('../../modules/directory/modules/users/components/opened-user');
const license = () => import('../../modules/directory/modules/license/components/the-license');
const blacklists = () => import('../../modules/lookups/modules/blacklists/components/the-blacklists');
const media = () => import('../../modules/lookups/modules/media/components/the-media');
const openedBlacklist = () => import('../../modules/lookups/modules/blacklists/components/opened-blacklist');
const calendars = () => import('../../modules/lookups/modules/calendars/components/the-calendars');
const openedCalendar = () => import('../../modules/lookups/modules/calendars/components/opened-calendar');
const communicationTypes = () => import('../../modules/lookups/modules/communications/components/the-communication-types');
const openedCommunicationType = () => import('../../modules/lookups/modules/communications/components/opened-communication-type');
const Regions = () => import('../../modules/lookups/modules/regions/components/the-regions');
const OpenedRegion = () => import('../../modules/lookups/modules/regions/components/opened-region');
const AgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/the-agent-pause-cause');
const OpenedAgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/opened-agent-pause-cause');
const sipGateways = () => import('../../modules/routing/modules/gateways/components/the-sip-gateways');
const OpenedGateway = () => import('../../modules/routing/modules/gateways/components/opened-sip-gateway');
const flow = () => import('../../modules/routing/modules/flow/components/the-flow');
const openedFlow = () => import('../../modules/routing/modules/flow/components/opened-flow');
const dialplan = () => import('../../modules/routing/modules/dialplan/components/the-dialplan');
const openedDialplan = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan');
const theResources = () => import('../../modules/contact-center/modules/resources/components/the-resources');
const openedResource = () => import('../../modules/contact-center/modules/resources/components/opened-resource');
const resourceGroups = () => import('../../modules/contact-center/modules/resource-groups/components/the-resource-groups');
const openedResourceGroup = () => import('../../modules/contact-center/modules/resource-groups/components/opened-resource-group');
const agents = () => import('../../modules/contact-center/modules/agents/components/the-agents');
const openedAgent = () => import('../../modules/contact-center/modules/agents/components/opened-agent');
const teams = () => import('../../modules/contact-center/modules/teams/components/the-teams');
const openedTeam = () => import('../../modules/contact-center/modules/teams/components/opened-team');
const agentSkills = () => import('../../modules/lookups/modules/agent-skills/components/the-agent-skills');
const openedAgentSkill = () => import('../../modules/lookups/modules/agent-skills/components/opened-agent-skill');
const buckets = () => import('../../modules/lookups/modules/buckets/components/the-buckets');
const openedBucket = () => import('../../modules/lookups/modules/buckets/components/opened-bucket');
const queues = () => import('../../modules/contact-center/modules/queues/components/the-queues');
const members = () => import('../../modules/contact-center/modules/queues/modules/members/components/the-queue-members');
const openedMember = () => import('../../modules/contact-center/modules/queues/modules/members/components/opened-queue-member');
const OpenedQueue = () => import('../../modules/contact-center/modules/queues/components/opened-queue');
const storage = () => import('../../modules/integrations/modules/storage/components/the-storage');
const openedStorage = () => import('../../modules/integrations/modules/storage/components/opened-storage');


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/auth',
      name: RouteNames.AUTH,
      component: auth,
    },
    {
      path: '/',
      name: RouteNames.APPLICATION_HUB,
      component: ApplicationHub,
    },
    {
      path: '/access-denied',
      name: RouteNames.PAGE_403,
      component: AccessDenied,
    },
    {
      path: '/admin',
      component: moduleWrap,
      children: [
        {
          path: '/admin',
          name: RouteNames.HOME,
          component: home,
          redirect: '/start',
        },
        {
          path: '/start',
          name: RouteNames.START,
          component: StartPage,
        },
        {
          path: '/settings',
          name: RouteNames.SETTINGS_PAGE,
          component: settings,
        },

        // ----------DIRECTORY------------
        {
          path: '/directory/devices',
          name: RouteNames.DEVICES,
          component: devices,
        },
        {
          path: '/directory/devices/:id',
          name: `${RouteNames.DEVICES}-edit`,
          component: openedDevice,
        },
        {
          path: '/directory/devices/new',
          name: `${RouteNames.DEVICES}-new`,
          component: openedDevice,
        },
        {
          path: '/directory/devices/hotdesk/:id',
          name: `${RouteNames.DEVICES}-hotdesk-edit`,
          component: openedDevice,
        },
        {
          path: '/directory/devices/hotdesk/new',
          name: `${RouteNames.DEVICES}-hotdesk-new`,
          component: openedDevice,
        },
        {
          path: '/directory/license',
          name: RouteNames.LICENSE,
          component: license,
        },
        {
          path: '/directory/users',
          name: RouteNames.USERS,
          component: users,
        },
        {
          path: '/directory/users/:id',
          name: `${RouteNames.USERS}-edit`,
          component: openedUser,
        },
        {
          path: '/directory/users/new',
          name: `${RouteNames.USERS}-new`,
          component: openedUser,
        },
        // ----------DIRECTORY END------------


        // ----------ROUTING------------
        {
          path: '/routing/flow',
          name: RouteNames.FLOW,
          component: flow,
        },
        {
          path: '/routing/flow/new',
          name: `${RouteNames.FLOW}-new`,
          component: openedFlow,
        },
        {
          path: '/routing/flow/:id',
          name: `${RouteNames.FLOW}-edit`,
          component: openedFlow,
        },
        {
          path: '/routing/dialplan',
          name: RouteNames.DIALPLAN,
          component: dialplan,
        },
        {
          path: '/routing/dialplan/new',
          name: `${RouteNames.DIALPLAN}-new`,
          component: openedDialplan,
        },
        {
          path: '/routing/dialplan/:id',
          name: `${RouteNames.DIALPLAN}-edit`,
          component: openedDialplan,
        },
        {
          path: '/routing/gateways',
          name: RouteNames.GATEWAYS,
          component: sipGateways,
        },
        {
          path: '/routing/gateways/register/new',
          name: `${RouteNames.GATEWAYS}-reg-new`,
          component: OpenedGateway,
        },
        {
          path: '/routing/gateways/register/:id',
          name: `${RouteNames.GATEWAYS}-reg-edit`,
          component: OpenedGateway,
        },
        {
          path: '/routing/gateways/trunking/new',
          name: `${RouteNames.GATEWAYS}-trunk-new`,
          component: OpenedGateway,
        },
        {
          path: '/routing/gateways/trunking/:id',
          name: `${RouteNames.GATEWAYS}-trunk-edit`,
          component: OpenedGateway,
        },
        // ----------ROUTING END------------


        // ----------LOOKUPS------------
        {
          path: '/lookups/skills',
          name: RouteNames.SKILLS,
          component: agentSkills,
        },
        {
          path: '/lookups/skills/new',
          name: `${RouteNames.SKILLS}-new`,
          component: openedAgentSkill,
        },
        {
          path: '/lookups/skills/:id',
          name: `${RouteNames.SKILLS}-edit`,
          component: openedAgentSkill,
        },
        {
          path: '/lookups/buckets',
          name: RouteNames.BUCKETS,
          component: buckets,
        },
        {
          path: '/lookups/buckets/new',
          name: `${RouteNames.BUCKETS}-new`,
          component: openedBucket,
        },
        {
          path: '/lookups/bucket/:id',
          name: `${RouteNames.BUCKETS}-edit`,
          component: openedBucket,
        },
        {
          path: '/lookups/blacklist',
          name: RouteNames.BLACKLIST,
          component: blacklists,
        },
        {
          path: '/lookups/blacklist/new',
          name: `${RouteNames.BLACKLIST}-new`,
          component: openedBlacklist,
        },
        {
          path: '/lookups/blacklist/:id',
          name: `${RouteNames.BLACKLIST}-edit`,
          component: openedBlacklist,
        },
        {
          path: '/lookups/media',
          name: RouteNames.MEDIA,
          component: media,
        },
        {
          path: '/lookups/calendars',
          name: RouteNames.CALENDARS,
          component: calendars,
        },
        {
          path: '/lookups/calendars/new',
          name: `${RouteNames.CALENDARS}-new`,
          component: openedCalendar,
        },
        {
          path: '/lookups/calendars/:id',
          name: `${RouteNames.CALENDARS}-edit`,
          component: openedCalendar,
        },

        {
          path: '/lookups/communications',
          name: RouteNames.COMMUNICATIONS,
          component: communicationTypes,
        },
        {
          path: '/lookups/communications/new',
          name: `${RouteNames.COMMUNICATIONS}-new`,
          component: openedCommunicationType,
        },
        {
          path: '/lookups/communications/:id',
          name: `${RouteNames.COMMUNICATIONS}-edit`,
          component: openedCommunicationType,
        },

        {
          path: '/lookups/regions',
          name: RouteNames.REGIONS,
          component: Regions,
        },
        {
          path: '/lookups/regions/new',
          name: `${RouteNames.REGIONS}-new`,
          component: OpenedRegion,
        },
        {
          path: '/lookups/regions/:id',
          name: `${RouteNames.REGIONS}-edit`,
          component: OpenedRegion,
        },

        {
          path: '/lookups/pause-cause',
          name: RouteNames.PAUSE_CAUSE,
          component: AgentPauseCause,
        },
        {
          path: '/lookups/pause-cause/new',
          name: `${RouteNames.PAUSE_CAUSE}-new`,
          component: OpenedAgentPauseCause,
        },
        {
          path: '/lookups/pause-cause/:id',
          name: `${RouteNames.PAUSE_CAUSE}-edit`,
          component: OpenedAgentPauseCause,
        },
        // ----------LOOKUPS END------------


        // --------------CONTACT CENTER-------------
        {
          path: '/contact-center/agents',
          name: RouteNames.AGENTS,
          component: agents,
        },
        {
          path: '/contact-center/agents/new',
          name: `${RouteNames.AGENTS}-new`,
          component: openedAgent,
        },
        {
          path: '/contact-center/agents/:id',
          name: `${RouteNames.AGENTS}-edit`,
          component: openedAgent,
        },
        {
          path: '/contact-center/teams',
          name: RouteNames.TEAMS,
          component: teams,
        },
        {
          path: '/contact-center/teams/new',
          name: `${RouteNames.TEAMS}-new`,
          component: openedTeam,
        },
        {
          path: '/contact-center/teams/:id',
          name: `${RouteNames.TEAMS}-edit`,
          component: openedTeam,
        },
        {
          path: '/contact-center/resources',
          name: RouteNames.RESOURCES,
          component: theResources,
        },
        {
          path: '/contact-center/resources/new',
          name: `${RouteNames.RESOURCES}-new`,
          component: openedResource,
        },
        {
          path: '/contact-center/resources/:id',
          name: `${RouteNames.RESOURCES}-edit`,
          component: openedResource,
        },
        {
          path: '/contact-center/resource-groups',
          name: RouteNames.RESOURCE_GROUPS,
          component: resourceGroups,
        },
        {
          path: '/contact-center/resource-groups/new',
          name: `${RouteNames.RESOURCE_GROUPS}-new`,
          component: openedResourceGroup,
        },
        {
          path: '/contact-center/resource-groups/:id',
          name: `${RouteNames.RESOURCE_GROUPS}-edit`,
          component: openedResourceGroup,
        },
        {
          path: '/contact-center/queues',
          name: RouteNames.QUEUES,
          component: queues,
        },
        {
          path: '/contact-center/queues/:queueId/members',
          name: RouteNames.MEMBERS,
          component: members,
        },
        {
          path: '/contact-center/queues/:queueId/members/new',
          name: `${RouteNames.MEMBERS}-new`,
          component: openedMember,
        },
        {
          path: '/contact-center/queues/:queueId/members/:id',
          name: `${RouteNames.MEMBERS}-edit`,
          component: openedMember,
        },
        {
          path: '/contact-center/queues/outbound-ivr/new',
          name: `${RouteNames.QUEUES}-outbound-ivr-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/outbound-ivr/:id',
          name: `${RouteNames.QUEUES}-outbound-ivr-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/inbound-queue/new',
          name: `${RouteNames.QUEUES}-inbound-queue-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/inbound-queue/:id',
          name: `${RouteNames.QUEUES}-inbound-queue-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/offline-queue/new',
          name: `${RouteNames.QUEUES}-offline-queue-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/offline-queue/:id',
          name: `${RouteNames.QUEUES}-offline-queue-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/preview-dialer/new',
          name: `${RouteNames.QUEUES}-preview-dialer-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/preview-dialer/:id',
          name: `${RouteNames.QUEUES}-preview-dialer-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/progressive-dialer/new',
          name: `${RouteNames.QUEUES}-progressive-dialer-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/progressive-dialer/:id',
          name: `${RouteNames.QUEUES}-progressive-dialer-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/predictive-dialer/new',
          name: `${RouteNames.QUEUES}-predictive-dialer-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/predictive-dialer/:id',
          name: `${RouteNames.QUEUES}-predictive-dialer-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/chat-inbound-queue/new',
          name: `${RouteNames.QUEUES}-chat-inbound-queue-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/chat-inbound-queue/:id',
          name: `${RouteNames.QUEUES}-chat-inbound-queue-edit`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/task-queue/new',
          name: `${RouteNames.QUEUES}-task-queue-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/task-queue/:id',
          name: `${RouteNames.QUEUES}-task-queue-edit`,
          component: OpenedQueue,
        },
        // --------------CONTACT CENTER END-------------


        // ----------INTEGRATIONS-----------------
        {
          path: '/integrations/storage',
          name: RouteNames.STORAGE,
          component: storage,
        },
        {
          path: '/integrations/storage/:type/new',
          name: `${RouteNames.STORAGE}-new`,
          component: openedStorage,
        },
        {
          path: '/integrations/storage/:type/:id',
          name: `${RouteNames.STORAGE}-edit`,
          component: openedStorage,
        },
        // --------------INTEGRATIONS END-------------


        // ----------PERMISSIONS-----------------
        {
          path: '/permissions/roles',
          name: RouteNames.ROLES,
          component: permissionsRoles,
        },
        {
          path: '/permissions/roles/:id',
          name: `${RouteNames.ROLES}-edit`,
          component: openedPermissionsRoles,
        },
        {
          path: '/permissions/roles/new',
          name: `${RouteNames.ROLES}-new`,
          component: openedPermissionsRoles,
        },
        {
          path: '/permissions/objects',
          name: RouteNames.OBJECTS,
          component: permissionsObjects,
        },
        {
          path: '/permissions/objects/:id',
          name: `${RouteNames.OBJECTS}-edit`,
          component: openedPermissionsObjects,
        },
        // ----------PERMISSIONS END-----------------
      ],
    },
    {
      path: '*',
      name: RouteNames.PAGE_404,
      component: notFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!(to.fullPath === '/auth')) {
    if (!localStorage.getItem('access-token')) {
      next('/auth');
    }
  }
  next();
});


export default router;
