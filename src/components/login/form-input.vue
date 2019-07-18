<template>
    <div>
        <label>
            <span class="label">{{this.label}}</span>
            <input
                    class="input"
                    ref="input"
                    type="text"
                    :value="value"
                    @input="$emit('input, $event.target.value')"
                    v-bind:class="{'invalid': validation}"
                    v-bind:placeholder=placeholder
                    autofocus
            />
        </label>
        <div class="input-details"></div>
    </div>
</template>

<script>
    export default {
        name: "login-input",
        props: {
            // value -- w-model from outer component
            value: {
                type: String,
                default: ''
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            password: {
                type: Boolean,
                default: false
            },
            // validation rules
            rules: {
                type: Array
            }
        },
        // data() {
        //     return {
        //         isValid: true
        //     }
        // },
        created() {
            // console.log(this.rules);
            this.rules.forEach(rule => {
                console.log(rule);
                this.validation(rule);
            });
        },
        mounted() {
            this.$refs['input'].autofocus = this.autofocus;
            this.$refs['input'].password = this.password;

        },
        computed: {
            // rule -- function from rules prop
            validation(rule) {
                console.log('from computed ', rule);
                // return rule;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .label {
        display: block;
        margin-bottom: 9px;
        font-size: 14px;
    }

    .input {
        vertical-align: bottom;
        display: block;
        width: 100%;
        height: 48px;
        /*different top and bottom padding to vertically align text*/
        padding: 17px 16px 9px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 4px;

        border: none;
        border: 1px solid transparent;
        outline: none;
        transition: 0.3s;
    }

    .invalid {
        border-color: #FF4444;
    }
</style>