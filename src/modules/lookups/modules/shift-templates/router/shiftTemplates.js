import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

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
    meta: {
      WtObject: WtObject.ShiftTemplate,
      UiSection: AdminSections.ShiftTemplates,
    },
  },
  {
    path: '/lookups/shift-templates/:id',
    name: `${RouteNames.SHIFT_TEMPLATES}-card`,
    redirect: { name: ShiftTemplatesRouteNames.GENERAL },
    component: OpenedShiftTemplate,
    meta: {
      WtObject: WtObject.ShiftTemplate,
      UiSection: AdminSections.ShiftTemplates,
    },
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
