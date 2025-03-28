import { checkRouteAccess } from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import PauseTemplatesRouteNames
  from './_internals/PauseTemplatesRouteNames.enum.js';

const PauseTemplates = () => import('../components/the-pause-templates.vue');
const OpenedPauseTemplate = () => import('../components/opened-pause-template.vue');

const OpenedPauseTemplateGeneral = () => import('../components/opened-pause-template-general.vue');
const OpenedPauseTemplateCauses = () => import('../components/opened-pause-template-causes.vue');


const PauseTemplatesRoutes = [
  {
    path: '/lookups/pause-templates',
    name: RouteNames.PAUSE_TEMPLATES,
    component: PauseTemplates,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/pause-templates/:id',
    name: `${RouteNames.PAUSE_TEMPLATES}-card`,
    redirect: {
      name: PauseTemplatesRouteNames.GENERAL
    },
    component: OpenedPauseTemplate,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: PauseTemplatesRouteNames.GENERAL,
        component: OpenedPauseTemplateGeneral,
      },
      {
        path: 'template',
        name: PauseTemplatesRouteNames.CAUSES,
        component: OpenedPauseTemplateCauses,
      }
    ],
  },
];
export default PauseTemplatesRoutes;
