import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import ShiftTemplatesRouteNames
  from './_internals/ShiftTemplatesRouteNames.enum.js';

const ShiftTemplates = () => import('../components/the-shift-templates.vue');
const OpenedShiftTemplate = () => import('../components/opened-shift-template.vue');

const OpenedShiftTemplateGeneral = () => import('../components/opened-shift-template-general.vue');
const OpenedShiftTemplateTimes = () => import('../components/opened-shift-template-times.vue');


const ShiftTemplatesRoutes = [
  {
    path: '/lookups/shift-templates',
    name: RouteNames.SHIFT_TEMPLATES,
    component: ShiftTemplates,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/shift-templates/:id',
    name: `${RouteNames.SHIFT_TEMPLATES}-card`,
    redirect: {name: ShiftTemplatesRouteNames.GENERAL},
    component: OpenedShiftTemplate,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: ShiftTemplatesRouteNames.GENERAL,
        component: OpenedShiftTemplateGeneral,
      },
      {
        path: 'times',
        name: ShiftTemplatesRouteNames.TIMES,
        component: OpenedShiftTemplateTimes,
      }
    ],
  },
];
export default ShiftTemplatesRoutes;
