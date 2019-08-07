<template>
    <label
            class="checkbox-label"
           @click.prevent="changeValue"
    >
        <input
                class="checkbox"
                type="checkbox"
                v-model="checkbox"
        >
        <span class="checkbox"></span>
        {{computeLabel}}
    </label>
</template>

<script>
    export default {
        name: "table-checkbox",
        props: {
            value: {
                type: Boolean,
                required: true
            },
            // Object with true/false properties
            label: {
                // type: Object,
            },
        },
        watch: {
            value: function(newVal) {
                this.checkbox = newVal;
            }
        },
        data() {
            return {
                checkbox: null
            }
        },
        mounted() {
            this.checkbox = this.value;
        },
        methods: {
            changeValue() {
                // =============================== ATTENTION!!!!!============================================
                // WE PASS INVERTED CHECKBOX VALUE
                // BECAUSE CLICK EVENT FIRES BEFORE CHECKBOX CHANGE
                this.$emit('toggleCheckbox', !this.checkbox);
            }
        },
        computed: {
            computeLabel() {
                if(this.label) {
                    return this.label[this.checkbox] || this.label;
                }
                return ''

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/main";

    .checkbox-label {
        position: relative;
        padding-left: 29px;
        cursor: pointer;
        user-select: none;

        /* Hide the browser's default checkbox */
        input {
            position: absolute;
            width: 0;
            height: 0;
            cursor: pointer;
            opacity: 1;
        }

        /* Create a custom checkbox */
        .checkbox {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 18px;
            height: 18px;
            background: #fff;
            border: 2px solid $input;
            border-radius: 2px;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkbox:after {
            content: '';
            position: absolute;
            display: none;


            /* Style the checkmark/indicator */
            top: 50%;
            left: 50%;
            width: 6px;
            height: 12px;
            border: solid $info-color;
            border-width: 0 2.5px 2.5px 0;
            transform: translate(-50%, -60%) rotate(45deg);

        }

        input:checked ~ .checkbox {
            border-color: $info-color;
        }

        /* Show the checkmark when checked */
        input:checked ~ .checkbox:after {
            display: block;
        }

    }
</style>