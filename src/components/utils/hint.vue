<template>
    <aside class="hint">
        <i
                class="hint__img tooltip-activator icon-icon_question"
        ></i>
        <div class="tooltip-left">{{text}}</div>
    </aside>
</template>

<script>
    export default {
        name: "hint",
        props: {
            text: {
                type: String,
                default: 'lorem ipsum'
            }
        }
    }
</script>

<style lang="scss">
    // "?" HINT STYLING
    .hint {
        display: inline-block;
        position: relative;

        .hint__img {
            vertical-align: middle;
            color: rgba(0, 0, 0, 0.3);
            transition: $transition;
            cursor: pointer;

            &:hover {
                color: #000;
            }
        }
    }
</style>