<template>
    <aside class="the-nav__wrap">
        <nav class="the-nav">
            <div class="logo"  @click="$router.push('/')">
                <img class="logo-sm__img" src="../assets/img/logo-sm.svg" alt="logo">
                <img class="logo__img" src="../assets/img/logo.svg" alt="logo">
            </div>
            <ul class="nav-items">
                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.directory}"
                        @click="expandItem('directory')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Directory</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.directory">
                        <li class="subnav-item" @click="$router.push('/users')">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Users</span>
                        </li>
                        <li class="subnav-item" @click="$router.push('/devices')">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Devices</span>
                        </li>
                        <li class="subnav-item" @click="$router.push('/permissions')">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Permissions</span>
                        </li>
                    </ul>
                </li>

                <li class="nav-item-wrap">
                    <div class="nav-item">
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Contacts</span>
                    </div>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.routing}"
                        @click="expandItem('routing')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Routing</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.routing">
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">SIP Endpoints</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Flows manager</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Dialplan</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Chatplan</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Blacklists</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.logs}"
                        @click="expandItem('logs')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Directory</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.logs">
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Call log</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Chat logs</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Actions log</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.contactCenter}"
                        @click="expandItem('contactCenter')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Contact center</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.contactCenter">
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Dashboard</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Agents</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Resourses</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Queues</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.integrations}"
                        @click="expandItem('integrations')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Integrations</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.integrations">
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">API tokens</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Accounts</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Webhooks</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Site Wigets</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Call tracking</span>
                        </li>
                    </ul>
                </li>

                <li
                        class="nav-item-wrap"
                        :class="{'nav-item__expanded': expanded.administration}"
                        @click="expandItem('administration')"
                >
                    <div class="nav-item">
                        <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                        <i class="nav-icon icon-icon_approve"></i>
                        <span class="nav-text">Administration</span>
                    </div>
                    <ul class="subnav-items" v-show="this.expanded.administration">
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">License</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Storage</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Media files</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">Lookups</span>
                        </li>
                        <li class="subnav-item">
                            <i class="subnav-icon icon-icon_deny"></i>
                            <span class="subnav-text">ADFS OAuth2</span>
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
        data() {
            return {
                expanded: {
                    directory: true,
                    routing: false,
                    logs: false,
                    contactCenter: false,
                    integrations: false,
                    administration: false
                }
            };
        },
        mounted() {

        },
        methods: {
            // watches only 1 item to be opened
            expandItem(expandItem) {
                Object.keys(this.expanded).map(item => {
                    this.expanded[item] = item === expandItem;
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
        z-index: 1;
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

                &:hover {
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

        &:hover, &.nav-item__expanded {
            .nav-icon-arrow, .nav-icon, .nav-text {
                color: $accent-color;
            }

            .nav-icon-arrow {
                transform: rotate(0);
            }
        }
    }

    .the-nav:hover {
        /*.the-nav {*/
        @extend .box-shadow;

        width: 250px;

        .logo-sm__img {
            opacity: 0;
        }

        .logo__img {
            opacity: 1;
        }

        .nav-item {
            .nav-icon-arrow, .nav-text {
                opacity: 1;
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
