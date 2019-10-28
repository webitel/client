<template>
    <div class="datepicker">
        <div class="label" :class="{'invalid': this.v.$error}">{{computeRequiredLabel}}
        </div>
        <v-datepicker
                :value="value"
                :format="format"
                :calendar-button-icon="calendarButtonIcon"
                :maximum-view="maximumView"
                :disabled="disabled"
                :calendar-button="calendarButton"
                monday-first
                @input="$emit('input', $event)"
        ></v-datepicker>

        <validation-message
                :v="v"
        />
    </div>
</template>

<script>
    import vueDatepicker from 'vuejs-datepicker';
    import requiredLabelMixin from '@/mixins/requiredLabelMixin';
    import validationMessage from './validation-message';

    export default {
        name: "datepicker",
        mixins: [requiredLabelMixin],
        components: {
            'validation-message': validationMessage,
            'v-datepicker': vueDatepicker,
        },
        props: {
            value: {
                required: true
            },
            label: {
                type: String,
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
            format: {
                type: String,
            },
            calendarButtonIcon: {
                type: String,
            },
            maximumView: {
                type: String,
                default: 'day'
            },
            disabled: {
                type: Boolean,
            },
            calendarButton: {
                type: Boolean
            },
        }
    }
</script>

<style lang="scss">

    .datepicker__to-right {
        .vdp-datepicker__calendar {
            right: auto;
            left: 0;
        }
    }

    .vdp-datepicker {
        > div input {
            @extend .default-input;
            @extend .typo-input-label;

            padding: $input-padding;

        }

        // arrow down icon
        .vdp-datepicker__calendar-button {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translate(0, -50%);

            i {
                color: #000;
            }
        }

        .vdp-datepicker__calendar {
            @extend .box-shadow;

            //display: block !important;
            width: 287px;
            right: 0;
            padding: 16px;
            margin-top: 8px;
            line-height: 36px !important;
            border: none;
            border-radius: $border-radius;

            header {
                display: flex;
                justify-content: space-between;
                align-content: flex-end;
                margin-bottom: 24px;
                line-height: 0;

                .day__month_btn {
                    @extend .typo-body-lg;

                    padding-top: 5px;
                }


                .prev, .next {
                    float: none;
                    text-indent: 0;
                    color: transparent;

                    &:hover {
                        background-color: transparent !important;
                    }

                    &:after {
                        content: '\e005';
                        position: absolute;
                        font-size: 24px;
                        font-family: 'icomoon', sans-serif;
                        text-indent: 0;
                        color: $icon-color;
                        border: none;
                        transition: $transition;
                        cursor: pointer;
                        pointer-events: none;
                        transform: translateX(-50%);

                    }

                    &:hover:after {
                        color: #000;
                    }
                }

                .next:after {
                    transform: translateX(-50%) rotate(180deg);
                }
            }


            .cell {
                width: 36px;
                height: 36px;
                padding: 0;
                line-height: 36px;
                font-size: 12px;
                transition: $transition;

                &.day-header {
                    letter-spacing: 0.4px;
                    color: $icon-color !important;
                }

                &.day {
                    border-radius: 50%;

                    &.selected {
                        background: $accent-color;

                        &:hover {
                            background: $accent-color !important;
                        }
                    }

                    &:not(.blank):not(.disabled).day:hover,
                    &:not(.blank):not(.disabled).month:hover,
                    &:not(.blank):not(.disabled).year:hover {
                        background: #F2F2F2;
                        border-color: transparent;
                    }
                }


                &.month {

                    &.selected {
                        border-bottom-color: $info-color;

                        &:hover {
                            border-bottom-color: $accent-color !important;
                        }
                    }

                    &:not(.blank):not(.disabled).day:hover,
                    &:not(.blank):not(.disabled).month:hover,
                    &:not(.blank):not(.disabled).year:hover {
                        border-bottom-color: $icon-color !important;
                    }

                }
            }
        }
    }
</style>