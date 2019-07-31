<template>
    <div class="alert" v-if="info || error">
        <i
            class="icon-icon_close icon-icon_deny"
            @click="close"
        ></i>
        <i
                v-if="info"
                class="icon-icon_approve"
        ></i>
        <i
                v-if="error"
                class="icon-icon_warning"
        ></i>
        <div class="alert__text">
            {{info || error}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'alert',
        props: {
            info: {
                type: String,
                // default: 'lorem ipsum dolor sit amet'
            },
            error: {
                type: String
            }
        },
        methods: {
            close() {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";

    .alert {
        /*<!--@extend .;-->*/
        @extend .box-shadow;

        display: flex;
        align-items: center;
        position: fixed;
        top: 5px;
        right: 5px;
        min-width: 430px;
        max-width: 850px;
        padding: 20px;
        color: #000;
        background: #fff;
        border-radius: 4px;
        z-index: 100;

        .icon-icon_close {
            position: absolute;
            top: 50%;
            right: 24px;
            color: rgba(0, 0, 0, 0.3);
            transform: translateY(-50%);
            cursor: pointer;
        }

        .icon-icon_approve {
            color: $true-color;
        }

        .icon-icon_warning {
            color: $false-color;
        }
    }

    .alert__text {
        margin: 0 24px 0 30px;
    }
</style>
