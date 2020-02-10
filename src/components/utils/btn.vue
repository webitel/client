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
    import Ripple from '@/assets/lib/ripple/ripple';

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
    $primary-btn-color: $accent-color;
    $primary-btn-color_active: #F3BA00;

    $secondary-btn-color: rgba(0, 0, 0, 0.7);
    $secondary-btn-color_active: #000;

    $btn-color_disabled: #94979B;

    .btn {
        @extend .typo-btn;

        padding: 10px 32px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #000;
        background: $primary-btn-color;
        border-radius: $border-radius;
        transition: $transition;

        border: 1px solid transparent;
        outline: none;

        &:hover {
            background: $primary-btn-color_active;
        }

        &:active {
            background: $primary-btn-color;
        }

        &:disabled {
            background: $btn-color_disabled;
        }


        &.secondary-btn {
            color: $secondary-btn-color;
            background: transparent;
            border: 1px solid $secondary-btn-color;

            &:hover {
                color: $secondary-btn-color_active;
                border-color: $secondary-btn-color_active;
            }

            &:active {
                color: $secondary-btn-color_active;
                border-color: $secondary-btn-color_active;
            }

            &:disabled {
                color: $btn-color_disabled;
                border-color: $btn-color_disabled;
            }
        }
    }

</style>
