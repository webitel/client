<template>
    <div class="form-input">
        <div v-if="!hideLabel" class="label" :class="{'invalid': v && v.$error}">
            {{computeRequiredLabel}}
        </div>

        <input
                class="input"
                ref="input"
                v-if="!textarea"
                v-model="validation"
                @input="$emit('input, $event.target.value')"
                :type="type"
                :placeholder="placeholder || label"
                :autofocus="autofocus"
                :disabled="disabled"
        />

        <textarea
                class="input"
                ref="input"
                v-if="textarea"
                v-model="validation"
                @input="$emit('input, $event.target.value')"
                :placeholder="placeholder || label"
                :autofocus="autofocus"
                :disabled="disabled"
        ></textarea>

        <validation-message
                v-if="!hideDetails"
                :v="v"
        />
    </div>
</template>

<script>
    import eventBus from '@/utils/eventBus';
    import requiredLabelMixin from '@/mixins/requiredLabelMixin';
    import validationMessage from './validation-message';

    export default {
        name: 'login-input',
        mixins: [requiredLabelMixin],
        components: {
            'validation-message': validationMessage
        },
        props: {
            // value -- w-model from outer component
            value: {
                default: '',
            },

            // label above input itself
            label: {
                type: String,
            },

            // input placeholder
            placeholder: {
                type: String,
            },

            // autofocus on input when page is first loaded
            autofocus: {
                type: Boolean,
                default: false,
            },

            // for specific types like password
            type: {
                type: String,
                default: 'text',
            },

            // "?" hint text. Also controls "?" display
            hintText: {
                type: String,
            },

            // if textarea needed
            textarea: {
                type: Boolean,
                default: false,
            },

            // specify height easily. Used for textarea
            height: {
                type: Number,
                default: 128,
            },

            // disables input
            disabled: {
                type: Boolean
            },

            // '*' sign property
            required: {
                type: Boolean,
                default: false
            },

            hideLabel: {
                type: Boolean,
                default: false
            },

            hideDetails: {
                type: Boolean,
                default: false
            },

            // validation rules
            v: {},
        },
        mounted() {
            eventBus.$on('copyToClipboard', this.copyToClipboard);
            if (this.textarea) this.$refs.input.style.height = `${this.height}px`;
        },
        computed: {
            validation: {
                get() {
                    return this.value;
                },
                set(value) {
                    if (this.v) this.v.$touch();
                    this.$emit('input', value);
                },
            },
        },
        methods: {
            // pass copyTarget to be sure that selected text will be copied
            copyToClipboard(copyTarget) {
                if (this.value === copyTarget && this.value) {
                    this.$refs.input.select();
                    document.execCommand('copy');
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .form-input {
        position: relative;
    }

    .input {
        @extend .typo-input-text;
        @extend .default-input;
    }

    textarea {
        resize: none;
    }

    /*if extra icons/controls in the end of input inself needed */
    .input-extension-wrap .input {
        padding-right: 100px;
    }

</style>
