<template>
    <button
            class="btn"
            ref="btn"
            v-ripple
            :type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
    import Vue from 'vue';
    import Ripple from '../../assets/lib/ripple/ripple';

    Vue.directive('ripple', Ripple);

    export default {
        name: 'btn',
        props: {
            type: {
                type: String,
                default: 'button',
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";

    .btn {
        @extend .typo-btn;

        height: 48px;
        padding: 13px 37px 11px 27px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-family: 'AvantGardeDemi', sans-serif;
        color: #000;
        background: $accent-color;
        border-radius: 4px;
        transition: 0.2s;

        border: 1px solid transparent;
        outline: none;

        &:hover {
            background: #FED546;
        }

        &:active {
            background: $accent-color;
        }

        &:disabled {
            background: rgba(0, 0, 0, 0.3);
        }


        &.secondary-btn {
            color: #000;
            background: transparent;
            border: 1px solid #000;

            &:hover {
                color: rgba(0, 0, 0, 0.3);
                border-color: rgba(0, 0, 0, 0.3);
            }

            &:active {
                color: #000;
                border: 1px solid #000;
            }

            &:disabled {
                color: rgba(0, 0, 0, 0.3);
                border-color: rgba(0, 0, 0, 0.3);
            }
        }
    }

</style>
