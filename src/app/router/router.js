import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@webitel/ui-sdk/src/modules/Userinfo/components/the-auth.vue';
import RouteNames from './_internals/RouteNames.enum';

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap.vue');
const Home = () => import('../../modules/_unused/home/components/the-home.vue');
const StartPage = () => import('../../modules/start-page/components/the-start-page.vue');
const Settings = () => import('../../modules/settings/components/the-settings.vue');
const AccessDenied = () => import('../../modules/error-pages/components/the-access-denied-component.vue');
const NotFound = () => import('../../modules/error-pages/components/the-not-found-component.vue');
const PermissionsRoles = () => import('../../modules/permissions/modules/roles/components/the-roles.vue');
const OpenedPermissionsRoles = () => import('../../modules/permissions/modules/roles/components/opened-role.vue');
const PermissionsObjects = () => import('../../modules/permissions/modules/objects/components/the-objects-permissions.vue');
const OpenedPermissionsObjects = () => import('../../modules/permissions/modules/objects/components/opened-object-permissions.vue');
const Devices = () => import('../../modules/directory/modules/devices/components/the-devices.vue');
const OpenedDevice = () => import('../../modules/directory/modules/devices/components/opened-device.vue');
const Users = () => import('../../modules/directory/modules/users/components/the-users.vue');
const OpenedUser = () => import('../../modules/directory/modules/users/components/opened-user.vue');
const License = () => import('../../modules/directory/modules/license/components/the-license.vue');
const Blacklists = () => import('../../modules/lookups/modules/blacklists/components/the-blacklists.vue');
const Media = () => import('../../modules/lookups/modules/media/components/the-media.vue');
const OpenedBlacklist = () => import('../../modules/lookups/modules/blacklists/components/opened-blacklist.vue');
const Calendars = () => import('../../modules/lookups/modules/calendars/components/the-calendars.vue');
const OpenedCalendar = () => import('../../modules/lookups/modules/calendars/components/opened-calendar.vue');
const CommunicationTypes = () => import('../../modules/lookups/modules/communications/components/the-communication-types.vue');
const OpenedCommunicationType = () => import('../../modules/lookups/modules/communications/components/opened-communication-type.vue');
const Regions = () => import('../../modules/lookups/modules/regions/components/the-regions.vue');
const OpenedRegion = () => import('../../modules/lookups/modules/regions/components/opened-region.vue');
const AgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/the-agent-pause-cause.vue');
const OpenedAgentPauseCause = () => import('../../modules/lookups/modules/agent-pause-cause/components/opened-agent-pause-cause.vue');
const SipGateways = () => import('../../modules/routing/modules/gateways/components/the-sip-gateways.vue');
const OpenedGateway = () => import('../../modules/routing/modules/gateways/components/opened-sip-gateway.vue');
const ChatGateways = () => import('../../modules/routing/modules/chat-gateways/components/the-chat-gateways.vue');
const OpenedChatGateways = () => import('../../modules/routing/modules/chat-gateways/components/opened-chat-gateway.vue');
const Flow = () => import('../../modules/routing/modules/flow/components/the-flow.vue');
const OpenedFlow = () => import('../../modules/routing/modules/flow/components/opened-flow.vue');
const Dialplan = () => import('../../modules/routing/modules/dialplan/components/the-dialplan.vue');
const OpenedDialplan = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan.vue');
const Chatplan = () => import('../../modules/routing/modules/chatplan/components/the-chatplan.vue');
const OpenedChatplan = () => import('../../modules/routing/modules/chatplan/components/opened-chatplan.vue');
const TheResources = () => import('../../modules/contact-center/modules/resources/components/the-resources.vue');
const OpenedResource = () => import('../../modules/contact-center/modules/resources/components/opened-resource.vue');
const ResourceGroups = () => import('../../modules/contact-center/modules/resource-groups/components/the-resource-groups.vue');
const OpenedResourceGroup = () => import('../../modules/contact-center/modules/resource-groups/components/opened-resource-group.vue');
const Agents = () => import('../../modules/contact-center/modules/agents/components/the-agents.vue');
const OpenedAgent = () => import('../../modules/contact-center/modules/agents/components/opened-agent.vue');
const Teams = () => import('../../modules/contact-center/modules/teams/components/the-teams.vue');
const OpenedTeam = () => import('../../modules/contact-center/modules/teams/components/opened-team.vue');
const AgentSkills = () => import('../../modules/lookups/modules/agent-skills/components/the-agent-skills.vue');
const OpenedAgentSkill = () => import('../../modules/lookups/modules/agent-skills/components/opened-agent-skill.vue');
const Buckets = () => import('../../modules/lookups/modules/buckets/components/the-buckets.vue');
const OpenedBucket = () => import('../../modules/lookups/modules/buckets/components/opened-bucket.vue');
const Queues = () => import('../../modules/contact-center/modules/queues/components/the-queues.vue');
const Members = () => import('../../modules/contact-center/modules/queues/modules/members/components/the-queue-members.vue');
const OpenedMember = () => import('../../modules/contact-center/modules/queues/modules/members/components/opened-queue-member.vue');
const OpenedQueue = () => import('../../modules/contact-center/modules/queues/components/opened-queue.vue');
const Storage = () => import('../../modules/integrations/modules/storage/components/the-storage.vue');
const OpenedStorage = () => import('../../modules/integrations/modules/storage/components/opened-storage.vue');
const CognitiveProfiles = () => import('../../modules/integrations/modules/cognitive-profiles/components/the-cognitive-profiles.vue');
const OpenedCognitiveProfile = () => import('../../modules/integrations/modules/cognitive-profiles/components/opened-cognitive-profile.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
                            // eslint-disable-next-line no-unused-vars
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
          path: '/directory/license/:id',
          name: `${RouteNames.LICENSE}-edit`,
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
          path: '/routing/sip-gateways',
          name: RouteNames.GATEWAYS,
          component: SipGateways,
        },
        {
          path: '/routing/sip-gateways/register/new',
          name: `${RouteNames.GATEWAYS}-reg-new`,
          component: OpenedGateway,
        },
        {
          path: '/routing/sip-gateways/register/:id',
          name: `${RouteNames.GATEWAYS}-reg-edit`,
          component: OpenedGateway,
        },
        {
          path: '/routing/sip-gateways/trunking/new',
          name: `${RouteNames.GATEWAYS}-trunk-new`,
          component: OpenedGateway,
        },
        {
          path: '/routing/sip-gateways/trunking/:id',
          name: `${RouteNames.GATEWAYS}-trunk-edit`,
          component: OpenedGateway,
        },
        {
          path: '/routing/chatplan',
          name: RouteNames.CHATPLAN,
          component: Chatplan,
        },
        {
          path: '/routing/chatplan/new',
          name: `${RouteNames.CHATPLAN}-new`,
          component: OpenedChatplan,
        },
        {
          path: '/routing/chatplan/:id',
          name: `${RouteNames.CHATPLAN}-edit`,
          component: OpenedChatplan,
        },
        {
          path: '/routing/chat-gateways',
          name: RouteNames.CHAT_GATEWAYS,
          component: ChatGateways,
        },
        {
          path: '/routing/chat-gateways/telegram/new',
          name: `${RouteNames.CHAT_GATEWAYS}-telegram-new`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/telegram/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-telegram-edit`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/facebook/new',
          name: `${RouteNames.CHAT_GATEWAYS}-facebook-new`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/facebook/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-facebook-edit`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/webchat/new',
          name: `${RouteNames.CHAT_GATEWAYS}-webchat-new`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/webchat/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-webchat-edit`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/infobip/new',
          name: `${RouteNames.CHAT_GATEWAYS}-infobip-new`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/infobip/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-infobip-edit`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/viber/new',
          name: `${RouteNames.CHAT_GATEWAYS}-viber-new`,
          component: OpenedChatGateways,
        },
        {
          path: '/routing/chat-gateways/viber/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-viber-edit`,
          component: OpenedChatGateways,
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
          path: '/lookups/buckets/:id',
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
          path: '/contact-center/queues/new',
          name: `${RouteNames.QUEUES}-new`,
          component: OpenedQueue,
        },
        {
          path: '/contact-center/queues/:id',
          name: `${RouteNames.QUEUES}-edit`,
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
        {
          path: '/integrations/cognitive-profiles',
          name: RouteNames.COGNITIVE_PROFILES,
          component: CognitiveProfiles,
        },
        {
          path: '/integrations/cognitive-profile/new',
          name: `${RouteNames.COGNITIVE_PROFILES}-new`,
          component: OpenedCognitiveProfile,
        },
        {
          path: '/integrations/cognitive-profile/:id',
          name: `${RouteNames.COGNITIVE_PROFILES}-edit`,
          component: OpenedCognitiveProfile,
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
    if (!(to.path === '/auth')) {
      if (!localStorage.getItem('access-token')) {
        next('/auth');
      }
    }
    next();
  });

export default router;
