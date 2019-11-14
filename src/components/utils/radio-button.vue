<template>
    <label
            class="radio-button-label"
            @click.prevent="changeValue"
    >
        <input
                type="checkbox"
                :checked="value === option"
        >
        <span class="radio-button"></span>
        {{computeLabel}}
    </label>
</template>

<script>
    export default {
        name: "radio-button",
        props: {
            value: {
                type: String,
                required: true
            },

            option: {
                type: String,
                required: true,
            },
            // may be a string, or object with true/false values
            label: {},
        },
        methods: {
            changeValue() {
                this.$emit('input', this.option);
            }
        },
        computed: {
            computeLabel() {
                if (this.label) {
                    return this.label[this.value] || this.label;
                }
                return ''

            }
        }
    }
</script>

<style lang="scss" scoped>
    $radio-button-color: rgba(0, 0, 0, 0.3);

    /* Customize the label (the container) */
    .radio-button-label {
        display: block;
        position: relative;
        height: 24px;
        min-width: 24px;
        padding-left: 32px;
        cursor: pointer;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .radio-button-label input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        pointer-events: none;
    }

    /* Create a custom radio button */
    .radio-button {
        position: absolute;
        //bottom: -2px;
        left: 0;
        height: 18px;
        width: 18px;
        border: 2px solid $radio-button-color;
        background-color: #fff;
        border-radius: 50%;
        transition: $transition;
    }

    .radio-button-label:hover input ~ .radio-button,
    .radio-button-label input:checked ~ .radio-button {
        border-color: $accent-color;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .radio-button:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: $transition;
        opacity: 0;
    }

    /* Show the indicator (dot/circle) when checked */
    .radio-button-label input:checked ~ .radio-button:after {
        opacity: 1;
    }

    /* Style the indicator (dot/circle) */
    .radio-button-label .radio-button:after {
        background: $accent-color;
    }
</style>