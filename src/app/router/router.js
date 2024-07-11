import { createRouter, createWebHistory } from 'vue-router';
import CognitiveProfilesRoutes from '../../modules/integrations/modules/cognitive-profiles/router/cognitiveProfiles.js';
import EmailProfilesRoutes from '../../modules/integrations/modules/email-profiles/router/emailProfiles.js';
import ImportCsvRoutes from '../../modules/integrations/modules/import-csv/router/importCsv.js';
import TriggersRoutes from '../../modules/integrations/modules/triggers/router/triggers.js';
import RolesRoutes from '../../modules/permissions/modules/roles/router/roles.js';
import ChangeLogsRoutes from '../../modules/system/modules/changelogs/router/changelogs.js';
import ConfigurationRoutes from '../../modules/system/modules/configuration/router/configuration.js';
import GlobalVariablesRoutes from '../../modules/system/modules/global-variables/router/globalVariables.js';
import RouteNames from './_internals/RouteNames.enum';
import AgentSkillsRouteNames from './_internals/tabs/lookups/AgentSkillsRouteNames.enum.js';
import ChatplanRouteNames from './_internals/tabs/routing/ChatplanRouteNames.enum.js';
import DialplanRouteNames from './_internals/tabs/routing/DialplanRouteNames.enum.js';
import GatewaysRouteNames from './_internals/tabs/routing/GatewaysRouteNames.enum.js';
import BucketsRouteNamesEnum from './_internals/tabs/lookups/BucketsRouteNames.enum.js';
import BlacklistRouteNamesEnum from './_internals/tabs/lookups/BlacklistRouteNames.enum.js';
import RegionRouteNamesEnum from './_internals/tabs/lookups/RegionRouteNames.enum.js';
import CalendarRouteNamesEnum from './_internals/tabs/lookups/CalendarRouteNames.enum.js';
import CommunicationsRouteNamesEnum from './_internals/tabs/lookups/CommunicationsRouteNames.enum.js';
import AgentPauseCauseRouteNamesEnum from './_internals/tabs/lookups/AgentPauseCauseRouteNames.enum.js';
import UsersRoutes from '../../modules/directory/modules/users/router/users.js';
import DevicesRoutes from '../../modules/directory/modules/devices/router/devices.js';
import AgentRoutes from "../../modules/contact-center/modules/agents/router/agents.js";
import TeamsRoutes from '../../modules/contact-center/modules/teams/router/teams.js';
import ResourcesRoutes from '../../modules/contact-center/modules/resources/router/resources.js';
import ResourcesGroupRoutes from '../../modules/contact-center/modules/resource-groups/router/resourceGroup.js';
import QueuesRoutes from '../../modules/contact-center/modules/queues/router/queues.js';
import StorageRoutes from '../../modules/integrations/modules/storage/router/storage.js';
import ObjectsRoutes from "../../modules/permissions/modules/objects/router/objects.js";
import LicenseRoutes from "../../modules/directory/modules/license/router/license.js";
import FlowRoutes from "../../modules/routing/modules/flow/router/flow.js";
import ChatGetewaysRoutes from "../../modules/routing/modules/chat-gateways/router/chatGeteways.js";

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap.vue');
const StartPage = () => import('../../modules/start-page/components/the-start-page.vue');
const Settings = () => import('../../modules/settings/components/the-settings.vue');
const AccessDenied = () => import('../../modules/error-pages/components/the-access-denied-component.vue');
const NotFound = () => import('../../modules/error-pages/components/the-not-found-component.vue');
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

const Dialplan = () => import('../../modules/routing/modules/dialplan/components/the-dialplan.vue');
const OpenedDialplan = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan.vue');
const Chatplan = () => import('../../modules/routing/modules/chatplan/components/the-chatplan.vue');
const OpenedChatplan = () => import('../../modules/routing/modules/chatplan/components/opened-chatplan.vue');
const AgentSkills = () => import('../../modules/lookups/modules/agent-skills/components/the-agent-skills.vue');
const OpenedAgentSkill = () => import('../../modules/lookups/modules/agent-skills/components/opened-agent-skill.vue');
const Buckets = () => import('../../modules/lookups/modules/buckets/components/the-buckets.vue');
const OpenedBucket = () => import('../../modules/lookups/modules/buckets/components/opened-bucket.vue');
const PermissionsTab = () => import('../../modules/_shared/permissions-tab/components/permissions-tab.vue');
const OpenedDialplanGeneral = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan-general.vue');
const OpenedRegisterSipGatewayGeneral = () => import('../../modules/routing/modules/gateways/components/opened-register-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayGeneral = () => import('../../modules/routing/modules/gateways/components/opened-trunking-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayConfiguration =  () => import('../../modules/routing/modules/gateways/components/opened-trunking-sip-gateway-configuration.vue');
const OpenedChatplanGeneral = () => import('../../modules/routing/modules/chatplan/components/opened-chatplan-general.vue');

const OpenedAgentSkillGeneral = () => import('../../modules/lookups/modules/agent-skills/components/opened-agent-skill-general.vue');
const OpenedSkillAgents = () => import('../../modules/lookups/modules/agent-skills/modules/agents/components/opened-skill-agents.vue');
const OpenedBucketGeneral = () => import('../../modules/lookups/modules/buckets/components/opened-bucket-general.vue');
const OpenedBlacklistGeneral = () => import('../../modules/lookups/modules/blacklists/components/opened-blacklist-general.vue');
const OpenedBlacklistNumbers = () => import('../../modules/lookups/modules/blacklists/modules/numbers/components/opened-blacklist-numbers.vue');
const OpenedRegionGeneral = () => import('../../modules/lookups/modules/regions/components/opened-region-general.vue');
const OpenedCalendarGeneral = () => import('../../modules/lookups/modules/calendars/components/opened-calendar-general.vue');
const OpenedCalendarHolidays = () => import('../../modules/lookups/modules/calendars/components/opened-calendar-holidays.vue');
const OpenedCalendarWorkingWeek = () => import('../../modules/lookups/modules/calendars/components/opened-calendar-work-week.vue');
const OpenedCommunicationTypeGeneral = () => import('../../modules/lookups/modules/communications/components/opened-communication-type-general.vue');
const OpenedAgentPauseCauseGeneral = () => import('../../modules/lookups/modules/agent-pause-cause/components/opened-agent-pause-cause-general.vue');

import { checkAppAccess, checkRouteAccess } from './_internals/guards.js';

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
        ...DevicesRoutes,
        ...LicenseRoutes,
        ...UsersRoutes,
        // ----------DIRECTORY END------------

        // ----------ROUTING------------
        ...FlowRoutes,
        ...ChatGetewaysRoutes,
        {
          path: '/routing/dialplan',
          name: RouteNames.DIALPLAN,
          component: Dialplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/dialplan/:id',
          name: `${RouteNames.DIALPLAN}-card`,
          redirect: { name: DialplanRouteNames.GENERAL },
          component: OpenedDialplan,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: DialplanRouteNames.GENERAL,
              component: OpenedDialplanGeneral,
            }
          ],
        },
        {
          path: '/routing/sip-gateways',
          name: RouteNames.GATEWAYS,
          component: SipGateways,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/sip-gateways/:id',
          name: `${RouteNames.GATEWAYS}-card`,
          redirect: { name: GatewaysRouteNames.GENERAL },
          component: OpenedGateway,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: GatewaysRouteNames.GENERAL,
              component: OpenedRegisterSipGatewayGeneral,
            },{
              path: 'general',
              name: GatewaysRouteNames.GENERAL,
              component: OpenedTrunkingSipGatewayGeneral,
            },{
              path: 'configuration',
              name: GatewaysRouteNames.CONFIGURATION,
              component: OpenedTrunkingSipGatewayConfiguration,
            }
          ]
        },
        {
          path: '/routing/chatplan',
          name: RouteNames.CHATPLAN,
          component: Chatplan,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chatplan/:id',
          name: `${RouteNames.CHATPLAN}-card`,
          redirect: { name: ChatplanRouteNames.GENERAL },
          component: OpenedChatplan,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: ChatplanRouteNames.GENERAL,
              component: OpenedChatplanGeneral,
            }
          ],
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
          path: '/lookups/skills/:id',
          name: `${RouteNames.SKILLS}-card`,
          redirect: {name: AgentSkillsRouteNames.GENERAL},
          component: OpenedAgentSkill,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: AgentSkillsRouteNames.GENERAL,
              component: OpenedAgentSkillGeneral,
            },{
              path: 'agents',
              name: AgentSkillsRouteNames.AGENTS,
              component: OpenedSkillAgents
            }
          ],
        },
        {
          path: '/lookups/buckets',
          name: RouteNames.BUCKETS,
          component: Buckets,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/buckets/:id',
          name: `${RouteNames.BUCKETS}-card`,
          redirect: {name: BucketsRouteNamesEnum.GENERAL},
          component: OpenedBucket,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: BucketsRouteNamesEnum.GENERAL,
              component: OpenedBucketGeneral,
            }
          ],
        },
        {
          path: '/lookups/blacklist',
          name: RouteNames.BLACKLIST,
          component: Blacklists,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/blacklist/:id',
          name: `${RouteNames.BLACKLIST}-card`,
          redirect: {name: BlacklistRouteNamesEnum.GENERAL},
          component: OpenedBlacklist,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: BlacklistRouteNamesEnum.GENERAL,
              component: OpenedBlacklistGeneral,
            },{
              path: 'numbers/:numberId?',
              name: BlacklistRouteNamesEnum.NUMBERS,
              component: OpenedBlacklistNumbers,
            },{
              path: 'permissions/:permissionId?',
              name: BlacklistRouteNamesEnum.PERMISSIONS,
              component: PermissionsTab,
            }
          ],
        },
        {
          path: '/lookups/media/:mediaId?',
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
          path: '/lookups/calendars/:id',
          name: `${RouteNames.CALENDARS}-card`,
          redirect: {name: CalendarRouteNamesEnum.GENERAL},
          component: OpenedCalendar,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: CalendarRouteNamesEnum.GENERAL,
              component: OpenedCalendarGeneral,
            },{
              path: 'working-week',
              name: CalendarRouteNamesEnum.WORKING_WEEK,
              component: OpenedCalendarWorkingWeek,
            },{
              path: 'holidays/:holidayIndex?',
              name: CalendarRouteNamesEnum.HOLIDAYS,
              component: OpenedCalendarHolidays,
            },{
              path: 'permissions/:permissionId?',
              name: CalendarRouteNamesEnum.PERMISSIONS,
              component: PermissionsTab,
            }
          ],
        },

        {
          path: '/lookups/communications',
          name: RouteNames.COMMUNICATIONS,
          component: CommunicationTypes,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/communications/:id',
          name: `${RouteNames.COMMUNICATIONS}-card`,
          redirect: {name: CommunicationsRouteNamesEnum.GENERAL},
          component: OpenedCommunicationType,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: CommunicationsRouteNamesEnum.GENERAL,
              component: OpenedCommunicationTypeGeneral,
            }
          ],
        },

        {
          path: '/lookups/regions',
          name: RouteNames.REGIONS,
          component: Regions,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/regions/:id',
          name: `${RouteNames.REGIONS}-card`,
          redirect: {name: RegionRouteNamesEnum.GENERAL},
          component: OpenedRegion,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: RegionRouteNamesEnum.GENERAL,
              component: OpenedRegionGeneral,
            }
          ],
        },

        {
          path: '/lookups/pause-cause',
          name: RouteNames.PAUSE_CAUSE,
          component: AgentPauseCause,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/lookups/pause-cause/:id',
          name: `${RouteNames.PAUSE_CAUSE}-edit`,
          redirect: {name: AgentPauseCauseRouteNamesEnum.GENERAL},
          component: OpenedAgentPauseCause,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: AgentPauseCauseRouteNamesEnum.GENERAL,
              component: OpenedAgentPauseCauseGeneral,
            }
          ],
        },
        // ----------LOOKUPS END------------

        // --------------CONTACT CENTER-------------
        ...AgentRoutes,
        ...TeamsRoutes,
        ...ResourcesRoutes,
        ...ResourcesGroupRoutes,
        ...QueuesRoutes,

        // --------------CONTACT CENTER END-------------

        // ----------INTEGRATIONS-----------------
        ...StorageRoutes,
        ...CognitiveProfilesRoutes,
        ...EmailProfilesRoutes,
        ...ImportCsvRoutes,
        ...TriggersRoutes,
        // TODO Find out what purpose of /integrations/single-sign-on
        // {
        //   path: '/integrations/single-sign-on',
        //   name: RouteNames.SINGLE_SIGN_ON,
        //   component: SingleSignOn,
        //   beforeEnter: checkRouteAccess,
        // },
        // {
        //   path: '/integrations/single-sign-on/new',
        //   name: `${RouteNames.SINGLE_SIGN_ON}-new`,
        //   component: OpenedSingleSignOn,
        //   beforeEnter: checkRouteAccess,
        // },
        // {
        //   path: '/integrations/single-sign-on/:id',
        //   name: `${RouteNames.SINGLE_SIGN_ON}-edit`,
        //   component: OpenedSingleSignOn,
        //   beforeEnter: checkRouteAccess,
        // },
        // --------------INTEGRATIONS END-------------

        // ----------PERMISSIONS-----------------
        ...RolesRoutes,
        ...ObjectsRoutes,
        // ----------PERMISSIONS END-----------------

        // ----------SYSTEM START-----------------
        ...ChangeLogsRoutes,
        ...ConfigurationRoutes,
        ...GlobalVariablesRoutes,

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
