<template>
    <aside
            class="the-nav__wrap"
            :class="{'collapsed': collapsed}"
            v-clickaway="closeAllExpands"
    >
        <header class="nav__header">
            <i class="icon-icon_delete icon-icon_menu" @click="toggleCollapse"></i>
            <img class="logo" src="../assets/img/logo.svg" alt="logo">
        </header>
        <nav class="the-nav expanded-nav">
            <ul class="nav-items">
                <li
                        class="nav-item-wrap"
                        v-for="item in nav"
                        @click="navigate(item)"
                >
                    <div
                            class="nav-item"
                            :class="{'nav-item__expanded': item.expanded,
                             'nav-item__current': item.current}"
                            @click="expandItem(item)">
                        <i class="nav-icon" :class="item.iconClass"></i>
                        <span class="nav-text">{{item.displayName}}</span>
                        <i class="nav-icon-arrow icon-icon_arrow-down" v-if="item.subnav"></i>
                    </div>
                    <ul class="subnav-items"
                        v-if="item.subnav"
                        v-show="item.expanded"
                    >
                        <li
                                class="subnav-item"
                                v-for="subitem in item.subnav"
                                :class="{'nav-item__current': subitem.current}"
                                @click="navigate(subitem)"
                        >
                            <span class="subnav-text">{{subitem.displayName}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
    import clickaway from '../directives/clickaway';

    export default {
        name: 'the-nav',
        directives: {clickaway},
        watch: {
            '$route': function () {
                this.expandCurrentRoute();
            }
        },
        data() {
            return {
                collapsed: false,

                nav: [
                    {
                        name: 'directory',
                        displayName: this.$t('nav.directory.directory'),
                        route: '/directory',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'users',
                                displayName: this.$t('nav.directory.users'),
                                route: '/directory/users',
                                current: false,
                            },
                            {
                                name: 'devices',
                                displayName: this.$t('nav.directory.devices'),
                                route: '/directory/devices',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'contacts',
                        displayName: this.$t('nav.contacts'),
                        route: '/contacts',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: false,
                    },
                    {
                        name: 'routing',
                        displayName: this.$t('nav.routing.routing'),
                        route: '/routing',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'flow',
                                displayName: this.$t('nav.routing.flow'),
                                route: '/routing/flow',
                                current: false,
                            },
                            {
                                name: 'dialplan',
                                displayName: this.$t('nav.routing.dialplan'),
                                route: '/routing/dialplan',
                                current: false,
                            },
                            {
                                name: 'chatplan',
                                displayName: this.$t('nav.routing.chatplan'),
                                route: '/routing/chatplan',
                                current: false,
                            },
                            {
                                name: 'gateways',
                                displayName: this.$t('nav.routing.gateways'),
                                route: '/routing/gateways',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'lookups',
                        displayName: this.$t('nav.lookups.lookups'),
                        route: '/lookups',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'agent-skills',
                                displayName: this.$t('nav.lookups.agentSkills'),
                                route: '/lookups/agent-skills',
                                current: false,
                            },
                            {
                                name: 'calendars',
                                displayName: this.$t('nav.lookups.calendars'),
                                route: '/lookups/calendars',
                                current: false,
                            },
                            {
                                name: 'communications',
                                displayName: this.$t('nav.lookups.communications'),
                                route: '/lookups/communications',
                                current: false,
                            },
                            {
                                name: 'contact-types',
                                displayName: this.$t('nav.lookups.contactTypes'),
                                route: '/lookups/contact-types',
                                current: false,
                            },
                            {
                                name: 'lead-sources',
                                displayName: this.$t('nav.lookups.leadSources'),
                                route: '/lookups/lead-sources',
                                current: false,
                            },
                            {
                                name: 'lead-status',
                                displayName: this.$t('nav.lookups.leadStatus'),
                                route: '/lookups/lead-status',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'ccenter',
                        displayName: this.$t('nav.ccenter.ccenter'),
                        route: '/contact-center',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'agents',
                                displayName: this.$t('nav.ccenter.agents'),
                                route: '/contact-center/agents',
                                current: false,
                            },
                            {
                                name: 'teams',
                                displayName: this.$t('nav.ccenter.teams'),
                                route: '/contact-center/teams',
                                current: false,
                            },
                            {
                                name: 'resources',
                                displayName: this.$t('nav.ccenter.res'),
                                route: '/contact-center/resources',
                                current: false,
                            },
                            {
                                name: 'resource-groups',
                                displayName: this.$t('nav.ccenter.resGroups'),
                                route: '/contact-center/resource-groups',
                                current: false,
                            },
                            {
                                name: 'queues',
                                displayName: this.$t('nav.ccenter.queues'),
                                route: '/contact-center/queues',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'kibana',
                        displayName: this.$t('nav.kibana'),
                        route: '/kibana',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: false,
                    },
                    {
                        name: 'integrations',
                        displayName: this.$t('nav.integrations.integrations'),
                        route: '/integrations',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'tokens',
                                displayName: this.$t('nav.integrations.tokens'),
                                route: '/integrations/tokens',
                                current: false,
                            },
                            {
                                name: 'accounts',
                                displayName: this.$t('nav.integrations.accounts'),
                                route: '/integrations/accounts',
                                current: false,
                            },
                            {
                                name: 'webhooks',
                                displayName: this.$t('nav.integrations.webhooks'),
                                route: '/integrations/webhooks',
                                current: false,
                            },
                            {
                                name: 'widgets',
                                displayName: this.$t('nav.integrations.widgets'),
                                route: '/integrations/widgets',
                                current: false,
                            },
                            {
                                name: 'call-tracking',
                                displayName: this.$t('nav.integrations.callTracking'),
                                route: '/integrations/call-tracking',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'administration',
                        displayName: this.$t('nav.administration.administration'),
                        route: '/administration',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'license',
                                displayName: this.$t('nav.administration.license'),
                                route: '/administration/license',
                                current: false,
                            },
                            {
                                name: 'storage',
                                displayName: this.$t('nav.administration.storage'),
                                route: '/administration/storage',
                                current: false,
                            },
                            {
                                name: 'media',
                                displayName: this.$t('nav.administration.media'),
                                route: '/administration/media',
                                current: false,
                            },
                            {
                                name: 'blacklists',
                                displayName: this.$t('nav.administration.blacklists'),
                                route: '/administration/blacklists',
                                current: false,
                            },
                            {
                                name: 'adfs',
                                displayName: '',
                                route: '/administration/adfs',
                                current: false,
                            },
                        ]
                    },
                    {
                        name: 'permissions',
                        displayName: this.$t('nav.permissions.permissions'),
                        route: '/permissions',
                        iconClass: 'icon-icon_deny',
                        expanded: false,
                        subnav: [
                            {
                                name: 'roles',
                                displayName: this.$t('nav.permissions.roles'),
                                route: '/permissions/roles',
                                current: false,
                            },
                            {
                                name: 'objects',
                                displayName: this.$t('nav.permissions.objects'),
                                route: '/permissions/objects',
                                current: false,
                            },
                            {
                                name: 'operations',
                                displayName: this.$t('nav.permissions.operations'),
                                route: '/permissions/operations',
                                current: false,
                            },
                        ]
                    },
                ]
            };
        },
        mounted() {
            this.expandCurrentRoute();
        },
        methods: {
            toggleCollapse() {
                this.collapsed = !this.collapsed;
                this.closeAllExpands();
            },

            navigate(item) {
                if (!item.subnav && item.route !== this.$router.currentRoute.fullPath) {
                    this.$router.push(item.route);
                    // this.$emit('re-renderNav');
                }
            },

            expandCurrentRoute() {
                const currentItem = this.nav.find(currItem => {
                    return this.$router.currentRoute.fullPath.includes(currItem.route);
                });
                const currentSubitem = currentItem.subnav.find(currSubitem => {
                    return this.$router.currentRoute.fullPath.includes(currSubitem.route);
                });
                this.setCurrent(currentItem, currentSubitem);
            },

            setCurrent(currItem, currSubitem) {
                this.nav.forEach(item => {
                    item.current = item === currItem;

                    if (item.subnav) {
                        item.subnav.forEach(subitem => {
                            subitem.current = subitem === currSubitem;
                        });
                    }
                });

                // this.expandItem(currItem);
            },

            // watches only 1 item to be opened
            expandItem(expandItem) {
                this.nav.forEach(item => {
                    item.expanded = item === expandItem && !expandItem.expanded;
                });
            },

            closeAllExpands() {
                if (this.collapsed) {
                    this.nav.forEach(item => {
                        item.expanded = false;
                    });
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    $nav-bg-color: #171A2A;
    $nav-paddings: 0 38px 0 20px;

    .the-nav__wrap {
        @extend .box-shadow;

        position: relative;
        min-width: 272px;
        width: 272px;
        min-height: 100vh;
        background: $nav-bg-color;
        z-index: 101;

        .nav__header {
            width: 100%;
            padding: $nav-paddings;
            margin: 20px auto 44px;

            .icon-icon_menu {
                margin-right: 23px;
                color: #fff;
                cursor: pointer;
            }
        }

        .the-nav {
            position: fixed;
            width: 272px;
            height: 100%;
            color: $nav-icon-color;

            i {
                color: $nav-icon-color;
            }


            .nav-item-wrap {
                .nav-item {
                    @extend .typo-nav-item;

                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    padding: 6px 38px 6px 20px;
                    cursor: pointer;

                    .nav-icon-arrow {
                        margin-left: auto;
                        transform: rotate(-90deg);
                        transition: $transition;
                    }

                    .nav-icon {
                        margin-right: 18px;
                        transition: $transition;
                    }

                    .nav-text {
                        transition: $transition;
                    }
                }


                .subnav-items {
                    .subnav-item {
                        @extend .typo-nav-item;

                        display: flex;
                        justify-content: flex-start;
                        width: 100%;
                        padding: 11px 38px 11px 62px;
                        cursor: pointer;

                        &:hover, &.nav-item__current {
                            background: rgba(0, 0, 0, 0.1);

                            .subnav-text, .subnav-icon {
                                color: $accent-color;
                            }
                        }
                    }
                }

                &:hover, .nav-item__expanded, .nav-item__current {
                    .nav-icon-arrow, .nav-icon, .nav-text {
                        color: $accent-color;
                    }
                }

            .nav-item__expanded {
                .nav-icon-arrow {
                    transform: rotate(0);
                }
            }

                .nav-item__expanded {
                    background: rgba(0, 0, 0, 0.35);
                }
            }
        }

        &.collapsed {
            min-width: 64px;
            width: 64px;

            .nav__header {
                .logo {
                    display: none;
                }
            }

            .the-nav {
                width: 64px;

                .nav-item-wrap {
                    .nav-item {
                        .nav-icon {
                            margin-right: 28px;
                        }

                        .nav-icon-arrow {
                            display: none;
                        }

                        .nav-text {
                            opacity: 0;
                            pointer-events: none;
                        }
                    }

                    .subnav-items {

                        .subnav-item {
                            min-width: calc(220px - 64px);
                            padding: 12px 38px 12px 10px;
                            margin-left: 64px;
                            background: $nav-bg-color;
                        }
                    }

                    .nav-item__expanded {
                        background: $nav-bg-color;

                        &.nav-item {
                            width: 220px;
                        }

                        .nav-text {
                            opacity: 1;
                            pointer-events: auto;
                        }
                    }
                }
            }

        }
    }

</style>
