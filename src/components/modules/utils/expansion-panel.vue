<template>
    <div class="expansion-panel">
        <header class="expansion-header" @click="expand">
            <span class="icon icon-icon_arrow-down"></span><slot name="expansion-header"></slot>
        </header>
        <div class="expansion-content" v-if="isExpanded">
            <slot name="expansion-content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "expansion-panel",
        data() {
            return {
                isExpanded: false,
            }
        },
        methods: {
            expand() {
                this.isExpanded = !this.isExpanded;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/main";

    .expansion-header {
        display: flex;
        margin: 2px 0 8px;
        cursor: pointer;

        .icon {
            padding: 0 10px;
            margin-right: 8px;
        }
    }
</style>