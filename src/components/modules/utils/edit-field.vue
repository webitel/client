<template>
    <div class="edit-field">
        <div
                class="edit-field__label"
                :class="{'hidden' : edit}"
                @dblclick="onLabelClick"
        >
            {{vlabel}}
        </div>
        <input
                class="edit-field__input"
                :class="{'hidden' : !edit}"
                ref="labeledit"
                v-model="label"
                v-on:blur="updateTextBlur"
                :placeholder=placeholder
                @keyup.enter="updateTextEnter"
                type="text"
        />
    </div>
</template>

<script>
    export default {
        name: 'edit-field',
        data: function () {
            return {
                edit: false, // define whether it is in edit mode or not
                label: '', // v-bind data model for input text
            }
        },
        props: {     // parent should provide :text or :placeholder
            text: {
                type: String
            },
            placeholder: {
                type: String,
                default: 'Enter value'
            }
        },
        watch: {
            text (value) {
                if (value == '' || value == undefined) {
                    this.label = this.placeholder
                } else {
                    this.label = this.text
                }
            }
        },
        mounted: function () {
            // initiate the label view
            this.initText();
        },
        updated: function () {
            const ed = this.$refs.labeledit;
            if (ed != null) {
                ed.focus();
            }
        },
        methods: {
            initText () {
                if (this.text == '' || this.text == undefined) {
                    this.label = this.vlabel
                } else {
                    this.label = this.text
                }
            },
            // when the div label got clicked and trigger the text box
            onLabelClick () {
                this.edit = true;
                this.label = this.text;
            },
            // trigger when textbox got lost focus
            updateTextBlur () {
                // update the edit mode to false .. display div label text
                this.edit = false;
                // emit text updated callback
                this.$emit('text-updated-blur', this.label)
            },
            updateTextEnter () {
                this.edit = false;
                this.$emit('text-updated-enter', this.label)
            }
        },
        computed: {
            vlabel () {
                // after text has been updated
                // return text value or place holder value depends on value of the text
                if (this.text == undefined || this.text == '') {
                    return this.placeholder
                } else {
                    return this.label
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    .edit-field__label {
        position: absolute;
        display: block;
        width: 100%;
        /*different top and bottom padding to vertically align text*/
        padding: 15px 16px 11px;
        border-radius: 4px;

        transition: 0.3s;
    }

    .edit-field__input {
        /*position: absolute;*/
        display: block;
        width: 100%;
        /*different top and bottom padding to vertically align text*/
        padding: 15px 16px 11px;
        margin-right: 0;
        border-radius: 4px;

        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: none;
        transition: 0.3s;
    }

    .hidden {
        opacity: 0;
        pointer-events: none;
    }
</style>