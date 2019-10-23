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
                :value="computeEmptyValue"
                :options="options"
                :label="displayProperty"
                :placeholder="placeholder"
                :clearable="false"
                :disabled="disabled"
                :required="required"
                :taggable="taggable"
                :width="21"
                @input="setOption"
        ></v-select>

        <validation-message
                :v="v"
        />
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    import requiredLabelMixin from '@/mixins/requiredLabelMixin';
    import validationMessage from './validation-message';

    export default {
        name: "dropdown-select",
        mixins: [requiredLabelMixin],
        components: {
            'v-select': vSelect,
            'validation-message': validationMessage
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

            taggable: {
                type: Boolean,
                default: false
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

        computed: {
            computeEmptyValue() {
                return Object.values(this.value).length !== 0 ? this.value : null;
            }
        },

        methods: {
            setOption(option) {
                this.v.$touch();
                this.$emit('input', option);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/objects/lib-custom-styling/v-select";
</style>