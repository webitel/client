import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import DevicesRouteNames from './_internals/DevicesRouteNames.enum.js';

const Devices = () => import('../components/the-devices.vue');
const OpenedDevice = () => import('../components/opened-device.vue');
const OpenedDeviceGeneral = () => import('../components/opened-device-general.vue');
const OpenedDevicePhoneInfo = () => import('../components/opened-device-phone-info.vue');
const OpenedHotdeskDeviceGeneral = () => import('../components/opened-hotdesk-device-general.vue');
const OpenedHotdeskDeviceHotdesking = () => import('../components/opened-hotdesk-device-hotdesking.vue');
const PermissionsTab = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const DevicesRoutes = [
  {
    path: '/directory/devices',
    name: RouteNames.DEVICES,
    component: Devices,
    meta: {
      WtObject: WtObject.Device,
      UiSection: AdminSections.Devices,
    },
    children: [
      {
        path: 'history/:historyId',
        name: DevicesRouteNames.HISTORY,
        component: Devices,
      },
    ],
  },
  {
    path: '/directory/devices/:id',
    name: `${RouteNames.DEVICES}-card`,
    redirect: { name: DevicesRouteNames.GENERAL },
    component: OpenedDevice,
    meta: {
      WtObject: WtObject.Device,
      UiSection: AdminSections.Devices,
    },
    children: [
      {
        path: 'general',
        name: DevicesRouteNames.GENERAL,
        component: OpenedDeviceGeneral,
      }, {
        path: 'phone-info',
        name: DevicesRouteNames.PHONE_INFO,
        component: OpenedDevicePhoneInfo,
      }, {
        path: 'general',
        name: DevicesRouteNames.GENERAL,
        component: OpenedHotdeskDeviceGeneral,
      }, {
        path: 'hotdesking',
        name: DevicesRouteNames.HOTDESKING,
        component: OpenedHotdeskDeviceHotdesking,
      }, {
        path: 'permissions/:permissionId?',
        name: `${DevicesRouteNames.PERMISSIONS}-card`,
        component: PermissionsTab,
      },
    ],
  },
]

export default DevicesRoutes;
