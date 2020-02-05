<template>
    <div class="dropdown-select">
        <div v-if="!hideLabel" class="label" :class="{'invalid': v && v.$error}">
            {{computeRequiredLabel}}
        </div>

        <v-select
                :value="computeDisplayValue"
                :options="options"
                :label="displayProperty"
                :placeholder="placeholder || label"
                :clearable="false"
                :disabled="disabled"
                :required="required"
                :taggable="taggable"
                :width="21"
                @input="setOption"
                @search="debouncer.call(this, $event)"
        ></v-select>

        <validation-message
                v-if="!hideDetails"
                :v="v"
        />
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    import requiredLabelMixin from '@/mixins/requiredLabelMixin';
    import validationMessage from './validation-message';
    import debounce from "../../utils/debounce";

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

            hideLabel: {
                type: Boolean,
                default: false
            },

            hideDetails: {
                type: Boolean,
                default: false
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

        created() {
            this.debouncer = debounce(this.debouncer);
        },

        computed: {
            computeDisplayValue() {
                if (typeof this.value === 'string') return this.value;
                return this.value[this.displayProperty] || '';
            }
        },

        methods: {
            setOption(option) {
                if (this.v) this.v.$touch();
                this.$emit('input', option);
            },

            debouncer(value) {
                this.$emit('search', value);
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/objects/lib-custom-styling/v-select";
</style>