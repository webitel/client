<template>
    <div class="expansion-panel">
        <header class="expansion-header" @click="expand">
            <span class="icon icon-icon_arrow-down"></span><slot name="expansion-header"></slot>
        </header>
        <div class="expansion-content" v-if="isExpanded">
            <slot name="expansion-content"></slot>
        </div>
        <divider v-if="!isExpanded"></divider>
    </div>
</template>

<script>
    import divider from '../../utils/divider';

    export default {
        name: "expansion-panel",
        components: {
            divider
        },
        data() {
            return {
                isExpanded: true,
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
        margin: 17px 0 15px;
        cursor: pointer;

        .icon {
            padding: 0 10px;
            margin-right: 8px;
        }
    }
</style>