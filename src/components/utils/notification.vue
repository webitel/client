<template>
    <aside class="alert-wrap">
        <div class="alert"
             v-for="message in messages"
        >
            <i
                    class="icon-icon_approve"
                    v-if="message.info"
            ></i>
            <i
                    class="icon-icon_notification icon-icon_warning"
                    v-if="message.error"
            ></i>
            <div class="alert__text">
                {{message.info || message.error}}
            </div>
            <i
                    class="icon-icon_close"
                    @click="close(message.info || message.error)"
            ></i>
        </div>
    </aside>
</template>

<script>
    import eventBus from '../../utils/eventBus';

    export default {
        name: 'notification',
        data() {
            return {
                messages: [],
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
                this.messages.unshift({info});
                setTimeout(() => {
                    this.messages.splice(this.findMessageInArray(info), 1);
                }, 4000);
            },

            showError(error) {
                this.messages.unshift({error});
                setTimeout(() => {
                    this.messages.splice(this.findMessageInArray(error), 1);
                }, 4000);
            },

            close(message) {
                this.messages.splice(this.findMessageInArray(message), 1);
            },

            findMessageInArray(message) {
                return this.messages.findIndex(item => {
                    return item.message === message;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .alert-wrap {
        position: fixed;
        top: 5px;
        right: 5px;
        z-index: 1000;
    }

    .alert {
        @extend .typo-notification-text;
        @extend .box-shadow;

        position: relative;
        display: flex;
        align-items: center;
        min-width: 430px;
        max-width: 850px;
        padding: 24px 30px;
        margin-top: 7px;
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
            transition: $transition;
            cursor: pointer;

            &:hover {
                color: #000;
            }
        }
    }

    .alert__text {
        margin: 0 24px 0 40px;
    }
</style>
