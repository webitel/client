<template>
    <nav class="tabs">
        <button
                class="tab__item"
                :class="{'active': tab.value === currentTab}"
                v-for="tab in tabs"
                type="button"
                @click="handleClick"
        >
            {{tab.text}}
        </button>

        <div
                class="tabs__underline"
                :style="{ width: `${activeLineWidth}px`,
                transform: `translateX(${activeLineOffset}px)` }"
        ></div>
    </nav>
</template>

<script>
    export default {
        name: "tabs",
        props: {
            currentTab: {
                type: String,
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
        position: relative;
        margin: 0 auto;
        .tab__item {
            display: inline-block;
            margin: 0 5px;
            padding: 10px;
            padding-bottom: 8px;
            font-size: 16px;
            letter-spacing: 0.8px;
            color: gray;
            text-decoration: none;
            border: none;
            background-color: transparent;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.25s;
            &.active {
                color: black;
            }
            &:hover {
                border-bottom: 2px solid gray;
                color: black;
            }
            &:focus {
                outline: none;
                border-bottom: 2px solid gray;
                color: black;
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }
        }


        .tabs__underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background-color: black;
            transition: transform 0.4s ease, width 0.4s ease;
        }
    }
</style>