<template>
    <nav class="tabs">
        <button
                class="tab__item"
                :class="{'active': tab.value === currentTab.value}"
                v-for="tab in tabs"
                type="button"
                :value="tab.text"
                @click="handleClick(tab)"
        >
            {{tab.text}}
        </button>


        <div class="tabs__underline">
            <div
                    class="tabs__underline__highlight"
                    :style="{ width: `${activeLineWidth}px`,
                transform: `translateX(${activeLineOffset}px)` }"
            ></div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "tabs",
        props: {
            currentTab: {
                type: Object,
                required: true,
            },
            tabs: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                activeLineWidth: 0,
                activeLineOffset: 0
            }
        },

        methods: {
            handleClick(value) {
                this.$emit('change', value);
                this.moveActiveLine(value);
            },

            moveActiveLine(newValue) {
                if (!this.currentTab) return;
                if (!this.$refs || !this.$refs[newValue] || !this.$refs[newValue][0]) return;
                const element = this.$refs[newValue][0];
                this.activeLineWidth = element.clientWidth;
                this.activeLineOffset = element.offsetLeft;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        @extend .typo-tab;
        display: block;
        position: relative;
        margin: 0 0 28px;
        padding: 0 58px;

        .tab__item {
            display: inline-block;
            margin: 0 48px 0  0;
            padding: 10px 0 8px;
            text-decoration: none;
            color: #94979B;
            border: none;
            outline: none;
            background-color: transparent;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: $transition;

            &.active, &:focus {
                font-family: 'Montserrat Bold', monospace;
                border-bottom: 2px solid $accent-color;
                color: #000;
            }

            &:hover {
                font-family: 'Montserrat Bold', monospace;
                color: #000;
            }

            // disables bold font resize on hover
            &:after {
                display: block;
                content: attr(value);
                font-family: 'Montserrat Bold', monospace;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }
        }


        .tabs__underline {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #EAE9E9;
            z-index: 0;
        }
    }
</style>