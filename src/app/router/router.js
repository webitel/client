import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@webitel/ui-sdk/src/modules/Userinfo/components/the-auth.vue';
import RouteNames from './_internals/RouteNames.enum';

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap');
const Home = () => import('../../modules/_unused/home/components/the-home');
const StartPage = () => import('../../modules/start-page/components/the-start-page');
const Settings = () => import('../../modules/settings/components/the-settings');
const AccessDenied = () => import('../../modules/error-pages/components/the-access-denied-component');
const NotFound = () => import('../../modules/error-pages/components/the-not-found-component');
const PermissionsRoles = () => import('../../modules/permissions/modules/roles/components/the-roles');
const OpenedPermissionsRoles = () => import('../../modules/permissions/modules/roles/components/opened-role');
const PermissionsObjects = () => import('../../modules/permissions/modules/objects/components/the-objects-permissions');
const OpenedPermissionsObjects = () => import('../../modules/permissions/modules/objects/components/opened-object-permissions');
const Devices = () => import('../../modules/directory/modules/devices/components/the-devices');
const OpenedDevice = () => import('../../modules/directory/modules/devices/components/opened-device');
const Users = () => import('../../modules/directory/modules/users/components/the-users');
const OpenedUser = () => import('../../modules/directory/modules/users/components/opened-user');
const License = () => import('../../modules/directory/modules/license/components/the-license');
const Blacklists = () => import('../../modules/lookups/modules/blacklists/components/the-blacklists');
const Media = () => import('../../modules/lookups/modules/media/components/the-media');
const OpenedBlacklist = () => import('../../modules/lookups/modules/blacklists/components/opened-blacklist');
const Calendars = () => import('../../modules/lookups/modules/calendars/components/the-calendars');
const OpenedCalendar = () => import('../../modules/lookups/modules/calendars/components/opened-calendar');
const CommunicationTypes = () => import('../../modules/lookups/modules/communications/components/the-communication-types');
const OpenedCommunicationType = () => import('../../modules/lookups/modules/communications/components/opened-communication-type');
const Regions = () => import('../../modules/lookups/modules/regions/components/the-regions');
const OpenedRegion = () => import('../../modules/lookups/modules/regions/components/opened-region');
const AgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/the-agent-pause-cause');
const OpenedAgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/opened-agent-pause-cause');
const SipGateways = () => import('../../modules/routing/modules/gateways/components/the-sip-gateways');
const OpenedGateway = () => import('../../modules/routing/modules/gateways/components/opened-sip-gateway');
const ChatGateways = () => import('../../modules/routing/modules/chat-gateways/components/the-chat-gateways');
const ChatTelegram = () => import('../../modules/routing/modules/chat-gateways/components/chat-telegram');
const Flow = () => import('../../modules/routing/modules/flow/components/the-flow');
const OpenedFlow = () => import('../../modules/routing/modules/flow/components/opened-flow');
const Dialplan = () => import('../../modules/routing/modules/dialplan/components/the-dialplan');
const OpenedDialplan = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan');
const TheResources = () => import('../../modules/contact-center/modules/resources/components/the-resources');
const OpenedResource = () => import('../../modules/contact-center/modules/resources/components/opened-resource');
const ResourceGroups = () => import('../../modules/contact-center/modules/resource-groups/components/the-resource-groups');
const OpenedResourceGroup = () => import('../../modules/contact-center/modules/resource-groups/components/opened-resource-group');
const Agents = () => import('../../modules/contact-center/modules/agents/components/the-agents');
const OpenedAgent = () => import('../../modules/contact-center/modules/agents/components/opened-agent');
const Teams = () => import('../../modules/contact-center/modules/teams/components/the-teams');
const OpenedTeam = () => import('../../modules/contact-center/modules/teams/components/opened-team');
const AgentSkills = () => import('../../modules/lookups/modules/agent-skills/components/the-agent-skills');
const OpenedAgentSkill = () => import('../../modules/lookups/modules/agent-skills/components/opened-agent-skill');
const Buckets = () => import('../../modules/lookups/modules/buckets/components/the-buckets');
const OpenedBucket = () => import('../../modules/lookups/modules/buckets/components/opened-bucket');
const Queues = () => import('../../modules/contact-center/modules/queues/components/the-queues');
const Members = () => import('../../modules/contact-center/modules/queues/modules/members/components/the-queue-members');
const OpenedMember = () => import('../../modules/contact-center/modules/queues/modules/members/components/opened-queue-member');
const OpenedQueue = () => import('../../modules/contact-center/modules/queues/components/opened-queue');
const Storage = () => import('../../modules/integrations/modules/storage/components/the-storage');
const OpenedStorage = () => import('../../modules/integrations/modules/storage/components/opened-storage');


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
      component: Auth,
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
      component: ModuleWrap,
      children: [
        {
          path: '/admin',
          name: RouteNames.HOME,
          component: Home,
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
          component: Settings,
        },

        // ----------DIRECTORY------------
        {
          path: '/directory/devices',
          name: RouteNames.DEVICES,
          component: Devices,
        },
        {
          path: '/directory/devices/:id',
          name: `${RouteNames.DEVICES}-edit`,
          component: OpenedDevice,
        },
        {
          path: '/directory/devices/new',
          name: `${RouteNames.DEVICES}-new`,
          component: OpenedDevice,
        },
        {
          path: '/directory/devices/hotdesk/:id',
          name: `${RouteNames.DEVICES}-hotdesk-edit`,
          component: OpenedDevice,
        },
        {
          path: '/directory/devices/hotdesk/new',
          name: `${RouteNames.DEVICES}-hotdesk-new`,
          component: OpenedDevice,
        },
        {
          path: '/directory/license',
          name: RouteNames.LICENSE,
          component: License,
        },
        {
          path: '/directory/users',
          name: RouteNames.USERS,
          component: Users,
        },
        {
          path: '/directory/users/:id',
          name: `${RouteNames.USERS}-edit`,
          component: OpenedUser,
        },
        {
          path: '/directory/users/new',
          name: `${RouteNames.USERS}-new`,
          component: OpenedUser,
        },
        // ----------DIRECTORY END------------


        // ----------ROUTING------------
        {
          path: '/routing/flow',
          name: RouteNames.FLOW,
          component: Flow,
        },
        {
          path: '/routing/flow/new',
          name: `${RouteNames.FLOW}-new`,
          component: OpenedFlow,
        },
        {
          path: '/routing/flow/:id',
          name: `${RouteNames.FLOW}-edit`,
          component: OpenedFlow,
        },
        {
          path: '/routing/dialplan',
          name: RouteNames.DIALPLAN,
          component: Dialplan,
        },
        {
          path: '/routing/dialplan/new',
          name: `${RouteNames.DIALPLAN}-new`,
          component: OpenedDialplan,
        },
        {
          path: '/routing/dialplan/:id',
          name: `${RouteNames.DIALPLAN}-edit`,
          component: OpenedDialplan,
        },
        {
          path: '/routing/gateways',
          name: RouteNames.GATEWAYS,
          component: SipGateways,
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
        {
          path: '/routing/chat-gateways',
          name: RouteNames.CHAT_GATEWAYS,
          component: ChatGateways,
        },
        {
          path: '/routing/chat-gateways/register/new-telegram',
          name: `${RouteNames.CHAT_GATEWAYS}-reg-new-telegram`,
          component: ChatTelegram,
        },
        // ----------ROUTING END------------


        // ----------LOOKUPS------------
        {
          path: '/lookups/skills',
          name: RouteNames.SKILLS,
          component: AgentSkills,
        },
        {
          path: '/lookups/skills/new',
          name: `${RouteNames.SKILLS}-new`,
          component: OpenedAgentSkill,
        },
        {
          path: '/lookups/skills/:id',
          name: `${RouteNames.SKILLS}-edit`,
          component: OpenedAgentSkill,
        },
        {
          path: '/lookups/buckets',
          name: RouteNames.BUCKETS,
          component: Buckets,
        },
        {
          path: '/lookups/buckets/new',
          name: `${RouteNames.BUCKETS}-new`,
          component: OpenedBucket,
        },
        {
          path: '/lookups/bucket/:id',
          name: `${RouteNames.BUCKETS}-edit`,
          component: OpenedBucket,
        },
        {
          path: '/lookups/blacklist',
          name: RouteNames.BLACKLIST,
          component: Blacklists,
        },
        {
          path: '/lookups/blacklist/new',
          name: `${RouteNames.BLACKLIST}-new`,
          component: OpenedBlacklist,
        },
        {
          path: '/lookups/blacklist/:id',
          name: `${RouteNames.BLACKLIST}-edit`,
          component: OpenedBlacklist,
        },
        {
          path: '/lookups/media',
          name: RouteNames.MEDIA,
          component: Media,
        },
        {
          path: '/lookups/calendars',
          name: RouteNames.CALENDARS,
          component: Calendars,
        },
        {
          path: '/lookups/calendars/new',
          name: `${RouteNames.CALENDARS}-new`,
          component: OpenedCalendar,
        },
        {
          path: '/lookups/calendars/:id',
          name: `${RouteNames.CALENDARS}-edit`,
          component: OpenedCalendar,
        },

        {
          path: '/lookups/communications',
          name: RouteNames.COMMUNICATIONS,
          component: CommunicationTypes,
        },
        {
          path: '/lookups/communications/new',
          name: `${RouteNames.COMMUNICATIONS}-new`,
          component: OpenedCommunicationType,
        },
        {
          path: '/lookups/communications/:id',
          name: `${RouteNames.COMMUNICATIONS}-edit`,
          component: OpenedCommunicationType,
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
          component: Agents,
        },
        {
          path: '/contact-center/agents/new',
          name: `${RouteNames.AGENTS}-new`,
          component: OpenedAgent,
        },
        {
          path: '/contact-center/agents/:id',
          name: `${RouteNames.AGENTS}-edit`,
          component: OpenedAgent,
        },
        {
          path: '/contact-center/teams',
          name: RouteNames.TEAMS,
          component: Teams,
        },
        {
          path: '/contact-center/teams/new',
          name: `${RouteNames.TEAMS}-new`,
          component: OpenedTeam,
        },
        {
          path: '/contact-center/teams/:id',
          name: `${RouteNames.TEAMS}-edit`,
          component: OpenedTeam,
        },
        {
          path: '/contact-center/resources',
          name: RouteNames.RESOURCES,
          component: TheResources,
        },
        {
          path: '/contact-center/resources/new',
          name: `${RouteNames.RESOURCES}-new`,
          component: OpenedResource,
        },
        {
          path: '/contact-center/resources/:id',
          name: `${RouteNames.RESOURCES}-edit`,
          component: OpenedResource,
        },
        {
          path: '/contact-center/resource-groups',
          name: RouteNames.RESOURCE_GROUPS,
          component: ResourceGroups,
        },
        {
          path: '/contact-center/resource-groups/new',
          name: `${RouteNames.RESOURCE_GROUPS}-new`,
          component: OpenedResourceGroup,
        },
        {
          path: '/contact-center/resource-groups/:id',
          name: `${RouteNames.RESOURCE_GROUPS}-edit`,
          component: OpenedResourceGroup,
        },
        {
          path: '/contact-center/queues',
          name: RouteNames.QUEUES,
          component: Queues,
        },
        {
          path: '/contact-center/queues/:queueId/members',
          name: RouteNames.MEMBERS,
          component: Members,
        },
        {
          path: '/contact-center/queues/:queueId/members/new',
          name: `${RouteNames.MEMBERS}-new`,
          component: OpenedMember,
        },
        {
          path: '/contact-center/queues/:queueId/members/:id',
          name: `${RouteNames.MEMBERS}-edit`,
          component: OpenedMember,
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
          component: Storage,
        },
        {
          path: '/integrations/storage/:type/new',
          name: `${RouteNames.STORAGE}-new`,
          component: OpenedStorage,
        },
        {
          path: '/integrations/storage/:type/:id',
          name: `${RouteNames.STORAGE}-edit`,
          component: OpenedStorage,
        },
        // --------------INTEGRATIONS END-------------


        // ----------PERMISSIONS-----------------
        {
          path: '/permissions/roles',
          name: RouteNames.ROLES,
          component: PermissionsRoles,
        },
        {
          path: '/permissions/roles/:id',
          name: `${RouteNames.ROLES}-edit`,
          component: OpenedPermissionsRoles,
        },
        {
          path: '/permissions/roles/new',
          name: `${RouteNames.ROLES}-new`,
          component: OpenedPermissionsRoles,
        },
        {
          path: '/permissions/objects',
          name: RouteNames.OBJECTS,
          component: PermissionsObjects,
        },
        {
          path: '/permissions/objects/:id',
          name: `${RouteNames.OBJECTS}-edit`,
          component: OpenedPermissionsObjects,
        },
        // ----------PERMISSIONS END-----------------
      ],
    },
    {
      path: '*',
      name: RouteNames.PAGE_404,
      component: NotFound,
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
