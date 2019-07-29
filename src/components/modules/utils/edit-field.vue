<template>
    <div class="edit-field">
        <div
                class="edit-field__label"
                :class="{'hidden' : edit}"
                @dblclick="onLabelClick"
        >
            {{vlabel}}
        </div>
        <form
                class="edit-field__form"
                :class="{'hidden' : !edit}"
                ref="labeledit"
                @submit.prevent="updateTextEnter"
        >
            <div class="edit-field__form-label">
                LIVE EDIT LABEL
            </div>
            <input
                    class="edit-field__input"
                    v-model="label"
                    :placeholder="placeholder"
                    type="text"
            />
            <div class="edit-field__form-controls">
                <button class="edit-field__form-button fs14-lh16">close</button>
                <button class="edit-field__form-button fs14-lh16">save</button>
             </div>
            </form>
<!--        @keyup.enter="updateTextEnter"-->
<!--        @blur="updateTextBlur"-->
    </div>
</template>

<script>
export default {
  name: 'edit-field',
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
      this.edit = true;
      this.label = this.text;
    },
    // trigger when textbox got lost focus
    updateTextBlur() {
      // update the edit mode to false .. display div label text
      this.edit = false;
      // emit text updated callback
      this.$emit('text-updated-blur', this.label);
    },
    updateTextEnter() {
      this.edit = false;
      this.$emit('text-updated-enter', this.label);
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
    @import '../../../assets/css/main';

    .edit-field {
        position: relative;
    }

    .edit-field__label {
        /*different top and bottom padding to vertically align text*/
        padding: 15px 16px 11px 0;
        word-wrap: break-word;
        border-radius: 4px;

        transition: 0.3s;
    }

    .edit-field__form {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        /*right: 0;*/
        width: 100%;
        padding: 20px;
        /*different top and bottom padding to vertically align text*/
        background: #fff;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        z-index: 1;

        .edit-field__input {
            padding: 15px 16px 5px 0;
            margin-right: 0;
            border-radius: 4px;

            background: transparent;

            border: none;
            border-bottom: 3px solid $accent-color;
            /*border: 1px solid rgba(0, 0, 0, 0.2);*/
            outline: none;
            transition: 0.3s;
        }

        .edit-field__form-controls {
            text-align: right;
            margin: 20px 10px 0 0;

            .edit-field__form-button {
                margin-left: 15px;
                font-family: 'AvantGardeDemi', sans-serif;
                text-transform: uppercase;
                color: $accent-color;
                border: none;
                outline: none;
                background: transparent;
            }
        }
    }

    .hidden {
        opacity: 0;
        pointer-events: none;
    }
</style>
