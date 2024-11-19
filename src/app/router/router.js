import { createRouter, createWebHistory } from 'vue-router';
import { checkAppAccess, checkRouteAccess } from './_internals/guards.js';

import CognitiveProfilesRoutes from '../../modules/integrations/modules/cognitive-profiles/router/cognitiveProfiles.js';
import EmailProfilesRoutes from '../../modules/integrations/modules/email-profiles/router/emailProfiles.js';
import ImportCsvRoutes from '../../modules/integrations/modules/import-csv/router/importCsv.js';
import TriggersRoutes from '../../modules/integrations/modules/triggers/router/triggers.js';
import RolesRoutes from '../../modules/permissions/modules/roles/router/roles.js';
import ChangeLogsRoutes from '../../modules/system/modules/changelogs/router/changelogs.js';
import ConfigurationRoutes from '../../modules/system/modules/configuration/router/configuration.js';
import GlobalVariablesRoutes from '../../modules/system/modules/global-variables/router/globalVariables.js';
import RouteNames from './_internals/RouteNames.enum';
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
import ChatplanRoutes from "../../modules/routing/modules/chatplan/router/chatplan.js";
import DialplanRoutes from "../../modules/routing/modules/dialplan/router/dialplan.js";
import GatewaysRoutes from "../../modules/routing/modules/gateways/router/gateways.js";
import AgentSkillsRoutes from "../../modules/lookups/modules/agent-skills/router/agentSkills.js";
import BucketsRoutes from "../../modules/lookups/modules/buckets/router/buckets.js";
import BlacklistsRoutes from "../../modules/lookups/modules/blacklists/router/blacklists.js";
import MediaRoutes from "../../modules/lookups/modules/media/router/media.js";
import ShiftTemplatesRoutes from "../../modules/lookups/modules/shift-templates/router/shiftTemplates.js";
import CalendarsRoutes from "../../modules/lookups/modules/calendars/router/calendars.js";
import CommunicationsRoutes from "../../modules/lookups/modules/communications/router/communications.js";
import RegionsRoutes from "../../modules/lookups/modules/regions/router/regions.js";
import AgentPauseCauseRoutes from "../../modules/lookups/modules/agent-pause-cause/router/agentPauseCause.js";
import PauseTemplatesRoutes from "../../modules/lookups/modules/pause-templates/router/pauseTemplates.js";
import WorkingConditionsRoutes
  from '../../modules/lookups/modules/working-conditions/router/workingConditions.js';

const ApplicationHub = () => import('../../modules/application-hub/components/application-hub.vue');
const ModuleWrap = () => import('../../modules/_shared/object-wrap/the-object-wrap.vue');
const StartPage = () => import('../../modules/start-page/components/the-start-page.vue');
const Settings = () => import('../../modules/settings/components/the-settings.vue');
const AccessDenied = () => import('../../modules/error-pages/components/the-access-denied-component.vue');
const NotFound = () => import('../../modules/error-pages/components/the-not-found-component.vue');

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
        {
          path: '/:pathMatch(.*)*',
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
        // ...ShiftTemplatesRoutes,
        // ...PauseTemplatesRoutes,
        // ...WorkingConditionsRoutes,
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

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access-token') && !to.query.accessToken) {
    const desiredUrl = encodeURIComponent(window.location.href);
    const authUrl = import.meta.env.VITE_AUTH_URL;
    window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
  } else if (to.query.accessToken) {
    // assume that access token was set from query before app initialization in main.js
    const newQuery = { ...to.query };
    newQuery.accessToken = undefined;
    next({ ...to, query: newQuery });
  } else {
    next();
  }
});

export default router;
