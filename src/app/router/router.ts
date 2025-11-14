import { createRouter, createWebHistory } from 'vue-router';
import i18n from '../../app/locale/i18n';
import { eventBus } from '@webitel/ui-sdk/scripts';
import { nextTick } from 'vue';

import AgentRoutes from '../../modules/contact-center/modules/agents/router/agents.js';
import QueuesRoutes from '../../modules/contact-center/modules/queues/router/queues.js';
import ResourcesGroupRoutes from '../../modules/contact-center/modules/resource-groups/router/resourceGroup.js';
import ResourcesRoutes from '../../modules/contact-center/modules/resources/router/resources.js';
import TeamsRoutes from '../../modules/contact-center/modules/teams/router/teams.js';
import DevicesRoutes from '../../modules/directory/modules/devices/router/devices.js';
import LicenseRoutes from '../../modules/directory/modules/license/router/license.js';
import UsersRoutes from '../../modules/directory/modules/users/routes/routes.js';
import CognitiveProfilesRoutes from '../../modules/integrations/modules/cognitive-profiles/router/cognitiveProfiles.js';
import EmailProfilesRoutes from '../../modules/integrations/modules/email-profiles/router/emailProfiles.js';
import ImportCsvRoutes from '../../modules/integrations/modules/import-csv/router/importCsv.js';
import StorageRoutes from '../../modules/integrations/modules/storage/router/storage.js';
import StoragePoliciesRoutes from '../../modules/integrations/modules/storage-policies/router/storage-policies.js';
import TriggersRoutes from '../../modules/integrations/modules/triggers/router/triggers.js';
import AgentPauseCauseRoutes from '../../modules/lookups/modules/agent-pause-cause/router/agentPauseCause.js';
import AgentSkillsRoutes from '../../modules/lookups/modules/agent-skills/router/agentSkills.js';
import BlacklistsRoutes from '../../modules/lookups/modules/blacklists/router/blacklists.js';
import BucketsRoutes from '../../modules/lookups/modules/buckets/router/buckets.js';
import CalendarsRoutes from '../../modules/lookups/modules/calendars/router/calendars.js';
import CommunicationsRoutes from '../../modules/lookups/modules/communications/router/communications.js';
import MediaRoutes from '../../modules/lookups/modules/media/router/media.js';
import PauseTemplatesRoutes from '../../modules/lookups/modules/pause-templates/router/pauseTemplates.js';
import QuickRepliesRoutes from '../../modules/lookups/modules/quick-replies/router/quickReplies.js';
import RegionsRoutes from '../../modules/lookups/modules/regions/router/regions.js';
import ShiftTemplatesRoutes from '../../modules/lookups/modules/shift-templates/router/shiftTemplates.js';
import WorkingConditionsRoutes from '../../modules/lookups/modules/working-conditions/router/workingConditions.js';
import ObjectsRoutes from '../../modules/permissions/modules/objects/router/objects.js';
import RolesRoutes from '../../modules/permissions/modules/roles/router/roles.js';
import ChatGetewaysRoutes from '../../modules/routing/modules/chat-gateways/router/chatGeteways.js';
import ChatplanRoutes from '../../modules/routing/modules/chatplan/router/chatplan.js';
import DialplanRoutes from '../../modules/routing/modules/dialplan/router/dialplan.js';
import FlowRoutes from '../../modules/routing/modules/flow/router/flow.js';
import GatewaysRoutes from '../../modules/routing/modules/gateways/router/gateways.js';
import ChangeLogsRoutes from '../../modules/system/modules/changelogs/router/changelogs.js';
import ConfigurationRoutes from '../../modules/system/modules/configuration/router/configuration.js';
import GlobalVariablesRoutes from '../../modules/system/modules/global-variables/router/globalVariables.js';
import { checkAppAccess } from './_internals/guards.js';
import RouteNames from './_internals/RouteNames.enum.js';
import RoutePaths from './_internals/RoutePaths'

const ApplicationHub = () =>
  import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () =>
  import('../../modules/_shared/object-wrap/the-object-wrap.vue');
const StartPage = () =>
  import('../../modules/start-page/components/the-start-page.vue');
const Settings = () =>
  import('../../modules/settings/components/the-settings.vue');
const AccessDenied = () =>
  import(
    '../../modules/error-pages/components/the-access-denied-component.vue'
  );
const NotFound = () =>
  import('../../modules/error-pages/components/the-not-found-component.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(/*to, from, savedPosition*/) {
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
      redirect: RoutePaths.StartPage,
      beforeEnter: checkAppAccess,
      children: [
        {
          path: RoutePaths.StartPage,
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
        {
          path: '/:pathMatch(.*)*',
          name: RouteNames.PAGE_404,
          component: NotFound,
        },
        {
          path: '/404',
          name: RouteNames.PAGE_404,
          component: NotFound,
        },

        // ----------DIRECTORY------------
        ...DevicesRoutes,
        ...LicenseRoutes,
        ...UsersRoutes,
        // ----------DIRECTORY END------------

        // ----------ROUTING------------
        ...FlowRoutes,
        ...ChatGetewaysRoutes,
        ...DialplanRoutes,
        ...GatewaysRoutes,
        ...ChatplanRoutes,
        // ----------ROUTING END------------

        // ----------LOOKUPS------------
        ...AgentSkillsRoutes,
        ...BucketsRoutes,
        ...BlacklistsRoutes,
        ...MediaRoutes,
        ...CalendarsRoutes,
        ...CommunicationsRoutes,
        ...RegionsRoutes,
        ...AgentPauseCauseRoutes,
        ...ShiftTemplatesRoutes,
        ...PauseTemplatesRoutes,
        ...WorkingConditionsRoutes,
        ...QuickRepliesRoutes,
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
        ...StoragePoliciesRoutes,
        // Unused routes for unused integrations/single-sign-on module
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
        // ----------SYSTEM END-----------------
      ],
    },
  ],
});

router.beforeEach((to) => {
  if (!localStorage.getItem('access-token') && !to.query.accessToken) {
    const desiredUrl = encodeURIComponent(window.location.href);
    const authUrl = import.meta.env.VITE_AUTH_URL;
    window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
  } else if (to.query.accessToken) {
    // assume that access token was set from query before app initialization in main.js
    const newQuery = { ...to.query };
    newQuery.accessToken = undefined;
    return { ...to, query: newQuery };
  }
  return true;
});

window.router = router;

export default router;
