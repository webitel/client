<template>
    <div class="form-input">
        <label>
            <span class="label" :class="{'invalid': this.v.$error}">{{this.label}}</span>
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
        <div class="invalid form-input__details" v-show="v.email===false">
            {{$t('auth.validation.email')}}
        </div>
        <div class="invalid form-input__details" v-show="v.required===false">
            {{$t('auth.validation.required')}}
        </div>
        <div class="invalid form-input__details" v-show="v.sameAs===false">
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
      default: false,
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
      default: () => ({
        $error: null,
        $touch: () => {
        },
      }),
    },
    height: {
      type: Number,
      default: 48,
    },
  },
  mounted() {
    this.$refs.input.autofocus = this.autofocus;
    if (!this.textarea) this.$refs.input.type = this.type;
    this.$refs.input.style.height = `${this.height}px`;
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
        padding-bottom: 20px;
    }

    .label {
        @extend .typo-input-label;

        display: block;
        margin-bottom: 9px;
        transition: $transition;
    }

    .input {
        @extend .typo-input-text;

        display: block;
        width: 100%;
        /*different top and bottom padding to vertically align text*/
        padding: 15px 16px 11px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: $border-radius;

        border: 1px solid transparent;
        outline: none;
        transition: $transition;

        &:hover {
            border-color: #000;

            &:-moz-placeholder{ color:#000; };
            &::-moz-placeholder{ color:#000; };
            &:-ms-input-placeholder { color:#000; };
            &::-webkit-input-placeholder { color:#000; };
            /*&:-moz-placeholder{ color:transparent; };*/
            /*&::-moz-placeholder{ color:transparent; };*/
            /*&:-ms-input-placeholder { color:transparent; };*/
            /*&::-webkit-input-placeholder { color:transparent; };*/
        }

        &:focus {
            border-color: #000;
            /*&:-moz-placeholder{ color:#000; };*/
            /*&::-moz-placeholder{ color:#000; };*/
            /*&:-ms-input-placeholder { color:#000; };*/
            /*&::-webkit-input-placeholder { color:#000; };*/
        }
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
</style>
