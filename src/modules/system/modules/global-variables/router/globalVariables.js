import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';

const GlobalVariables = () => import('../components/the-global-variables.vue');

const GlobalVariablesRoutes = [
  {
    path: '/system/global-variables/:id?',
    name: RouteNames.GLOBAL_VARIABLES,
    component: GlobalVariables,
    meta: {
      WtObject: WtObject.GlobalVariable,
      UiSection: AdminSections.GlobalVariables,
    },
  },
];
export default GlobalVariablesRoutes
