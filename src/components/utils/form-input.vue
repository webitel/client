<template>
    <div class="form-input">
        <label>
            <span class="label fs14-lh16" :class="{'invalid': this.v.$error}">{{this.label}}</span>
            <input
                    class="input"
                    ref="input"
                    v-if="!textarea"
                    v-model="validation"
                    @input="$emit('input, $event.target.value')"
                    v-bind:placeholder=placeholder
            />
            <textarea
                    class="input"
                    ref="input"
                    v-if="textarea"
                    v-model="validation"
                    @input="$emit('input, $event.target.value')"
                    v-bind:placeholder=placeholder
            ></textarea>
        </label>
        <div class="invalid form-input__details fs12-lh16" v-show="v.email===false">
            {{$t('auth.validation.email')}}
        </div>
        <div class="invalid form-input__details fs12-lh16" v-show="v.required===false">
            {{$t('auth.validation.required')}}
        </div>
        <div class="invalid form-input__details fs12-lh16" v-show="v.sameAs===false">
            {{$t('auth.validation.confirmPassword')}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login-input',
        props: {
            textarea: {
                type: Boolean,
                default: false
            },
            // value -- w-model from outer component
            value: {
                type: String,
                default: '',
            },
            label: {
                type: String,
            },
            placeholder: {
                type: String,
            },
            autofocus: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text',
            },
            // validation rules
            v: {
                type: Object,
                default: () => {
                    return {
                        $error: null,
                        $touch: () => {}
                    }
                }
            },
            height: {
                type: Number,
                default: 48
            }
        },
        mounted() {
            this.$refs.input.autofocus = this.autofocus;
            if(!this.textarea) this.$refs.input.type = this.type;
            this.$refs.input.style.height = this.height+"px";
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
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../assets/css/main';

    .form-input {
        position: relative;
        /* for form-input__details bottom 0 */
        padding-bottom: 16px;
    }

    .label {
        display: block;
        margin-bottom: 9px;
        transition: 0.3s;
    }

    .input {
        display: block;
        width: 100%;
        /*different top and bottom padding to vertically align text*/
        padding: 15px 16px 11px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 4px;

        border: 1px solid transparent;
        outline: none;
        transition: 0.3s;
    }

    .form-input__details {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .invalid {
        color: $form-error-color;
        border-color: $form-error-color;
    }

    textarea {
        resize: none;
    }
</style>
