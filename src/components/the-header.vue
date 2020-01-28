<template>
    <header class="the-header">
        <div class="the-header__user">
            <div
                    class="the-header__user-info-wrap"
                    @click="userActionsTriggerShow = !userActionsTriggerShow"
            >
                <img src="../assets/img/login/people-callcenter.svg" alt="">
                <span class="the-header__username">{{username}}</span>
                <i class="icon-icon_arrow-down"></i>
            </div>
            <div
                    class="the-header__user-actions-wrap"
                    v-show="userActionsTriggerShow"
            >
                <ul class="the-header__user-actions">
                    <li class="the-header__user-action-item the-header__user-action-item__profile">
                        <span @click="settings">
                            {{$t('settings.settings')}}
                        </span>
                    </li>
                    <li class="the-header__user-action-item the-header__user-action-item__logout">
                        <span @click="logout">
                            {{$t('header.logout')}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'the-header',
        data: () => ({
            userActionsTriggerShow: false,
        }),

        computed: {
            ...mapState('auth', {
                username: state => state.username,
            })
        },

        methods: {
            settings() {
                this.userActionsTriggerShow = false;
                this.$router.push('/settings');
            },

            logout() {
                this.userActionsTriggerShow = false;
                this.$router.push('/auth');
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

                margin: 0 8px;
                user-select: none;
            }
        }

        .the-header__user-actions-wrap {
            @extend .typo-body-md;
            @extend .box-shadow;

            position: absolute;
            top: 20px; //icon height
            right: 0;
            min-width: 120px;
            padding: 13px 16px 19px;
            margin-top: 8px; //margin to icon
            color: #000;
            background: #fff;

            .the-header__user-actions {
                /*display: flex;*/
                /*justify-content: space-A;*/
            }

            .the-header__user-action-item {
                cursor: pointer;

                &__profile {
                    text-decoration: underline;
                    margin-bottom: 8px;
                }

                &__logout {
                    color: $false-color;
                }
            }
        }
    }
</style>
