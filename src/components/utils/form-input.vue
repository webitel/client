<template>
    <div class="form-input">
        <div class="label" :class="{'invalid': this.v.$error}">{{computeRequiredLabel}}
            <div class="hint" v-show="this.hintText">
                <i
                        class="hint__img tooltip-activator icon-icon_question"
                ></i>
                <div class="tooltip-left">{{this.hintText}}</div>
            </div>
        </div>

        <input
                class="input"
                ref="input"
                v-if="!textarea"
                v-model="validation"
                @input="$emit('input, $event.target.value')"
                :type="type"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :disabled="disabled"
        />

        <textarea
                class="input"
                ref="input"
                v-if="textarea"
                v-model="validation"
                @input="$emit('input, $event.target.value')"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :disabled="disabled"
        ></textarea>

        <div
                class="invalid form-input__details"
                v-if="v.required !== undefined"
                v-show="v.required===false && v.$error"
        >
            {{$t('validation.required')}}
        </div>
        <div
                class="invalid form-input__details"
                v-if="v.email !== undefined"
                v-show="v.email===false && v.$error"
        >
            {{$t('validation.email')}}
        </div>
        <div
                class="invalid form-input__details"
                v-if="v.sameAs !== undefined"
                v-show="v.sameAs===false && v.$error"
        >
            {{$t('validation.confirmPassword')}}
        </div>
        <div
                class="invalid form-input__details"
                v-if="v.minValue !== undefined"
                v-show="v.minValue===false && v.$error"
        >
            {{$t('validation.atLeast') + ' ' + v.$params.minValue.min}}
        </div>
        <div
                class="invalid form-input__details"
                v-if="v.maxValue !== undefined"
                v-show="v.maxValue===false && v.$error"
        >
            {{$t('validation.notMuch') + ' ' + v.$params.maxValue.max}}
        </div>
    </div>
</template>

<script>
    import eventBus from '@/utils/eventBus';

    export default {
        name: 'login-input',
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
                default: 48,
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
        mounted() {
            eventBus.$on('copyToClipboard', this.copyToClipboard);

            this.$refs.input.style.height = `${this.height}px`;
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
        computed: {
            validation: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.v.$touch();
                    this.$emit('input', value);
                },
            },
            computeRequiredLabel() {
                return this.required ? this.label + '*' : this.label;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .form-input {
        position: relative;
        /* for form-input__details bottom 0 */
        padding-bottom: 20px;
    }

    .input {
        @extend .typo-input-text;
        @extend .default-input;
    }

    .form-input__details {
        @extend .typo-body-md;

        position: absolute;
        bottom: 0;
        left: 0;
    }

    .invalid {
        color: $false-color;
        border-color: $false-color;
    }

    textarea {
        resize: none;
    }


    .auth .input {
        background: rgba(255, 255, 255, 0.04);
        border-color: transparent;

        &:hover {
            border-color: transparent;

            &::placeholder {
                color: rgba(255, 255, 255, 0.4);
            }

            &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                color: rgba(255, 255, 255, 0.4);
            }

            &::-moz-placeholder { /* Firefox 19+ */
                color: rgba(255, 255, 255, 0.4);
            }

            &:-ms-input-placeholder { /* IE 10+ */
                color: rgba(255, 255, 255, 0.4);
            }

            &:-moz-placeholder { /* Firefox 18- */
                color: rgba(255, 255, 255, 0.4);
            }
        }

        &:focus {
            border-color: transparent;
        }
    }

    /*if extra icons/controls in the end of input inself needed */
    .input-extension-wrap .input {
        padding-right: 100px;
    }

</style>
