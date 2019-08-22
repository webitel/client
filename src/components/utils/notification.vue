<template>
    <aside class="alert" v-if="info || error" v-show="closeShowTrigger">
        <i
                class="icon-icon_approve"
                v-if="info"
        ></i>
        <i
                class="icon-icon_notification icon-icon_warning"
                v-if="error"
        ></i>
        <div class="alert__text">
            {{info || error}}
        </div>
        <i
                class="icon-icon_close"
                @click="close"
        ></i>
    </aside>
</template>

<script>
    import eventBus from '../../utils/eventBus';

    export default {
        name: 'alert',
        data() {
            return {
                info: null,
                error: null,
                closeShowTrigger: true
            }
        },
        mounted() {
            eventBus.$on('notificationInfo', (info) => {
                this.showInfo(info);
            });
            eventBus.$on('notificationError', (error) => {
                this.showError(error);
            });
        },
        methods: {
            showInfo(info) {
                this.info = info;
                setTimeout(() => {
                    this.info = null;
                }, 4000);
            },

            showError(error) {
                this.error = error;
                setTimeout(() => {
                    this.error = null;
                }, 4000);
            },

            close() {
                this.closeShowTrigger = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .alert {
        @extend .typo-notification-text;
        @extend .box-shadow;

        display: flex;
        align-items: center;
        position: fixed;
        top: 5px;
        right: 5px;
        min-width: 430px;
        max-width: 850px;
        padding: 24px 30px;
        color: #000;
        background: #fff;
        border-radius: $border-radius;
        z-index: 100;

        .icon-icon_approve {
            color: $true-color;
        }

        .icon-icon_warning {
            color: $false-color;
        }

        .icon-icon_close {
            position: absolute;
            top: 50%;
            right: 24px;
            color: $icon-color;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }

    .alert__text {
        margin: 0 24px 0 40px;
    }
</style>
