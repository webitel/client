<template>
    <div class="dropdown-select">
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
                    :class="{'opened': isOpened, 'empty': !selected, 'disabled': disabled}"
                    ref="select-preview"
                    @click.stop="toggleSelect"
            >
                <input
                        v-model="selected"
                        type="text"
                        :placeholder="this.selected || this.placeholder"
                        :disabled="disabled"
                >
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
                            v-for="(option,key) in filterOptions"
                            :key="key"
                            @click="selectItem(key)"
                    >
                        <div>{{option}}</div>
                    </li>
                    <li class="select-option select-option__empty" v-if="filterOptions.length === 0">
                        <div>No items available</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import clickaway from '../../directives/clickaway';

    export default {
        name: "dropdown-select",
        directives: {clickaway},
        props: {
            // initial value, if exists
            value: {
                type: String
            },

            // options to select
            options: {
                type: Array,
                // required: true,
                default: () => ['opt1', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3', 'opt2', 'opt3']
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

            // disables selection
            disabled: {
                type: Boolean
            },
        },
        data() {
            return {
                selected: this.value || '',
                isOpened: false
            }
        },
        methods: {
            toggleSelect() {
                if (!this.disabled) {
                    this.isOpened = !this.isOpened;
                }
            },
            closeSelect(event) {
                const preview = this.$refs['select-preview'];
                if (event.target !== preview || !preview.contains(event.target)) {
                    this.isOpened = false;
                }
            },
            selectItem(optionId) {
                this.selected = this.options[optionId];
                this.$emit('input', this.selected);
                this.isOpened = false;
            },
        },
        computed: {
            filterOptions() {
                if(!this.selected) return this.options;
                return this.options.filter((item) => item.includes(this.selected));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select {
        position: relative;

        .select-preview {
            height: 48px;
            position: relative;
            /*padding for arrow icon*/
            padding-right: 40px;
            margin-bottom: 20px;
            border: 1px solid $input;
            border-radius: $border-radius;
            cursor: pointer;

            input {
                @extend .default-input;

                height: 46px;
                background: transparent;
                border: none;

                &::placeholder {
                    color: #000;
                }
            }

            .icon-icon_arrow-down {
                position: absolute;
                top: 50%;
                right: 16px;
                color: #000;
                transform: translate(0, -50%);
            }

            &:hover .icon-icon_arrow-down {
                color: #000;
            }

            &.opened {
                @extend .default-input:hover;
            }

            &.disabled {
                @extend .default-input:disabled;

                input {
                    background: transparent;
                }

                &:hover, &.empty:hover {
                    border-color: $input;
                    cursor: auto;
                }


                .icon-icon_arrow-down {
                    color: $icon-color;

                    .icon-icon_arrow-down {
                        color: $icon-color;
                    }

                }
            }

        }

        .select-options {
            position: absolute;
            top: 48px;
            opacity: 0;
            pointer-events: none;

            &.opened {
                opacity: 1;
                pointer-events: auto;
            }

            .select-option__empty {
                background: #fff;
                cursor: auto;
            }
        }
    }
</style>