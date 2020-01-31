import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import auth from '../components/auth/the-auth';

import moduleWrap from '../components/object-utils/the-object-wrap';
import home from '../components/home/the-home';
import settings from '../components/the-settings';
import notFound from '../components/utils/the-not-found-component';
import permissionsRoles from '../components/permissions/roles/the-roles';
import openedPermissionsRoles from '../components/permissions/roles/opened-role';
import permissionsObjects from '../components/permissions/objects/the-objects-permissions';
import openedPermissionsObjects from '../components/permissions/objects/opened-object-permissions';
import devices from '../components/directory/devices/the-devices';
import openedDevice from '../components/directory/devices/opened-device';
import users from '../components/directory/users/the-users';
import openedUser from '../components/directory/users/opened-user';
import license from '../components/directory/license/the-license';
import blacklists from '../components/lookups/blacklists/the-blacklists';
import media from '../components/lookups/media/the-media';
import openedBlacklist from '../components/lookups/blacklists/opened-blacklist';
import calendars from '../components/lookups/calendars/the-calendars';
import openedCalendar from '../components/lookups/calendars/opened-calendar';
import leadStatus from '../components/lookups/lead-status/the-lead-status';
import openedLeadStatus from '../components/lookups/lead-status/opened-lead-status';
import leadSource from '../components/lookups/lead-source/the-lead-source';
import openedLeadSource from '../components/lookups/lead-source/opened-lead-source';
import communicationTypes from '../components/lookups/communication-types/the-communication-types';
import openedCommunicationType from '../components/lookups/communication-types/opened-communication-type';
import contactType from '../components/lookups/contact-type/the-contact-type';
import openedContactType from '../components/lookups/contact-type/opened-contact-type';
import sipGateways from '../components/routing/sip-gateways/the-sip-gateways';
import openedRegGateway from '../components/routing/sip-gateways/opened-register-sip-gateway';
import openedTrunkGateway from '../components/routing/sip-gateways/opened-trunking-sip-gateway';
import flow from '../components/routing/flow/the-flow';
import openedFlow from '../components/routing/flow/opened-flow';
import dialplan from '../components/routing/dialplan/the-dialplan';
import openedDialplan from '../components/routing/dialplan/opened-dialplan';
import theResources from '../components/contact-center/resources/the-resources';
import openedResource from '../components/contact-center/resources/opened-resource';
import resourceGroups from '../components/contact-center/resource-groups/the-resource-groups';
import openedResourceGroup from '../components/contact-center/resource-groups/opened-resource-group';
import agents from '../components/contact-center/agents/the-agents';
import openedAgent from '../components/contact-center/agents/opened-agent';
import teams from '../components/contact-center/teams/the-teams';
import openedTeam from '../components/contact-center/teams/opened-team';
import agentSkills from '../components/contact-center/agent-skills/the-agent-skills';
import openedAgentSkill from '../components/contact-center/agent-skills/opened-agent-skill';
import buckets from '../components/contact-center/buckets/the-buckets';
import openedBucket from '../components/contact-center/buckets/opened-bucket';
import queues from '../components/contact-center/queues/the-queues';
import members from '../components/contact-center/members/the-queue-members';
import openedMember from '../components/contact-center/members/opened-queue-member';
import openedQueueOutboundIVR from '../components/contact-center/queues/outbound-ivr-queue/opened-queue-outbound-ivr';
import openedQueueInbound from '../components/contact-center/queues/inbound-queue/opened-queue-inbound-queue';
import openedQueueOfflineQueue from '../components/contact-center/queues/offline-queue/opened-queue-offline-queue';
import openedQueuePreviewDialer from '../components/contact-center/queues/preview-dialer/opened-queue-preview-dialer';
import openedQueueProgressiveDialer from '../components/contact-center/queues/progressive-dialer/opened-queue-progressive-dialer';
import openedQueuePredictiveDialer from '../components/contact-center/queues/predictive-dialer/opened-queue-predictive-dialer';
import triggers from '../components/integrations/triggers/the-triggers';
import openedTriggerOnEvent from '../components/integrations/triggers/opened-trigger-on-event';
import openedTriggerAtTime from '../components/integrations/triggers/opened-trigger-at-time';
import tokens from '../components/integrations/tokens/the-tokens';
import openedToken from '../components/integrations/tokens/opened-token';
import storage from '../components/integrations/storage/the-storage';
import openedStorage from '../components/integrations/storage/opened-storage';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: auth,
        },
        {
            path: '/',
            component: moduleWrap,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: home
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: settings
                },

                // ----------DIRECTORY------------
                {
                    path:'directory/devices',
                    name: 'directory-devices',
                    component: devices
                },
                {
                    path:'/directory/devices/:id',
                    name: 'directory-devices-edit',
                    component: openedDevice
                },
                {
                    path:'/directory/devices/new',
                    name: 'directory-devices-new',
                    component: openedDevice
                },
                {
                    path:'/directory/license',
                    name: 'license',
                    component: license
                },
                {
                    path: '/directory/users',
                    name: 'directory-users',
                    component: users
                },
                {
                    path:'/directory/users/:id',
                    name: 'directory-users-edit',
                    component: openedUser
                },
                {
                    path:'/directory/users/new',
                    name: 'directory-users-new',
                    component: openedUser
                },
                // ----------DIRECTORY END------------


                // ----------ROUTING------------
                {
                    path: '/routing/flow',
                    name: 'flow',
                    component: flow,
                },
                {
                    path: '/routing/flow/new',
                    name: 'flow-new',
                    component: openedFlow,
                },
                {
                    path: '/routing/flow/:id',
                    name: 'flow-edit',
                    component: openedFlow,
                },
                {
                    path: '/routing/dialplan',
                    name: 'dialplan',
                    component: dialplan,
                },
                {
                    path: '/routing/dialplan/new',
                    name: 'dialplan-new',
                    component: openedDialplan,
                },
                {
                    path: '/routing/dialplan/:id',
                    name: 'dialplan-edit',
                    component: openedDialplan,
                },
                {
                    path:'/routing/gateways',
                    name: 'sip-gateways',
                    component: sipGateways
                },
                {
                    path:'/routing/gateways/register/new',
                    name: 'reg-gateway-new',
                    component: openedRegGateway
                },
                {
                    path:'/routing/gateways/register/:id',
                    name: 'reg-gateway-edit',
                    component: openedRegGateway
                },
                {
                    path:'/routing/gateways/trunking/new',
                    name: 'trunk-gateway-new',
                    component: openedTrunkGateway
                },
                {
                    path:'/routing/gateways/trunking/:id',
                    name: 'trunk-gateway-edit',
                    component: openedTrunkGateway
                },
                // ----------ROUTING END------------


                // ----------LOOKUPS------------
                {
                    path:'/lookups/blacklist',
                    name: 'blacklists',
                    component: blacklists
                },
                {
                    path:'/lookups/blacklist/new',
                    name: 'blacklist-new',
                    component: openedBlacklist
                },
                {
                    path:'/lookups/blacklist/:id',
                    name: 'blacklist-edit',
                    component: openedBlacklist
                },
                {
                    path:'/lookups/media',
                    name: 'media',
                    component: media
                },

                {
                    path:'/lookups/calendars',
                    name: 'calendars-lookup',
                    component: calendars
                },
                {
                    path:'/lookups/calendars/new',
                    name: 'calendars-new',
                    component: openedCalendar
                },
                {
                    path:'/lookups/calendars/:id',
                    name: 'calendars-edit',
                    component: openedCalendar
                },

                {
                    path:'/lookups/communications',
                    name: 'communications-lookup',
                    component: communicationTypes
                },
                {
                    path:'/lookups/communications/new',
                    name: 'communications-lookup-new',
                    component: openedCommunicationType
                },
                {
                    path:'/lookups/communications/:id',
                    name: 'communications-lookup-edit',
                    component: openedCommunicationType
                },
                // ----------LOOKUPS END------------


                // --------------CONTACT CENTER-------------
                {
                    path:'/contact-center/skills',
                    name: 'cc-skills',
                    component: agentSkills
                },
                {
                    path:'/contact-center/skills/new',
                    name: 'cc-skill-new',
                    component: openedAgentSkill
                },
                {
                    path:'/contact-center/skills/:id',
                    name: 'cc-skill-edit',
                    component: openedAgentSkill
                },
                {
                    path:'/contact-center/agents',
                    name: 'cc-agents',
                    component: agents
                },
                {
                    path:'/contact-center/agents/new',
                    name: 'cc-agent-new',
                    component: openedAgent
                },
                {
                    path:'/contact-center/agents/:id',
                    name: 'cc-agent-edit',
                    component: openedAgent
                },
                {
                    path:'/contact-center/teams',
                    name: 'cc-teams',
                    component: teams
                },
                {
                    path:'/contact-center/teams/new',
                    name: 'cc-team-new',
                    component: openedTeam
                },
                {
                    path:'/contact-center/teams/:id',
                    name: 'cc-team-edit',
                    component: openedTeam
                },
                {
                    path:'/contact-center/resources',
                    name: 'cc-resources',
                    component: theResources
                },
                {
                    path:'/contact-center/resources/new',
                    name: 'cc-resource-new',
                    component: openedResource
                },
                {
                    path:'/contact-center/resources/:id',
                    name: 'cc-resource-edit',
                    component: openedResource
                },
                {
                    path:'/contact-center/resource-groups',
                    name: 'cc-resource-groups',
                    component: resourceGroups
                },
                {
                    path:'/contact-center/resource-groups/new',
                    name: 'cc-resource-group-new',
                    component: openedResourceGroup
                },
                {
                    path:'/contact-center/resource-groups/:id',
                    name: 'cc-resource-group-edit',
                    component: openedResourceGroup
                },
                {
                    path:'/contact-center/buckets',
                    name: 'cc-buckets',
                    component: buckets
                },
                {
                    path:'/contact-center/buckets/new',
                    name: 'cc-bucket-new',
                    component: openedBucket
                },
                {
                    path:'/contact-center/bucket/:id',
                    name: 'cc-bucket-edit',
                    component: openedBucket
                },
                {
                    path:'/contact-center/queues',
                    name: 'cc-queues',
                    component: queues
                },
                {
                    path:'/contact-center/queues/:queueId/members',
                    name: 'cc-queue-members',
                    component: members
                },
                {
                    path:'/contact-center/queues/:queueId/members/new',
                    name: 'cc-queue-member-new',
                    component: openedMember
                },
                {
                    path:'/contact-center/queues/:queueId/members/:id',
                    name: 'cc-queue-member-edit',
                    component: openedMember
                },
                {
                    path:'/contact-center/queues/outbound-ivr/new',
                    name: 'cc-queue-outbound-ivr-new',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/outbound-ivr/:id',
                    name: 'cc-queue-outbound-ivr-edit',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/inbound-queue/new',
                    name: 'cc-queue-inbound-queue-new',
                    component: openedQueueInbound
                },
                {
                    path:'/contact-center/queues/inbound-queue/:id',
                    name: 'cc-queue-inbound-queue-edit',
                    component: openedQueueInbound
                },
                {
                    path:'/contact-center/queues/offline-queue/new',
                    name: 'cc-queue-offline-queue-new',
                    component: openedQueueOfflineQueue
                },
                {
                    path:'/contact-center/queues/offline-queue/:id',
                    name: 'cc-queue-offline-queue-edit',
                    component: openedQueueOfflineQueue
                },
                {
                    path:'/contact-center/queues/preview-dialer/new',
                    name: 'cc-queue-preview-dialer-new',
                    component: openedQueuePreviewDialer
                },
                {
                    path:'/contact-center/queues/preview-dialer/:id',
                    name: 'cc-queue-preview-dialer-edit',
                    component: openedQueuePreviewDialer
                },
                {
                    path:'/contact-center/queues/progressive-dialer/new',
                    name: 'cc-queue-progressive-dialer-new',
                    component: openedQueueProgressiveDialer
                },
                {
                    path:'/contact-center/queues/progressive-dialer/:id',
                    name: 'cc-queue-progressive-dialer-edit',
                    component: openedQueueProgressiveDialer
                },
                {
                    path:'/contact-center/queues/predictive-dialer/new',
                    name: 'cc-queue-predictive-dialer-new',
                    component: openedQueuePredictiveDialer
                },
                {
                    path:'/contact-center/queues/predictive-dialer/:id',
                    name: 'cc-queue-predictive-dialer-edit',
                    component: openedQueuePredictiveDialer
                },
                // --------------CONTACT CENTER END-------------



                // ----------INTEGRATIONS-----------------
                {
                    path: '/integrations/storage',
                    name: 'storage',
                    component: storage,
                },
                {
                    path: '/integrations/storage/:type/new',
                    name: 'storage-new',
                    component: openedStorage
                },
                {
                    path: '/integrations/storage/:type/:id',
                    name: 'storage-edit',
                    component: openedStorage
                },
                // --------------INTEGRATIONS END-------------



                // ----------PERMISSIONS-----------------
                {
                    path: '/permissions/roles',
                    name: 'permissions-roles',
                    component: permissionsRoles,
                },
                {
                    path: '/permissions/roles/:id',
                    name: 'permissions-roles-edit',
                    component: openedPermissionsRoles
                },
                {
                    path: '/permissions/roles/new',
                    name: 'permissions-roles-new',
                    component: openedPermissionsRoles
                },
                {
                    path: '/permissions/objects',
                    name: 'permissions-objects',
                    component: permissionsObjects
                },
                {
                    path: '/permissions/objects/:id',
                    name: 'permissions-objects-edit',
                    component: openedPermissionsObjects,
                },
                // ----------PERMISSIONS END-----------------
            ]
        },
        {
            path: '*',
            name: 'not-found',
            component: notFound
        }
    ],
});

router.beforeEach((to, from, next) => {
    if(!(to.fullPath === '/auth')) {
        if (!localStorage.getItem('access-token')) {
            next('/auth');
        }
    }
    next();
});


export default router;