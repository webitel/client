<template>
    <div class="expansion-panel">
        <header class="expansion-header" @click="expand">
            <span
                    class="icon icon-icon_arrow-down"
                    :class="{'closed': !this.isExpanded}"
            ></span>
            <slot name="expansion-header"></slot>
        </header>
        <keep-alive>
            <div class="expansion-content" v-if="isExpanded">
                <slot name="expansion-content"></slot>
            </div>
        </keep-alive>
        <divider v-if="!isExpanded"></divider>
    </div>
</template>

<script>
    import divider from './divider';

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
    .expansion-panel {
        margin-top: 17px;
    }

    .expansion-header {
        display: flex;
        margin-bottom: 15px;
        cursor: pointer;

        .icon {
            padding: 0 10px;
            color: $icon-color;
            transition: $transition;

            &.closed {
                transform: rotate(-90deg);
            }
        }
    }

    // EXPANSION PANEL CONTENT STYLING
    .expansion-content {
        @extend .module-input-grid;

        .form__input {
            margin: 0;
        }

        .content-header {
            margin: 12px 0 4px;
        }
    }
</style>