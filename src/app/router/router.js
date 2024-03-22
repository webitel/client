import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store';
import RouteNames from './_internals/RouteNames.enum';

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap.vue');
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
const EmailProfiles = () => import('../../modules/integrations/modules/email-profiles/components/the-email-profiles.vue');
const SingleSignOn = () => import('../../modules/integrations/modules/single-sign-on/components/the-single-sign-on.vue');
const ImportCsv = () => import('../../modules/integrations/modules/import-csv/components/the-import-csv.vue');
const Triggers = () => import('../../modules/integrations/modules/triggers/components/the-triggers.vue');
const OpenedCognitiveProfile = () => import('../../modules/integrations/modules/cognitive-profiles/components/opened-cognitive-profile.vue');
const OpenedEmailProfile = () => import('../../modules/integrations/modules/email-profiles/components/opened-email-profile.vue');
const OpenedSingleSignOn = () => import('../../modules/integrations/modules/single-sign-on/components/opened-single-sign-on.vue');
const OpenedImportCsv = () => import('../../modules/integrations/modules/import-csv/components/opened-import-csv.vue');
const OpenedTrigger = () => import('../../modules/integrations/modules/triggers/components/opened-trigger.vue');
const Changelogs = () => import('../../modules/system/modules/changelogs/components/the-changelogs.vue');
const OpenedChangelog = () => import('../../modules/system/modules/changelogs/components/opened-changelog.vue');
const Configuration = () => import('../../modules/system/modules/configuration/components/the-configuration.vue');
const GlobalVariables = () => import('../../modules/system/modules/global-variables/components/the-global-variables.vue');

const checkAppAccess = (to, from, next) => {
  // check for === false because it can be undefined
  if (to.meta.requiresAccess === false) next();

  const hasReadAccess = store.getters['userinfo/CHECK_APP_ACCESS'](store.getters['userinfo/THIS_APP']);
  if (hasReadAccess) {
    next();
  } else {
    next('/access-denied');
  }
};

const checkRouteAccess = ((to, from, next) => {
  const hasReadAccess = store.getters['userinfo/HAS_READ_ACCESS']({ route: to });
  if (hasReadAccess) {
    next();
  } else {
    next('/access-denied');
  }
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
  routes: [
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
      redirect: '/start',
      beforeEnter: checkAppAccess,
      children: [
        {
          path: '/start',
          name: RouteNames.START,
          component: StartPage,
        },
        {
          path: '/settings',
          name: RouteNames.SETTINGS_PAGE,
          component: Settings,
          meta: {
            // prevent beforeEnter: checkAppAccess on parent route [WTEL-4321]
            requiresAccess: false,
          },
        },

        // ----------DIRECTORY------------
        {
          path: '/directory/devices',
          name: RouteNames.DEVICES,
          component: Devices,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/devices/:id',
          name: `${RouteNames.DEVICES}-edit`,
          component: OpenedDevice,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/devices/new',
          name: `${RouteNames.DEVICES}-new`,
          component: OpenedDevice,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/devices/hotdesk/:id',
          name: `${RouteNames.DEVICES}-hotdesk-edit`,
          component: OpenedDevice,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/devices/hotdesk/new',
          name: `${RouteNames.DEVICES}-hotdesk-new`,
          component: OpenedDevice,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/license',
          name: RouteNames.LICENSE,
          component: License,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/license/:id',
          name: `${RouteNames.LICENSE}-edit`,
          component: License,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/users',
          name: RouteNames.USERS,
          component: Users,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/users/:id',
          name: `${RouteNames.USERS}-edit`,
          component: OpenedUser,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/users/new',
          name: `${RouteNames.USERS}-new`,
          component: OpenedUser,
          beforeEnter: checkRouteAccess,
        },
        // ----------DIRECTORY END------------

        // ----------ROUTING------------
        {
          path: '/routing/flow',
          name: RouteNames.FLOW,
          component: Flow,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/flow/new',
          name: `${RouteNames.FLOW}-new`,
          component: OpenedFlow,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/flow/:id',
          name: `${RouteNames.FLOW}-edit`,
          component: OpenedFlow,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/dialplan',
          name: RouteNames.DIALPLAN,
          component: Dialplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/dialplan/new',
          name: `${RouteNames.DIALPLAN}-new`,
          component: OpenedDialplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/dialplan/:id',
          name: `${RouteNames.DIALPLAN}-edit`,
          component: OpenedDialplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways',
          name: RouteNames.GATEWAYS,
          component: SipGateways,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways/register/new',
          name: `${RouteNames.GATEWAYS}-reg-new`,
          component: OpenedGateway,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways/register/:id',
          name: `${RouteNames.GATEWAYS}-reg-edit`,
          component: OpenedGateway,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways/trunking/new',
          name: `${RouteNames.GATEWAYS}-trunk-new`,
          component: OpenedGateway,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways/trunking/:id',
          name: `${RouteNames.GATEWAYS}-trunk-edit`,
          component: OpenedGateway,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chatplan',
          name: RouteNames.CHATPLAN,
          component: Chatplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chatplan/new',
          name: `${RouteNames.CHATPLAN}-new`,
          component: OpenedChatplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chatplan/:id',
          name: `${RouteNames.CHATPLAN}-edit`,
          component: OpenedChatplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chat-gateways',
          name: RouteNames.CHAT_GATEWAYS,
          component: ChatGateways,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chat-gateways/new',
          name: `${RouteNames.CHAT_GATEWAYS}-new`,
          component: OpenedChatGateways,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chat-gateways/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-edit`,
          component: OpenedChatGateways,
          beforeEnter: checkRouteAccess,
        },
        // ----------ROUTING END------------

        // ----------LOOKUPS------------
        {
          path: '/lookups/skills',
          name: RouteNames.SKILLS,
          component: AgentSkills,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/skills/new',
          name: `${RouteNames.SKILLS}-new`,
          component: OpenedAgentSkill,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/skills/:id',
          name: `${RouteNames.SKILLS}-edit`,
          component: OpenedAgentSkill,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/buckets',
          name: RouteNames.BUCKETS,
          component: Buckets,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/buckets/new',
          name: `${RouteNames.BUCKETS}-new`,
          component: OpenedBucket,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/buckets/:id',
          name: `${RouteNames.BUCKETS}-edit`,
          component: OpenedBucket,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/blacklist',
          name: RouteNames.BLACKLIST,
          component: Blacklists,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/blacklist/new',
          name: `${RouteNames.BLACKLIST}-new`,
          component: OpenedBlacklist,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/blacklist/:id',
          name: `${RouteNames.BLACKLIST}-edit`,
          component: OpenedBlacklist,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/media',
          name: RouteNames.MEDIA,
          component: Media,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/calendars',
          name: RouteNames.CALENDARS,
          component: Calendars,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/calendars/new',
          name: `${RouteNames.CALENDARS}-new`,
          component: OpenedCalendar,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/calendars/:id',
          name: `${RouteNames.CALENDARS}-edit`,
          component: OpenedCalendar,
          beforeEnter: checkRouteAccess,
        },

        {
          path: '/lookups/communications',
          name: RouteNames.COMMUNICATIONS,
          component: CommunicationTypes,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/communications/new',
          name: `${RouteNames.COMMUNICATIONS}-new`,
          component: OpenedCommunicationType,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/communications/:id',
          name: `${RouteNames.COMMUNICATIONS}-edit`,
          component: OpenedCommunicationType,
          beforeEnter: checkRouteAccess,
        },

        {
          path: '/lookups/regions',
          name: RouteNames.REGIONS,
          component: Regions,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/regions/new',
          name: `${RouteNames.REGIONS}-new`,
          component: OpenedRegion,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/regions/:id',
          name: `${RouteNames.REGIONS}-edit`,
          component: OpenedRegion,
          beforeEnter: checkRouteAccess,
        },

        {
          path: '/lookups/pause-cause',
          name: RouteNames.PAUSE_CAUSE,
          component: AgentPauseCause,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/pause-cause/new',
          name: `${RouteNames.PAUSE_CAUSE}-new`,
          component: OpenedAgentPauseCause,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/pause-cause/:id',
          name: `${RouteNames.PAUSE_CAUSE}-edit`,
          component: OpenedAgentPauseCause,
          beforeEnter: checkRouteAccess,
        },
        // ----------LOOKUPS END------------

        // --------------CONTACT CENTER-------------
        {
          path: '/contact-center/agents',
          name: RouteNames.AGENTS,
          component: Agents,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/agents/new',
          name: `${RouteNames.AGENTS}-new`,
          component: OpenedAgent,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/agents/:id',
          name: `${RouteNames.AGENTS}-edit`,
          component: OpenedAgent,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/teams',
          name: RouteNames.TEAMS,
          component: Teams,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/teams/new',
          name: `${RouteNames.TEAMS}-new`,
          component: OpenedTeam,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/teams/:id',
          name: `${RouteNames.TEAMS}-edit`,
          component: OpenedTeam,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resources',
          name: RouteNames.RESOURCES,
          component: TheResources,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resources/new',
          name: `${RouteNames.RESOURCES}-new`,
          component: OpenedResource,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resources/:id',
          name: `${RouteNames.RESOURCES}-edit`,
          component: OpenedResource,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resource-groups',
          name: RouteNames.RESOURCE_GROUPS,
          component: ResourceGroups,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resource-groups/new',
          name: `${RouteNames.RESOURCE_GROUPS}-new`,
          component: OpenedResourceGroup,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/resource-groups/:id',
          name: `${RouteNames.RESOURCE_GROUPS}-edit`,
          component: OpenedResourceGroup,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues',
          name: RouteNames.QUEUES,
          component: Queues,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/:queueId/members',
          name: RouteNames.MEMBERS,
          component: Members,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/:queueId/members/new',
          name: `${RouteNames.MEMBERS}-new`,
          component: OpenedMember,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/:queueId/members/:id',
          name: `${RouteNames.MEMBERS}-edit`,
          component: OpenedMember,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/new',
          name: `${RouteNames.QUEUES}-new`,
          component: OpenedQueue,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/:id',
          name: `${RouteNames.QUEUES}-edit`,
          component: OpenedQueue,
          beforeEnter: checkRouteAccess,
        },
        // --------------CONTACT CENTER END-------------

        // ----------INTEGRATIONS-----------------
        {
          path: '/integrations/storage',
          name: RouteNames.STORAGE,
          component: Storage,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/storage/:type/new',
          name: `${RouteNames.STORAGE}-new`,
          component: OpenedStorage,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/storage/:type/:id',
          name: `${RouteNames.STORAGE}-edit`,
          component: OpenedStorage,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/cognitive-profiles',
          name: RouteNames.COGNITIVE_PROFILES,
          component: CognitiveProfiles,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/cognitive-profile/new',
          name: `${RouteNames.COGNITIVE_PROFILES}-new`,
          component: OpenedCognitiveProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/cognitive-profile/:id',
          name: `${RouteNames.COGNITIVE_PROFILES}-edit`,
          component: OpenedCognitiveProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/email-profiles',
          name: RouteNames.EMAIL_PROFILES,
          component: EmailProfiles,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/email-profile/new',
          name: `${RouteNames.EMAIL_PROFILES}-new`,
          component: OpenedEmailProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/email-profile/:id',
          name: `${RouteNames.EMAIL_PROFILES}-edit`,
          component: OpenedEmailProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/single-sign-on',
          name: RouteNames.SINGLE_SIGN_ON,
          component: SingleSignOn,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/single-sign-on/new',
          name: `${RouteNames.SINGLE_SIGN_ON}-new`,
          component: OpenedSingleSignOn,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/single-sign-on/:id',
          name: `${RouteNames.SINGLE_SIGN_ON}-edit`,
          component: OpenedSingleSignOn,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/import-csv',
          name: RouteNames.IMPORT_CSV,
          component: ImportCsv,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/import-csv/new',
          name: `${RouteNames.IMPORT_CSV}-new`,
          component: OpenedImportCsv,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/import-csv/:id',
          name: `${RouteNames.IMPORT_CSV}-edit`,
          component: OpenedImportCsv,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/triggers',
          name: RouteNames.TRIGGERS,
          component: Triggers,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/triggers/new',
          name: `${RouteNames.TRIGGERS}-new`,
          component: OpenedTrigger,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/triggers/:id',
          name: `${RouteNames.TRIGGERS}-edit`,
          component: OpenedTrigger,
          beforeEnter: checkRouteAccess,
        },
        // --------------INTEGRATIONS END-------------

        // ----------PERMISSIONS-----------------
        {
          path: '/permissions/roles',
          name: RouteNames.ROLES,
          component: PermissionsRoles,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/permissions/roles/:id',
          name: `${RouteNames.ROLES}-edit`,
          component: OpenedPermissionsRoles,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/permissions/roles/new',
          name: `${RouteNames.ROLES}-new`,
          component: OpenedPermissionsRoles,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/permissions/objects',
          name: RouteNames.OBJECTS,
          component: PermissionsObjects,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/permissions/objects/:id',
          name: `${RouteNames.OBJECTS}-edit`,
          component: OpenedPermissionsObjects,
          beforeEnter: checkRouteAccess,
        },
        // ----------PERMISSIONS END-----------------

        // ----------SYSTEM START-----------------
        {
          path: '/system/changelogs',
          name: RouteNames.CHANGELOGS,
          component: Changelogs,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/system/changelogs/new',
          name: `${RouteNames.CHANGELOGS}-new`,
          component: OpenedChangelog,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/system/changelogs/:id',
          name: `${RouteNames.CHANGELOGS}-edit`,
          component: OpenedChangelog,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/system/configuration',
          name: RouteNames.CONFIGURATION,
          component: Configuration,
          beforeEnter: checkRouteAccess,
        },

        {
          path: '/system/global-variables',
          name: RouteNames.GLOBAL_VARIABLES,
          component: GlobalVariables,
          beforeEnter: checkRouteAccess,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteNames.PAGE_404,
      component: NotFound,
    },
    // ----------SYSTEM END-----------------
  ],
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access-token') && !to.query.accessToken) {
    const desiredUrl = encodeURIComponent(window.location.href);
    const authUrl = import.meta.env.VITE_AUTH_URL;
    window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
  } else if (to.query.accessToken) {
    // assume that access token was set from query before app initialization in main.js
    const newQuery = { ...to.query };
    delete newQuery.accessToken;
    next({ ...to, query: newQuery });
  } else {
    next();
  }
});

export default router;
