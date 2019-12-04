import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import login from '../components/auth/the-login';
import register from '../components/auth/the-register';

import moduleWrap from '../components/objects/the-object-wrap';
import home from '../components/objects/home/the-home';
import notFound from '../components/utils/the-not-found-component';
import permissionsRoles from '../components/objects/permissions/roles/the-roles';
import openedPermissionsRoles from '../components/objects/permissions/roles/opened-role';
import permissionsObjects from '../components/objects/permissions/objects/the-objects-permissions';
import openedPermissionsObjects from '../components/objects/permissions/objects/opened-object-permissions';
import devices from '../components/objects/directory/devices/the-devices';
import openedDevice from '../components/objects/directory/devices/opened-device';
import users from '../components/objects/directory/users/the-users';
import openedUser from '../components/objects/directory/users/opened-user';
import customers from '../components/objects/administration/license/the-customers';
import blacklists from '../components/objects/lookups/blacklists/the-blacklists';
import media from '../components/objects/lookups/media/the-media';
import openedBlacklist from '../components/objects/lookups/blacklists/opened-blacklist';
import calendars from '../components/objects/lookups/calendars/the-calendars';
import openedCalendar from '../components/objects/lookups/calendars/opened-calendar';
import leadStatus from '../components/objects/lookups/lead-status/the-lead-status';
import openedLeadStatus from '../components/objects/lookups/lead-status/opened-lead-status';
import leadSource from '../components/objects/lookups/lead-source/the-lead-source';
import openedLeadSource from '../components/objects/lookups/lead-source/opened-lead-source';
import communicationTypes from '../components/objects/lookups/communication-types/the-communication-types';
import openedCommunicationType from '../components/objects/lookups/communication-types/opened-communication-type';
import contactType from '../components/objects/lookups/contact-type/the-contact-type';
import openedContactType from '../components/objects/lookups/contact-type/opened-contact-type';
import sipGateways from '../components/objects/routing/sip-gateways/the-sip-gateways';
import openedRegGateway from '../components/objects/routing/sip-gateways/opened-register-sip-gateway';
import openedTrunkGateway from '../components/objects/routing/sip-gateways/opened-trunking-sip-gateway';
import flow from '../components/objects/routing/flow/the-flow';
import openedFlow from '../components/objects/routing/flow/opened-flow';
import dialplan from '../components/objects/routing/dialplan/the-dialplan';
import openedDialplan from '../components/objects/routing/dialplan/opened-dialplan';
import theResources from '../components/objects/contact-center/resources/the-resources';
import openedResource from '../components/objects/contact-center/resources/opened-resource';
import resourceGroups from '../components/objects/contact-center/resource-groups/the-resource-groups';
import openedResourceGroup from '../components/objects/contact-center/resource-groups/opened-resource-group';
import agents from '../components/objects/contact-center/agents/the-agents';
import openedAgent from '../components/objects/contact-center/agents/opened-agent';
import teams from '../components/objects/contact-center/teams/the-teams';
import openedTeam from '../components/objects/contact-center/teams/opened-team';
import agentSkills from '../components/objects/contact-center/agent-skills/the-agent-skills';
import openedAgentSkill from '../components/objects/contact-center/agent-skills/opened-agent-skill';
import buckets from '../components/objects/contact-center/buckets/the-buckets';
import openedBucket from '../components/objects/contact-center/buckets/opened-bucket';
import queues from '../components/objects/contact-center/queues/the-queues';
import openedQueueOutboundIVR from '../components/objects/contact-center/queues/outboundIVRQueue/opened-queue-outbound-ivr';
import openedQueueInbound from '../components/objects/contact-center/queues/inboundQueue/opened-queue-inbound-queue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/register',
            name: 'register',
            component: register
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

                {
                    path:'/lookups/contact-type',
                    name: 'contact-type-lookup',
                    component: contactType
                },
                {
                    path:'/lookups/contact-type/new',
                    name: 'contact-type-lookup-new',
                    component: openedContactType
                },
                {
                    path:'/lookups/contact-type/:id',
                    name: 'contact-type-lookup-edit',
                    component: openedContactType
                },

                {
                    path:'/lookups/lead-source',
                    name: 'lead-source-lookup',
                    component: leadSource
                },
                {
                    path:'/lookups/lead-source/new',
                    name: 'lead-source-lookup-new',
                    component: openedLeadSource
                },
                {
                    path:'/lookups/lead-source/:id',
                    name: 'lead-source-lookup-edit',
                    component: openedLeadSource
                },

                {
                    path:'/lookups/lead-status',
                    name: 'lead-status-lookup',
                    component: leadStatus
                },
                {
                    path:'/lookups/lead-status/new',
                    name: 'lead-status-lookup-new',
                    component: openedLeadStatus
                },
                {
                    path:'/lookups/lead-status/:id',
                    name: 'lead-status-lookup-edit',
                    component: openedLeadStatus
                },
                // ----------LOOKUPS END------------



                // --------------ADMINISTRATION-------------
                {
                    path:'/administration/license',
                    name: 'administration-customers',
                    component: customers
                },
                // --------------ADMINISTRATION END-------------



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
                    path:'/contact-center/resource/new',
                    name: 'cc-resource-new',
                    component: openedResource
                },
                {
                    path:'/contact-center/resource/:id',
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
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/inbound-queue/:id',
                    name: 'cc-queue-inbound-queue-edit',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/offline-queue/new',
                    name: 'cc-queue-offline-queue-new',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/offline-queue/:id',
                    name: 'cc-queue-offline-queue-edit',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/preview-dialer/new',
                    name: 'cc-queue-preview-dialer-new',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/preview-dialer/:id',
                    name: 'cc-queue-preview-dialer-edit',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/predictive-dialer/new',
                    name: 'cc-queue-predictive-dialer-new',
                    component: openedQueueOutboundIVR
                },
                {
                    path:'/contact-center/queues/predictive-dialer/:id',
                    name: 'cc-queue-predictive-dialer-edit',
                    component: openedQueueOutboundIVR
                },
                // --------------CONTACT CENTER END-------------



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

// router.beforeEach((to, from, next) => {
//     if(!(to.fullPath === '/login' || to.fullPath === '/register')) {
//         if (!localStorage.getItem('access-token')) {
//             console.log('if');
//             next('/login');
//         }
//     }
//     next();
// });


export default router;