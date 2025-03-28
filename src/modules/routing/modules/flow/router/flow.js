import {checkRouteAccess} from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import FlowRouteNames from './_internals/FlowRouteNames.enum.js';

const Flow = () => import('../components/the-flow.vue');
const OpenedFlow = () => import('../components/opened-flow.vue');
const OpenedFlowDiagram = () => import('../modules/diagram/components/opened-flow-diagram.vue');

const FlowRoutes= [
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
];
export default FlowRoutes;
