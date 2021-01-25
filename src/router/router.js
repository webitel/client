import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import auth from '../components/shared/auth/the-auth';

const ApplicationHub = () => import('../components/application-hub/application-hub.vue');
const moduleWrap = () => import('../components/object-utils/the-object-wrap');
const home = () => import('../components/home/the-home');
const settings = () => import('../components/shared/the-settings');
const notFound = () => import('../components/utils/the-not-found-component');
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
const leadStatus = () => import('../components/lookups/lead-status/the-lead-status');
const openedLeadStatus = () => import('../components/lookups/lead-status/opened-lead-status');
const leadSource = () => import('../components/lookups/lead-source/the-lead-source');
const openedLeadSource = () => import('../components/lookups/lead-source/opened-lead-source');
const communicationTypes = () => import('../components/lookups/communication-types/the-communication-types');
const openedCommunicationType = () => import('../components/lookups/communication-types/opened-communication-type');
const contactType = () => import('../components/lookups/contact-type/the-contact-type');
const openedContactType = () => import('../components/lookups/contact-type/opened-contact-type');
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
            name: 'auth',
            component: auth,
        },
        {
            path: '/',
            name: 'application-hub',
            component: ApplicationHub,
        },
        {
            path: '/admin',
            component: moduleWrap,
            children: [
                {
                    path: '/admin',
                    name: 'home',
                    component: home,
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: settings,
                },

                // ----------DIRECTORY------------
                {
                    path: '/directory/devices',
                    name: 'directory-devices',
                    component: devices,
                },
                {
                    path: '/directory/devices/:id',
                    name: 'directory-devices-edit',
                    component: openedDevice,
                },
                {
                    path: '/directory/devices/new',
                    name: 'directory-devices-new',
                    component: openedDevice,
                },
                {
                    path: '/directory/devices/hotdesk/:id',
                    name: 'directory-devices-hotdesk-edit',
                    component: openedDevice,
                },
                {
                    path: '/directory/devices/hotdesk/new',
                    name: 'directory-devices-hotdesk-new',
                    component: openedDevice,
                },
                {
                    path: '/directory/license',
                    name: 'license',
                    component: license,
                },
                {
                    path: '/directory/users',
                    name: 'directory-users',
                    component: users,
                },
                {
                    path: '/directory/users/:id',
                    name: 'directory-users-edit',
                    component: openedUser,
                },
                {
                    path: '/directory/users/new',
                    name: 'directory-users-new',
                    component: openedUser,
                },
                // ----------DIRECTORY END------------


                // ----------ROUTING------------
                {
                    path: '/routing/flow',
                    name: 'flow',
                    component: flow,
                },
                {
                    path: '/routing/flow/new',
                    name: 'flow-new',
                    component: openedFlow,
                },
                {
                    path: '/routing/flow/:id',
                    name: 'flow-edit',
                    component: openedFlow,
                },
                {
                    path: '/routing/dialplan',
                    name: 'dialplan',
                    component: dialplan,
                },
                {
                    path: '/routing/dialplan/new',
                    name: 'dialplan-new',
                    component: openedDialplan,
                },
                {
                    path: '/routing/dialplan/:id',
                    name: 'dialplan-edit',
                    component: openedDialplan,
                },
                {
                    path: '/routing/gateways',
                    name: 'sip-gateways',
                    component: sipGateways,
                },
                {
                    path: '/routing/gateways/register/new',
                    name: 'reg-gateway-new',
                    component: OpenedGateway,
                },
                {
                    path: '/routing/gateways/register/:id',
                    name: 'reg-gateway-edit',
                    component: OpenedGateway,
                },
                {
                    path: '/routing/gateways/trunking/new',
                    name: 'trunk-gateway-new',
                    component: OpenedGateway,
                },
                {
                    path: '/routing/gateways/trunking/:id',
                    name: 'trunk-gateway-edit',
                    component: OpenedGateway,
                },
                // ----------ROUTING END------------


                // ----------LOOKUPS------------
                {
                    path: '/lookups/blacklist',
                    name: 'blacklists',
                    component: blacklists,
                },
                {
                    path: '/lookups/blacklist/new',
                    name: 'blacklist-new',
                    component: openedBlacklist,
                },
                {
                    path: '/lookups/blacklist/:id',
                    name: 'blacklist-edit',
                    component: openedBlacklist,
                },
                {
                    path: '/lookups/media',
                    name: 'media',
                    component: media,
                },

                {
                    path: '/lookups/calendars',
                    name: 'calendars-lookup',
                    component: calendars,
                },
                {
                    path: '/lookups/calendars/new',
                    name: 'calendars-new',
                    component: openedCalendar,
                },
                {
                    path: '/lookups/calendars/:id',
                    name: 'calendars-edit',
                    component: openedCalendar,
                },

                {
                    path: '/lookups/communications',
                    name: 'communications-lookup',
                    component: communicationTypes,
                },
                {
                    path: '/lookups/communications/new',
                    name: 'communications-lookup-new',
                    component: openedCommunicationType,
                },
                {
                    path: '/lookups/communications/:id',
                    name: 'communications-lookup-edit',
                    component: openedCommunicationType,
                },
                // ----------LOOKUPS END------------


                // --------------CONTACT CENTER-------------
                {
                    path: '/contact-center/skills',
                    name: 'cc-skills',
                    component: agentSkills,
                },
                {
                    path: '/contact-center/skills/new',
                    name: 'cc-skill-new',
                    component: openedAgentSkill,
                },
                {
                    path: '/contact-center/skills/:id',
                    name: 'cc-skill-edit',
                    component: openedAgentSkill,
                },
                {
                    path: '/contact-center/agents',
                    name: 'cc-agents',
                    component: agents,
                },
                {
                    path: '/contact-center/agents/new',
                    name: 'cc-agent-new',
                    component: openedAgent,
                },
                {
                    path: '/contact-center/agents/:id',
                    name: 'cc-agent-edit',
                    component: openedAgent,
                },
                {
                    path: '/contact-center/teams',
                    name: 'cc-teams',
                    component: teams,
                },
                {
                    path: '/contact-center/teams/new',
                    name: 'cc-team-new',
                    component: openedTeam,
                },
                {
                    path: '/contact-center/teams/:id',
                    name: 'cc-team-edit',
                    component: openedTeam,
                },
                {
                    path: '/contact-center/resources',
                    name: 'cc-resources',
                    component: theResources,
                },
                {
                    path: '/contact-center/resources/new',
                    name: 'cc-resource-new',
                    component: openedResource,
                },
                {
                    path: '/contact-center/resources/:id',
                    name: 'cc-resource-edit',
                    component: openedResource,
                },
                {
                    path: '/contact-center/resource-groups',
                    name: 'cc-resource-groups',
                    component: resourceGroups,
                },
                {
                    path: '/contact-center/resource-groups/new',
                    name: 'cc-resource-group-new',
                    component: openedResourceGroup,
                },
                {
                    path: '/contact-center/resource-groups/:id',
                    name: 'cc-resource-group-edit',
                    component: openedResourceGroup,
                },
                {
                    path: '/contact-center/buckets',
                    name: 'cc-buckets',
                    component: buckets,
                },
                {
                    path: '/contact-center/buckets/new',
                    name: 'cc-bucket-new',
                    component: openedBucket,
                },
                {
                    path: '/contact-center/bucket/:id',
                    name: 'cc-bucket-edit',
                    component: openedBucket,
                },
                {
                    path: '/contact-center/queues',
                    name: 'cc-queues',
                    component: queues,
                },
                {
                    path: '/contact-center/queues/:queueId/members',
                    name: 'cc-queue-members',
                    component: members,
                },
                {
                    path: '/contact-center/queues/:queueId/members/new',
                    name: 'cc-queue-member-new',
                    component: openedMember,
                },
                {
                    path: '/contact-center/queues/:queueId/members/:id',
                    name: 'cc-queue-member-edit',
                    component: openedMember,
                },
                {
                    path: '/contact-center/queues/outbound-ivr/new',
                    name: 'cc-queue-outbound-ivr-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/outbound-ivr/:id',
                    name: 'cc-queue-outbound-ivr-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/inbound-queue/new',
                    name: 'cc-queue-inbound-queue-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/inbound-queue/:id',
                    name: 'cc-queue-inbound-queue-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/offline-queue/new',
                    name: 'cc-queue-offline-queue-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/offline-queue/:id',
                    name: 'cc-queue-offline-queue-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/preview-dialer/new',
                    name: 'cc-queue-preview-dialer-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/preview-dialer/:id',
                    name: 'cc-queue-preview-dialer-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/progressive-dialer/new',
                    name: 'cc-queue-progressive-dialer-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/progressive-dialer/:id',
                    name: 'cc-queue-progressive-dialer-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/predictive-dialer/new',
                    name: 'cc-queue-predictive-dialer-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/predictive-dialer/:id',
                    name: 'cc-queue-predictive-dialer-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/chat-inbound-queue/new',
                    name: 'cc-queue-chat-inbound-queue-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/chat-inbound-queue/:id',
                    name: 'cc-queue-chat-inbound-queue-edit',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/task-queue/new',
                    name: 'cc-queue-task-queue-new',
                    component: OpenedQueue,
                },
                {
                    path: '/contact-center/queues/task-queue/:id',
                    name: 'cc-queue-task-queue-edit',
                    component: OpenedQueue,
                },
                // --------------CONTACT CENTER END-------------


                // ----------INTEGRATIONS-----------------
                {
                    path: '/integrations/storage',
                    name: 'storage',
                    component: storage,
                },
                {
                    path: '/integrations/storage/:type/new',
                    name: 'storage-new',
                    component: openedStorage,
                },
                {
                    path: '/integrations/storage/:type/:id',
                    name: 'storage-edit',
                    component: openedStorage,
                },
                // --------------INTEGRATIONS END-------------


                // ----------PERMISSIONS-----------------
                {
                    path: '/permissions/roles',
                    name: 'permissions-roles',
                    component: permissionsRoles,
                },
                {
                    path: '/permissions/roles/:id',
                    name: 'permissions-roles-edit',
                    component: openedPermissionsRoles,
                },
                {
                    path: '/permissions/roles/new',
                    name: 'permissions-roles-new',
                    component: openedPermissionsRoles,
                },
                {
                    path: '/permissions/objects',
                    name: 'permissions-objects',
                    component: permissionsObjects,
                },
                {
                    path: '/permissions/objects/:id',
                    name: 'permissions-objects-edit',
                    component: openedPermissionsObjects,
                },
                // ----------PERMISSIONS END-----------------
            ],
        },
        {
            path: '*',
            name: 'not-found',
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
