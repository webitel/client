<template>
    <label class="dropdown-select">
        <div class="label">{{this.label}}
            <div class="hint" v-show="this.hintText">
                <i
                        class="hint__img tooltip-activator icon-icon_question"
                ></i>
                <div class="tooltip-left">{{this.hintText}}</div>
            </div>
        </div>
        <div class="select">
            <div
                    class="select-preview"
                    :class="{'opened': isOpened, 'empty': !selected}"
                    ref="select-preview"
                    @click="toggleSelect"
            >
                {{this.selected || this.placeholder}}
                <i
                        class="icon-icon_arrow-down"
                ></i>
            </div>
            <div
                    class="select-options"
                    :class="{'opened': isOpened}"
                    v-clickaway="closeSelect"
            >
                <ul>
                    <li
                            class="select-option"
                            v-for="(option,key) in options"
                            :key="key"
                            @click="selectItem(key)"
                    >
                        <div>{{option}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </label>
</template>

<script>
    import clickaway from '../../../directives/clickaway';

    export default {
        name: "dropdown-select",
        directives: {clickaway},
        props: {
            // otions
            options: {
                type: Array,
                // required: true,
                default: () => ['opt1', 'opt2', 'opt3']
            },

            // label above select itself
            label: {
                type: String,
            },

            // select placeholder
            placeholder: {
                type: String,
            },

            // "?" hint text. Also controls "?" display
            hintText: {
                type: String,
            },

            // disables input
            disabled: {
                type: Boolean
            },
        },
        data() {
            return {
                selected: '',
                isOpened: false
            }
        },
        methods: {
            toggleSelect() {
                this.isOpened = !this.isOpened;
            },
            closeSelect(event) {
                const preview = this.$refs['select-preview'];
                if(event.target !== preview || !preview.contains(event.target)) {
                    this.isOpened = false;
                }
            },
            selectItem(optionId) {
                this.selected = this.options[optionId];
                this.isOpened = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/main";

    .select {
        position: relative;

        .select-preview {
            @extend .default-input;

            height: 48px;
            position: relative;
            padding-right: 40px;
            cursor: pointer;

            &.empty {
                @extend .default-input::placeholder;

                &:hover {
                    color: #000;
                }
            }

            &.opened {
                @extend .default-input:hover;
            }

            .icon-icon_arrow-down {
                position: absolute;
                top: 50%;
                right: 16px;
                transform: translate(0, -50%);
            }
        }

        .select-options {
            top: 48px;
            opacity: 0;
            pointer-events: none;

            &.opened {
                opacity: 1;
                pointer-events: auto;
            }
        }
    }
</style>