<template>
    <div class="dropdown-select">
        <div class="label" :class="{'invalid': v && v.$error}">{{computeRequiredLabel}}
<!--            <div class="hint" v-show="this.hintText">-->
<!--                <i-->
<!--                        class="hint__img tooltip-activator icon-icon_question"-->
<!--                ></i>-->
<!--                <div class="tooltip-left">{{this.hintText}}</div>-->
<!--            </div>-->
        </div>

        <v-select
                :value="computeDisplayValue"
                :options="options"
                :label="displayProperty"
                :placeholder="placeholder"
                :clearable="false"
                :disabled="disabled"
                :required="required"
                :taggable="taggable"
                :width="21"
                @input="setOption"
                @search="$emit('search', $event)"
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
                type: String,
                default: 'name'
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
                // required: true
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
            },
        },

        computed: {
            computeDisplayValue() {
                if(typeof this.value === 'string') return this.value;
                return this.value[this.displayProperty] || '';
            }
        },

        methods: {
            setOption(option) {
                if(this.v) this.v.$touch();
                this.$emit('input', option);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/objects/lib-custom-styling/v-select";
</style>