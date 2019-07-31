<template>
    <button
            class="btn fs14-lh16"
            v-bind:type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'btn',
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
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

        border: 1px solid transparent;
        outline: none;
    }

    .secondary-btn {
        color: rgba(0, 0, 0, 0.3);
        background: transparent;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
</style>
