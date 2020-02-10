<template>
    <header class="the-header">
        <div class="the-header__user">
            <div
                    class="the-header__user-info-wrap"
                    @click="userActionsTriggerShow = !userActionsTriggerShow"
                    v-clickaway="close"
            >
                <img src="../assets/img/user.svg" alt="">
                <span class="the-header__username">{{username}}</span>
                <i class="icon-icon_arrow-down"></i>
            </div>
            <div
                    class="the-header__user-actions-wrap"
                    v-show="userActionsTriggerShow"
            >
                <ul class="the-header__user-actions">
                    <li class="the-header__user-action-item the-header__user-action-item__docs">
                        <i class="icon-icon_doc"></i>
                        <span class="the-header__user-action-text" @click="openDocs">
                            {{$t('header.docs')}}
                        </span>
                    </li>
                    <li class="the-header__user-action-item the-header__user-action-item__profile">
                        <i class="icon-icon_settings"></i>
                        <span class="the-header__user-action-text" @click="openSettings">
                            {{$t('settings.settings')}}
                        </span>
                    </li>
                    <li class="the-header__user-action-item the-header__user-action-item__logout">
                        <i class="icon-icon_logout"></i>
                        <span class="the-header__user-action-text" @click="logoutUser">
                            {{$t('header.logout')}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    import {logout} from "../api/auth/auth";
    import {mapState} from "vuex";
    import clickaway from '../directives/clickaway';

    export default {
        name: 'the-header',
        data: () => ({
            userActionsTriggerShow: false,
        }),

        directives: {clickaway},

        computed: {
            ...mapState('userinfo', {
                username: state => state.username,
            })
        },

        methods: {
            close() {
                this.userActionsTriggerShow = false;
            },

            openDocs() {
                this.userActionsTriggerShow = false;
                window.open('https://docs.webitel.com', '_blank');
            },

            openSettings() {
                this.userActionsTriggerShow = false;
                this.$router.push('/settings');
            },

            async logoutUser() {
                await logout();
            },
        }
    };
</script>

<style lang="scss" scoped>
    .the-header {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        /*height: 54px;*/
        height: 40px;
        padding: 0 58px;
        background: #e8e8e8;
        color: #000;
    }

    .the-header__user {
        position: relative;

        .the-header__user-info-wrap {
            display: flex;
            align-items: center;
            width: fit-content;
            width: -moz-fit-content;
            cursor: pointer;

            .the-header__username {
                @extend .typo-body-md;
                margin: 0 15px 0 20px;
            }

            .icon-icon_arrow-down:before {
                color: #000;
            }
        }

        .the-header__user-actions-wrap {
            @extend .typo-body-md;
            @extend .box-shadow;

            position: absolute;
            top: 20px; //icon height
            right: 0;
            left: 44px; // 0 + icon and icon margin
            margin-top: 8px; //margin to icon
            color: #000;
            background: #fff;
            border-radius: $border-radius;
            box-shadow: $box-shadow;

            .the-header__user-actions {

            }

            .the-header__user-action-item {
                display: flex;
                align-items: center;
                padding: 11px 13px;
                transition: $transition;
                cursor: pointer;

                .the-header__user-action-text {
                    @extend .typo-body-sm;
                    margin-left: 8px;
                }

                &__logout, .icon-icon_logout:before {
                    color: $false-color;
                }

                &:hover {
                    background: $table-hover;
                }
            }
        }
    }
</style>
