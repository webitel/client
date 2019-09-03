<template>
    <aside class="the-nav__wrap">
        <nav class="the-nav" :class="{'expanded-nav': computeNavExpansion}" @mouseleave="expandItem">
            <div class="logo" @click="$router.push('/')">
                <img class="logo-sm__img" src="../assets/img/logo-sm.svg" alt="logo">
                <img class="logo__img" src="../assets/img/logo.svg" alt="logo">
            </div>
            <ul class="nav-items">
                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.directory,
                         'nav-item__current': currentRoute.directory
                         }"
                        @click="expandItem('directory')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Directory</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.directory">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.users
                                 }"
                                @click="navigate('/directory/users')"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Users</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.devices
                                 }"
                                @click="navigate('/directory/devices')"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Devices</span>
                        </li>
                    </ul>
                </li>

                <li class="nav-item-wrap">
                    <div class="nav-item" @click="navigate">
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Contacts</span>
                    </div>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.routing,
                         'nav-item__current': currentRoute.routing
                         }"
                        @click="expandItem('routing')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Routing</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.routing">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.sipEndpoints
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">SIP Endpoints</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.flowsManager
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Flows manager</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.dialplan
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Dialplan</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.chatplan
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Chatplan</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.lookups,
                         'nav-item__current': currentRoute.lookups
                         }"
                        @click="expandItem('lookups')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Lookups</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.lookups">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.agentSkills
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Agent skills</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.calendars
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Calendars</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.communications
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Communications</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.contactType
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Contact type</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.leadSource
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Lead source</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.leadStatus
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Lead status</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.contactCenter,
                         'nav-item__current': currentRoute.contactCenter
                         }"
                        @click="expandItem('contactCenter')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Contact center</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.contactCenter">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.dashboard
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Dashboard</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.agents
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Agents</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.resources
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Resourses</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.queues
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Queues</span>
                        </li>
                    </ul>
                </li>

                <li class="nav-item-wrap">
                    <div class="nav-item" @click="navigate">
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Kibana</span>
                    </div>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.integrations,
                         'nav-item__current': currentRoute.integrations
                         }"
                        @click="expandItem('integrations')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Integrations</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.integrations">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.apiTokens
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">API tokens</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.accounts
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Accounts</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.webhooks
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Webhooks</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.siteWidgets
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Site Wigets</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.callTracking
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Call tracking</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.administration,
                         'nav-item__current': currentRoute.administration
                         }"
                        @click="expandItem('administration')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Administration</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.administration">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.license
                                 }"
                                @click="navigate('/administration/license')"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">License</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.storage
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Storage</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.mediaFiles
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Media files</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.blacklists
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Blacklists</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.ADFS
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">ADFS OAuth2</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{
                        'nav-item__expanded': expanded.permissions,
                         'nav-item__current': currentRoute.permissions
                         }"
                        @click="expandItem('permissions')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Permissions</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.permissions">
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.roles
                                 }"
                                @click="navigate('/permissions/roles')"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Roles</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.objects
                                 }"
                                @click="navigate('/permissions/objects')"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Objects</span>
                        </li>
                        <li
                                class="subnav-item"
                                :class="{
                                    'nav-item__current': currentRouteItem.operations
                                 }"
                                @click="navigate"
                        >
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Operations</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
    export default {
        name: 'the-nav',
        watch: {
            '$route': function () {
                this.expandCurrentRoute();
            }
        },
        data() {
            return {
                expanded: {
                    directory: false,
                    routing: false,
                    lookups: false,
                    contactCenter: false,
                    integrations: false,
                    administration: false,
                    permissions: false
                },
                currentRoute: {
                    directory: false,
                    contacts: false,
                    routing: false,
                    lookups: false,
                    contactCenter: false,
                    kibana: false,
                    integrations: false,
                    administration: false,
                    permissions: false
                },
                currentRouteItem: {
                    // Directory
                    users: false,
                    devices: false,

                    // Contacts

                    // Routing
                    sipEndpoints: false,
                    flowsManager: false,
                    dialplan: false,
                    chatplan: false,

                    // Lookups
                    agentSkills: false,
                    calendars: false,
                    communications: false,
                    contactType: false,
                    leadSource: false,
                    leadStatus: false,

                    // Contact Center
                    dashboard: false,
                    agents: false,
                    resources: false,
                    queues: false,

                    // Kibana

                    // Integrations
                    apiTokens: false,
                    accounts: false,
                    webhooks: false,
                    siteWidgets: false,
                    callTracking: false,

                    // Administration
                    license: false,
                    storage: false,
                    mediaFiles: false,
                    blacklists: false,
                    ADFS: false,

                    // Permissions
                    roles: false,
                    objects: false,
                    operations: false,
                }
            };
        },
        mounted() {
            this.expandCurrentRoute();
        },
        methods: {
            navigate(route) {
                if(route && route !== this.$router.currentRoute.fullPath) {
                    this.$router.push(route);
                    this.$emit('re-renderNav');
                }
            },

            expandCurrentRoute() {
                const currentRoute = this.$router.currentRoute.fullPath.split('/');
                // [1] -- object, [2] -- page inself
                this.highlightCurrent(currentRoute[1], currentRoute[2]);
            },

            // watches only 1 item to be opened
            expandItem(expandItem) {
                if(this.expanded[expandItem]) {
                    this.expanded[expandItem] = false;
                    return;
                }
                Object.keys(this.expanded).forEach(item => {
                    this.expanded[item] = item === expandItem && !expandItem[item];
                });
            },
            highlightCurrent(currentObject, currentItem) {
                this.expandItem(currentObject);
                Object.keys(this.currentRoute).forEach(item => {
                    this.currentRoute[item] = item === currentObject && !this.currentRoute[item];
                });
                Object.keys(this.currentRouteItem).forEach(item => {
                    this.currentRouteItem[item] = item === currentItem && !this.currentRouteItem[item];
                });
            }
        },
        computed: {
            computeNavExpansion() {
                return !Object.values(this.expanded).every(section => {
                    return !section;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .the-nav__wrap {
        position: relative;
        min-width: 74px;
        width: 74px;
        min-height: 100vh;
        z-index: 101;
    }

    .the-nav {
        position: fixed;
        width: 74px;
        height: 100%;
        color: $nav-icon-color;
        background: #171A2A;
        transition: $transition;

        i {
            color: $nav-icon-color;
        }
    }

    .logo {
        width: 100%;
        height: 20px; // reserving a place for absolute positioned img's
        margin: 21px auto 42px;
        cursor: pointer;

        img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            transition: $transition;
            pointer-events: none;
        }

        .logo__img {
            opacity: 0;
        }
    }

    .nav-item-wrap {
        .nav-item {
            display: flex;
            align-items: center;
            position: relative;
            height: 24px;
            padding: 8px 0;
            box-sizing: content-box;
            cursor: pointer;

            .nav-icon-arrow {
                position: absolute;
                left: 6px;
                transform: rotate(-90deg);
                transition: $transition;
                opacity: 0;
            }

            .nav-icon {
                text-align: center;
                flex: 0 0 74px;
                transition: $transition;
            }

            .nav-text {
                transition: $transition;
                opacity: 0;
                pointer-events: none;
            }
        }


        .subnav-items {
            position: absolute;
            margin: 20px 11px 20px 0;
            transition: $transition;
            opacity: 0;
            pointer-events: none;

            .subnav-item {
                display: flex;
                align-items: center;
                height: 24px;
                padding: 8px 0 8px 61px;
                box-sizing: content-box;
                border-radius: $border-radius;
                transform: translateX(-4px);
                cursor: pointer;

                &:hover, &.nav-item__current {
                    background: rgba(0, 0, 0, 0.1);

                    .subnav-text, .subnav-icon {
                        color: $accent-color;
                    }
                }
            }

            .subnav-icon {
                margin-right: 16px;
            }
        }

        &:hover, &.nav-item__expanded, &.nav-item__current {
            .nav-icon-arrow, .nav-icon, .nav-text {
                color: $accent-color;
            }

            .nav-icon-arrow {
                transform: rotate(0);
            }
        }
    }

    .expanded-nav .nav-item__current:not(.nav-item__expanded) {
        .nav-icon-arrow, .nav-icon, .nav-text {
            color: $nav-icon-color ;
        }
    }

    .the-nav:hover {
        /*.the-nav {*/
        @extend .box-shadow;

        width: 260px;

        .logo-sm__img {
            opacity: 0;
        }

        .logo__img {
            opacity: 1;
        }

        .nav-item {
            .nav-icon-arrow, .nav-text {
                opacity: 1;
                pointer-events: auto;
            }

            .nav-icon {
                transform: translateX(6px);
            }
        }

        .subnav-items {
            position: static;
            opacity: 1;
            pointer-events: auto;
        }
    }

</style>
