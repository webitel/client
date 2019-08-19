<template>
    <div class="edit-field">
        <div
                class="edit-field__label"
                :class="{'hidden' : edit && !disabled}"
                @dblclick="onLabelClick"
        >
            {{vlabel}}
        </div>
        <form
                class="edit-field__form"
                :class="{'hidden' : !edit || disabled}"
                ref="labeledit"
                @submit.prevent="updateTextSubmit"
        >
            <input
                    class="edit-field__input"
                    v-model="label"
                    :placeholder="placeholder"
                    type="text"
            />
            <div class="edit-field__form-controls">
                <btn class="secondary-btn" type="submit">close</btn>
                <btn type="submit">save</btn>
            </div>
        </form>
    </div>
</template>

<script>
    import btn from './btn';

    export default {
        name: 'edit-field',
        components: {
            btn
        },
        data() {
            return {
                edit: false, // define whether it is in edit mode or not
                label: '', // v-bind data model for input text
            };
        },
        props: { // parent should provide :text or :placeholder
            text: {
                type: String,
            },
            placeholder: {
                type: String,
                default: 'Enter value',
            },

            // disables not-editable fields
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            text(value) {
                if (value == '' || value == undefined) {
                    this.label = this.placeholder;
                } else {
                    this.label = this.text;
                }
            },
        },
        mounted() {
            // initiate the label view
            this.initText();
        },
        updated() {
            const ed = this.$refs.labeledit;
            if (ed != null) {
                ed.focus();
            }
        },
        methods: {
            initText() {
                if (this.text == '' || this.text == undefined) {
                    this.label = this.vlabel;
                } else {
                    this.label = this.text;
                }
            },
            // when the div label got clicked and trigger the text box
            onLabelClick() {
                if(!this.disabled) {
                    this.edit = true;
                    this.label = this.text;

                    this.$emit('start-update');
                }
            },
            updateTextSubmit() {
                this.edit = false;
                this.$emit('text-updated', this.label);
            },
        },
        computed: {
            vlabel() {
                // after text has been updated
                // return text value or place holder value depends on value of the text
                if (this.text == undefined || this.text == '') {
                    return this.placeholder;
                }
                return this.label;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .edit-field {
        position: relative;
    }

    .edit-field__label {
        word-wrap: break-word;
        border-radius: $border-radius;

        transition: $transition;
    }

    .edit-field__form {
        @extend .box-shadow;

        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 12px;
        left: 0;
        min-width: 400px;
        width: 100%;
        padding: 24px 24px 28px 30px;
        /*different top and bottom padding to vertically align text*/
        background: #fff;
        transition: all $transition cubic-bezier(.25,.8,.25,1);
        z-index: 1;

        .edit-field__input {
            @extend .default-input;
        }

        .edit-field__form-controls {
            text-align: right;
            margin-top: 20px;

            .secondary-btn {
                margin-right: 30px;
            }
        }
    }
</style>
