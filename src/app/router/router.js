import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store';
import RouteNames from './_internals/RouteNames.enum';
import DevicesRouteNames from './_internals/tabs/directory/DevicesRouteNames.enum.js';
import LicencesRouteNames from './_internals/tabs/directory/LicencesRouteNames.enum.js';
import UsersRouteNames from './_internals/tabs/directory/UsersRouteNames.enum.js';
import AgentSkillsRouteNames from './_internals/tabs/lookups/AgentSkillsRouteNames.enum.js';
import ChatGatewayRouteNames from './_internals/tabs/routing/ChatGatewayRouteNames.enum.js';
import ChatplanRouteNames from './_internals/tabs/routing/ChatplanRouteNames.enum.js';
import FlowRouteNames from './_internals/tabs/routing/FlowRouteNames.enum.js';
import ChangelogRouteNamesEnum from './_internals/tabs/system/ChangelogRouteNames.enum.js';
import DialplanRouteNames from './_internals/tabs/routing/DialplanRouteNames.enum.js';
import GatewaysRouteNames from './_internals/tabs/routing/GatewaysRouteNames.enum.js';
import BucketsRouteNamesEnum from './_internals/tabs/lookups/BucketsRouteNames.enum.js';
import BlacklistRouteNamesEnum from './_internals/tabs/lookups/BlacklistRouteNames.enum.js';
import RegionRouteNamesEnum from './_internals/tabs/lookups/RegionRouteNames.enum.js';
import CalendarRouteNamesEnum from './_internals/tabs/lookups/CalendarRouteNames.enum.js';
import CommunicationsRouteNamesEnum from './_internals/tabs/lookups/CommunicationsRouteNames.enum.js';
import AgentPauseCauseRouteNamesEnum from './_internals/tabs/lookups/AgentPauseCauseRouteNames.enum.js';

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
const AllLicenses = () => import('../../modules/directory/modules/license/components/all-licenses/all-licenses.vue');
const LicensesByUser = () => import('../../modules/directory/modules/license/modules/users/components/licenses-by-user.vue');
const OpenedUserGeneral = () => import('../../modules/directory/modules/users/components/opened-user-general.vue');
const OpenedUserRoles = () => import('../../modules/directory/modules/users/components/opened-user-roles.vue');
const OpenedUserLicense = () => import('../../modules/directory/modules/users/components/opened-user-license.vue');
const OpenedUserDevices = () => import('../../modules/directory/modules/users/components/opened-user-devices.vue');
const OpenedUserVariables = () => import('../../modules/directory/modules/users/components/opened-user-variables.vue');
const OpenedUserLogs = () => import('../../modules/directory/modules/users/modules/logs/components/opened-user-logs.vue');
const OpenedUserToken = () => import('../../modules/directory/modules/users/modules/tokens/components/opened-user-token.vue');
const PermissionsTab = () => import('../../modules/_shared/permissions-tab/components/permissions-tab.vue');
const OpenedDeviceGeneral = () => import('../../modules/directory/modules/devices/components/opened-device-general.vue');
const OpenedDevicePhoneInfo = () => import('../../modules/directory/modules/devices/components/opened-device-phone-info.vue');
const OpenedHotdeskDeviceGeneral = () => import('../../modules/directory/modules/devices/components/opened-hotdesk-device-general.vue');
const OpenedHotdeskDeviceHotdesking = () => import('../../modules/directory/modules/devices/components/opened-hotdesk-device-hotdesking.vue');
const OpenedChangelogGeneral = () => import('../../modules/system/modules/changelogs/components/opened-changelog-general.vue');
const OpenedChangelogLogs = () => import('../../modules/system/modules/changelogs/modules/logs/components/opened-changelog-logs.vue');
const OpenedDialplanGeneral = () => import('../../modules/routing/modules/dialplan/components/opened-dialplan-general.vue');
const OpenedFlowDiagram = () => import('../../modules/routing/modules/flow/modules/diagram/components/opened-flow-diagram.vue');
const OpenedRegisterSipGatewayGeneral = () => import('../../modules/routing/modules/gateways/components/opened-register-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayGeneral = () => import('../../modules/routing/modules/gateways/components/opened-trunking-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayConfiguration =  () => import('../../modules/routing/modules/gateways/components/opened-trunking-sip-gateway-configuration.vue');
const OpenedChatplanGeneral = () => import('../../modules/routing/modules/chatplan/components/opened-chatplan-general.vue');
const OpenedChatGatewayTelegramBotGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/telegram-bot/opened-chat-gateway-telegram-bot-general-tab.vue');
const OpenedChatGatewayTelegramAppGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/telegram-app/opened-chat-gateway-telegram-app-general-tab.vue');
const OpenedChatGatewayTemplatesTab = () => import('../../modules/routing/modules/chat-gateways/components/_shared/opened-chat-gateway-templates-tab.vue');
const OpenedChatGatewayMessengerGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/messenger/opened-chat-gateway-messenger-general-tab.vue');
const OpenedChatFacebook = () => import('../../modules/routing/modules/chat-gateways/modules/messenger/facebook/components/facebook-tab.vue');
const OpenedChatInstagram = () => import('../../modules/routing/modules/chat-gateways/modules/messenger/instagram/components/instagram-tab.vue');
const OpenedChatWhatsapp = () => import('../../modules/routing/modules/chat-gateways/modules/messenger/whatsapp/components/whatsapp-tab.vue');
const OpenedChatGatewayInfobipGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/infobip/opened-chat-gateway-infobip-general-tab.vue');
const OpenedChatGatewayViberGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/viber/opened-chat-gateway-viber-general-tab.vue');
const OpenedChatGatewayViberStyleTab = () => import('../../modules/routing/modules/chat-gateways/components/viber/opened-chat-gateway-viber-style-tab.vue');
const OpenedChatGatewayWebchatGeneralTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-general-tab.vue');
const OpenedChatGatewayWebchatViewTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-view-tab.vue');
const OpenedChatGatewayWebchatAlternativeChannelsTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-alternative-channels-tab.vue');
const OpenedChatGatewayWebchatChatTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-chat-tab.vue');
const OpenedChatGatewayWebchatAppointmentTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-appointment-tab.vue');
const OpenedChatGatewayWebchatRecaptchaTab = () => import('../../modules/routing/modules/chat-gateways/modules/webchat/components/opened-chat-gateway-webchat-recaptcha-tab.vue');
const OpenedChatGatewayCustomGeneralTab = () => import('../../modules/routing/modules/chat-gateways/components/custom/opened-chat-gateway-custom-general-tab.vue');
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
import AgentRoutes from "../../modules/contact-center/modules/agents/router/agents.js";
import {checkAppAccess, checkRouteAccess} from "./_internals/checkers.js";

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
          name: `${RouteNames.DEVICES}-card`,
          redirect: { name: DevicesRouteNames.GENERAL},
          component: OpenedDevice,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: DevicesRouteNames.GENERAL,
              component: OpenedDeviceGeneral,
            },{
              path: 'phone-info',
              name: DevicesRouteNames.PHONE_INFO,
              component: OpenedDevicePhoneInfo,
            },{
              path: 'general',
              name: DevicesRouteNames.GENERAL,
              component: OpenedHotdeskDeviceGeneral,
            },{
              path: 'hotdesking',
              name: DevicesRouteNames.HOTDESKING,
              component: OpenedHotdeskDeviceHotdesking,
            },{
              path: 'permissions/:permissionId?',
              name: `${DevicesRouteNames.PERMISSIONS}-card`,
              component: PermissionsTab,
            },
          ],
        },
        {
          path: '/directory/license',
          name: RouteNames.LICENSE,
          component: License,
          redirect: {name: `${LicencesRouteNames.ALL}-card`},
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'all/:id?',
              name: `${LicencesRouteNames.ALL}-card`,
              component: AllLicenses,
            },{
              path: 'by-user',
              name: LicencesRouteNames.BY_USER,
              component: LicensesByUser,
            }
          ],
        },
        {
          path: '/directory/users',
          name: RouteNames.USERS,
          component: Users,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/directory/users/:id',
          name: `${RouteNames.USERS}-card`,
          component: OpenedUser,
          redirect: {name: UsersRouteNames.GENERAL},
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: UsersRouteNames.GENERAL,
              component: OpenedUserGeneral,
            },{
              path: 'roles',
              name: UsersRouteNames.ROLES,
              component: OpenedUserRoles,
            },{
              path: 'license',
              name: UsersRouteNames.LICENSE,
              component: OpenedUserLicense,
            },{
              path: 'devices',
              name: UsersRouteNames.DEVICES,
              component: OpenedUserDevices,
            },{
              path: 'variables',
              name: UsersRouteNames.VARIABLES,
              component: OpenedUserVariables,
            },{
              path: 'tokens/:tokenId?',
              name: UsersRouteNames.TOKENS,
              component: OpenedUserToken,
            },{
              path: 'logs',
              name: UsersRouteNames.LOGS,
              component: OpenedUserLogs,
            },{
              path: 'permissions/:permissionId?',
              name: `${UsersRouteNames.PERMISSIONS}-card`,
              component: PermissionsTab,
            }
          ],
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
          path: '/routing/flow/:id',
          name: `${RouteNames.FLOW}-card`,
          redirect: { name: FlowRouteNames.GENERAL },
          component: OpenedFlow,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: FlowRouteNames.GENERAL,
              component: OpenedFlowDiagram,
            }
          ],
        },
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
        {
          path: '/routing/chat-gateways',
          name: RouteNames.CHAT_GATEWAYS,
          component: ChatGateways,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/routing/chat-gateways/:id',
          name: `${RouteNames.CHAT_GATEWAYS}-card`,
          redirect: { name: ChatGatewayRouteNames.GENERAL },
          component: OpenedChatGateways,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'telegram-bot',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayTelegramBotGeneralTab,
            },{
              path: 'telegram-app',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayTelegramAppGeneralTab,
            },{
              path: 'infobip',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayInfobipGeneralTab,
            },{
              path: 'meta',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayMessengerGeneralTab,
            },{
              path: 'facebook-pages',
              name: ChatGatewayRouteNames.FACEBOOK_PAGES,
              component: OpenedChatFacebook,
            },{
              path: 'instagram',
              name: ChatGatewayRouteNames.INSTAGRAM,
              component: OpenedChatInstagram,
            },{
              path: 'whatsapp',
              name: ChatGatewayRouteNames.WHATSAPP,
              component: OpenedChatWhatsapp,
            },{
              path: 'viber',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayViberGeneralTab,
            },{
              path: 'general',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayWebchatGeneralTab,
            },{
              path: 'view',
              name: ChatGatewayRouteNames.VIEW,
              component: OpenedChatGatewayWebchatViewTab,
            },{
              path: 'chat',
              name: ChatGatewayRouteNames.CHAT,
              component: OpenedChatGatewayWebchatChatTab,
            },{
              path: 'appointment',
              name: ChatGatewayRouteNames.APPOINTMENT,
              component: OpenedChatGatewayWebchatAppointmentTab,
            },{
              path: 'alternative-channels',
              name: ChatGatewayRouteNames.ALTERNATIVE_CHANNELS,
              component: OpenedChatGatewayWebchatAlternativeChannelsTab,
            },{
              path: 'recapcha',
              name: ChatGatewayRouteNames.RE_CAPTCHA,
              component: OpenedChatGatewayWebchatRecaptchaTab,
            },{
              path: 'general',
              name: ChatGatewayRouteNames.GENERAL,
              component: OpenedChatGatewayCustomGeneralTab,
            },{
              path: 'templates',
              name: ChatGatewayRouteNames.TEMPLATES,
              component: OpenedChatGatewayTemplatesTab,
            },
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
        // {
        //   path: '/contact-center/agents',
        //   name: RouteNames.AGENTS,
        //   component: Agents,
        //   beforeEnter: checkRouteAccess,
        // },
        // {
        //   path: '/contact-center/agents/:id',
        //   name: `${RouteNames.AGENTS}-card`,
        //   component: OpenedAgent,
        //   beforeEnter: checkRouteAccess,
        // },
        ...AgentRoutes,
        {
          path: '/contact-center/teams',
          name: RouteNames.TEAMS,
          component: Teams,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/teams/:id',
          name: `${RouteNames.TEAMS}-card`,
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
          name: `${RouteNames.MEMBERS}-card`,
          component: OpenedMember,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/new/:type',
          name: `${RouteNames.QUEUES}-new`,
          component: OpenedQueue,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/contact-center/queues/:id/:type',
          name: `${RouteNames.QUEUES}-card`,
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
          path: '/integrations/cognitive-profiles/new',
          name: `${RouteNames.COGNITIVE_PROFILES}-new`,
          component: OpenedCognitiveProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/cognitive-profiles/:id',
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
          path: '/integrations/email-profiles/new',
          name: `${RouteNames.EMAIL_PROFILES}-new`,
          component: OpenedEmailProfile,
          beforeEnter: checkRouteAccess,
        },
        {
          path: '/integrations/email-profiles/:id',
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
          path: '/system/changelogs/:id',
          name: `${RouteNames.CHANGELOGS}-card`,
          redirect: { name: ChangelogRouteNamesEnum.GENERAl },
          component: OpenedChangelog,
          beforeEnter: checkRouteAccess,
          children: [
            {
              path: 'general',
              name: ChangelogRouteNamesEnum.GENERAl,
              component: OpenedChangelogGeneral,
            },{
              path: 'logs',
              name: ChangelogRouteNamesEnum.LOGS,
              component: OpenedChangelogLogs,
            }
          ],
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
