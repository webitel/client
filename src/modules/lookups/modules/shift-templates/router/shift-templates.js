import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import ShiftTemplatesRouteNameEnum
  from './_internals/ShiftTemplatesRouteName.enum.js';

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
    redirect: {name: ShiftTemplatesRouteNameEnum.GENERAL},
    component: OpenedShiftTemplate,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: ShiftTemplatesRouteNameEnum.GENERAL,
        component: OpenedShiftTemplateGeneral,
      },
      {
        path: 'times',
        name: ShiftTemplatesRouteNameEnum.TIMES,
        component: OpenedShiftTemplateTimes,
      }
    ],
  },
];
export default ShiftTemplatesRoutes;
