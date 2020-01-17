<template>
    <label
            class="checkbox-label"
           @click.prevent="changeValue"
    >
        <input
                type="checkbox"
                :checked="value"
        >
        <span class="checkbox"></span>
        <span class="label">{{computeLabel}}</span>
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
            // may be a string, or object with true/false values
            label: {},
        },
        methods: {
            changeValue() {
                // =============================== ATTENTION!!!!!============================================
                // WE PASS INVERTED CHECKBOX VALUE
                // BECAUSE CLICK EVENT FIRES BEFORE CHECKBOX CHANGE
                this.$emit('input', !this.value);
            }
        },
        computed: {
            computeLabel() {
                if(this.label) {
                    return this.label[this.value] || this.label;
                }
                return ''

            }
        }
    }
</script>

<style lang="scss" scoped>
    $checkbox-color: rgba(0, 0, 0, 0.3);

    .checkbox-label {
        display: flex;
        align-items: center;
        position: relative;
        height: 24px;
        padding-left: 29px;
        line-height: 24px;
        cursor: pointer;
        user-select: none;

        .label {
            margin-bottom: 0;
        }

        /* Hide the browser's default checkbox */
        input {
            position: absolute;
            width: 0;
            height: 0;
            cursor: pointer;
            opacity: 0;
        }

        /* Create a custom checkbox */
        .checkbox {
            position: absolute;
            left: 0;
            width: 18px;
            height: 18px;
            background: #fff;
            border: 2px solid $checkbox-color;
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