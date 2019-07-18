<template>
    <button
            class="btn"
            v-bind:type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "btn",
        props: {
            type: {
                type: String,
                default: 'button'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";

    .btn {
        height: 48px;
        padding: 20px 27px;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #000;
        background: $accent-color;
        border-radius: 4px;

        border: none;
        outline: none;
    }
</style>