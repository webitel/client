import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import CognitiveProfilesRouteNames from './_internals/CognitiveProfilesRouteNames.enum.js';

const CognitiveProfiles = () => import('../components/the-cognitive-profiles.vue');
const OpenedCognitiveProfile = () => import('../components/opened-cognitive-profile.vue');

const Google = () => import('../components/google/opened-cognitive-profile-google.vue');
const Microsoft = () => import('../components/microsoft/opened-cognitive-profile-microsoft.vue');
const ElevenLabs = () => import('../components/eleven-labs/opened-cognitive-profile-eleven-labs.vue');
const Permissions = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const CognitiveProfilesRoutes = [
  {
    path: '/integrations/cognitive-profiles',
    name: RouteNames.COGNITIVE_PROFILES,
    component: CognitiveProfiles,
    meta: {
      WtObject: WtObject.CognitiveProfile,
      UiSection: AdminSections.CognitiveProfiles,
    },
  },
  {
    path: '/integrations/cognitive-profiles/:id',
    name: `${RouteNames.COGNITIVE_PROFILES}-card`,
    redirect: { name: CognitiveProfilesRouteNames.GENERAL },
    component: OpenedCognitiveProfile,
    meta: {
      WtObject: WtObject.CognitiveProfile,
      UiSection: AdminSections.CognitiveProfiles,
    },
    children: [
      {
        path: 'general',
        name: CognitiveProfilesRouteNames.GENERAL,
        component: Google,
      }, {
        path: 'general',
        name: CognitiveProfilesRouteNames.GENERAL,
        component: Microsoft,
      }, {
        path: 'general',
        name: CognitiveProfilesRouteNames.GENERAL,
        component: ElevenLabs,
      }, {
        path: 'permissions/:permissionId?',
        name: CognitiveProfilesRouteNames.PERMISSIONS,
        component: Permissions,
      }
    ],
  },
]

export default CognitiveProfilesRoutes;
