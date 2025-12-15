import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import GatewaysRouteNames from "./_internals/GatewaysRouteNames.enum.js";

const SipGateways = () => import('../components/the-sip-gateways.vue');
const OpenedGateway = () => import('../components/opened-sip-gateway.vue');

const OpenedRegisterSipGatewayGeneral = () => import('../components/opened-register-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayGeneral = () => import('../components/opened-trunking-sip-gateway-general.vue');
const OpenedTrunkingSipGatewayConfiguration =  () => import('../components/opened-trunking-sip-gateway-configuration.vue');


const GatewaysRoutes = [
  {
    path: '/routing/gateways',
    name: RouteNames.GATEWAYS,
    component: SipGateways,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/routing/gateways/:id',
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
];
export default GatewaysRoutes;
