import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import auth from '../components/shared/auth/the-auth';
import RouteNames from './_internals/RouteNames.enum';

const ApplicationHub = () => import('../components/application-hub/application-hub.vue');
const moduleWrap = () => import('../components/object-utils/the-object-wrap');
const home = () => import('../components/home/the-home');
const StartPage = () => import('../components/start-page/the-start-page');
const settings = () => import('../components/shared/the-settings');
const AccessDenied = () => import('../components/utils/error-pages/the-access-denied-component');
const notFound = () => import('../components/utils/error-pages/the-not-found-component');
const permissionsRoles = () => import('../components/permissions/roles/the-roles');
const openedPermissionsRoles = () => import('../components/permissions/roles/opened-role');
const permissionsObjects = () => import('../components/permissions/objects/the-objects-permissions');
const openedPermissionsObjects = () => import('../components/permissions/objects/opened-object-permissions');
const devices = () => import('../components/directory/devices/the-devices');
const openedDevice = () => import('../components/directory/devices/opened-device');
const users = () => import('../components/directory/users/the-users');
const openedUser = () => import('../components/directory/users/opened-user');
const license = () => import('../components/directory/license/the-license');
const blacklists = () => import('../components/lookups/blacklists/the-blacklists');
const media = () => import('../components/lookups/media/the-media');
const openedBlacklist = () => import('../components/lookups/blacklists/opened-blacklist');
const calendars = () => import('../components/lookups/calendars/the-calendars');
const openedCalendar = () => import('../components/lookups/calendars/opened-calendar');
const communicationTypes = () => import('../components/lookups/communication-types/the-communication-types');
const openedCommunicationType = () => import('../components/lookups/communication-types/opened-communication-type');
const sipGateways = () => import('../components/routing/sip-gateways/the-sip-gateways');
const OpenedGateway = () => import('../components/routing/sip-gateways/opened-sip-gateway');
const flow = () => import('../components/routing/flow/the-flow');
const openedFlow = () => import('../components/routing/flow/opened-flow');
const dialplan = () => import('../components/routing/dialplan/the-dialplan');
const openedDialplan = () => import('../components/routing/dialplan/opened-dialplan');
const theResources = () => import('../components/contact-center/resources/the-resources');
const openedResource = () => import('../components/contact-center/resources/opened-resource');
const resourceGroups = () => import('../components/contact-center/resource-groups/the-resource-groups');
const openedResourceGroup = () => import('../components/contact-center/resource-groups/opened-resource-group');
const agents = () => import('../components/contact-center/agents/the-agents');
const openedAgent = () => import('../components/contact-center/agents/opened-agent');
const teams = () => import('../components/contact-center/teams/the-teams');
const openedTeam = () => import('../components/contact-center/teams/opened-team');
const agentSkills = () => import('../components/contact-center/agent-skills/the-agent-skills');
const openedAgentSkill = () => import('../components/contact-center/agent-skills/opened-agent-skill');
const buckets = () => import('../components/contact-center/buckets/the-buckets');
const openedBucket = () => import('../components/contact-center/buckets/opened-bucket');
const queues = () => import('../components/contact-center/queues/the-queues');
const members = () => import('../components/contact-center/members/the-queue-members');
const openedMember = () => import('../components/contact-center/members/opened-queue-member');
const OpenedQueue = () => import('../components/contact-center/queues/opened-queue');
const triggers = () => import('../components/integrations/triggers/the-triggers');
const openedTriggerOnEvent = () => import('../components/integrations/triggers/opened-trigger-on-event');
const openedTriggerAtTime = () => import('../components/integrations/triggers/opened-trigger-at-time');
const tokens = () => import('../components/integrations/tokens/the-tokens');
const openedToken = () => import('../components/integrations/tokens/opened-token');
const storage = () => import('../components/integrations/storage/the-storage');
const openedStorage = () => import('../components/integrations/storage/opened-storage');


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
                // ----------LOOKUPS END------------


                // --------------CONTACT CENTER-------------
                {
                    path: '/contact-center/skills',
                    name: RouteNames.SKILLS,
                    component: agentSkills,
                },
                {
                    path: '/contact-center/skills/new',
                    name: `${RouteNames.SKILLS}-new`,
                    component: openedAgentSkill,
                },
                {
                    path: '/contact-center/skills/:id',
                    name: `${RouteNames.SKILLS}-edit`,
                    component: openedAgentSkill,
                },
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
                    path: '/contact-center/buckets',
                    name: RouteNames.BUCKETS,
                    component: buckets,
                },
                {
                    path: '/contact-center/buckets/new',
                    name: `${RouteNames.BUCKETS}-new`,
                    component: openedBucket,
                },
                {
                    path: '/contact-center/bucket/:id',
                    name: `${RouteNames.BUCKETS}-edit`,
                    component: openedBucket,
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
