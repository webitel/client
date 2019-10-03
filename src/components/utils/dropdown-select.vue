<template>
    <div class="dropdown-select">
        <div class="label" :class="{'invalid': this.v.$error}">{{computeRequiredLabel}}
            <div class="hint" v-show="this.hintText">
                <i
                        class="hint__img tooltip-activator icon-icon_question"
                ></i>
                <div class="tooltip-left">{{this.hintText}}</div>
            </div>
        </div>

        <v-select
            :value="value"
            :options="options"
            :label="displayProperty"
            :placeholder="placeholder"
            :clearable="false"
            :disabled="disabled"
            :required="required"
            @input="setOption"
        ></v-select>
    </div>
</template>

<script>
    import vSelect from 'vue-select';

    export default {
        name: "dropdown-select",
        components: {
            'v-select': vSelect,
        },
        props: {
            // options to select
            options: {
                type: Array || Object,
                // required: true,
                default: () => []
             },

            displayProperty: {
                type: String
            },

            // label above select itself
            label: {
                type: String,
            },

            placeholder: {
                type: String
            },

            // select value
            value: {
                default: null
            },

            // "?" hint text. Also controls "?" display
            hintText: {
                type: String,
            },

            // disables selection
            disabled: {
                type: Boolean
            },

            required: {
                type: Boolean
            },

            // validation rules
            v: {
                type: Object,
                default: () => ({
                    $error: null,
                    $touch: () => {
                    },
                }),
            },
        },
        methods: {
            setOption(option) {
                this.v.$touch();
                this.$emit('input', option);
            }
        },
        computed: {
            computeRequiredLabel() {
                return this.required ? this.label+ '*' : this.label;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/objects/lib-custom-styling/v-select";

    // inline edit (in-grid) styling
    .inline-dropdown {
        display: inline-block; // to vertical allign
        height: 44px; // 44px height doesn't stratches vuetable rows
        width: 160px; // to disable arrow right floating on high resolution screens

        .label {
            display: none; // no need in label in grid, also takes margin
        }

        .select {
            .select-preview {
                height: 100%; // fit container
                margin-bottom: 0; // default styling reset
                border: transparent; // default styling reset

                input {
                    padding: 0;
                    /*border: 1px solid red;*/
                }

                .icon-icon_arrow-down {
                    margin-bottom: 6px;
                }
            }

            .select-options {
                width: 196px;  // filter dropdown width
                word-break: break-word;
            }
        }

        &.options-align-right .select-options {
            right: 16px;  // 40px right padding - 24px arrow
        }

        &.options-align-left .select-options {
            left: 0;
        }
    }

    .column-rows {
        .select-options {
            max-height: 120px;
        }
    }

</style>