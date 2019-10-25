<template>
    <div class="timepicker">
        <div class="label" :class="{'invalid': this.v.$error}">{{computeRequiredLabel}}</div>
        <form class="timepicker__form">
            <dropdown-select
                    :value="hour"
                    :options="hourOptions || initHourList"
                    taggable
                    @input="setHour"
            ></dropdown-select>
            <span class="delimiter">:</span>
            <dropdown-select
                    :value="min"
                    :options="minOptions"
                    taggable
                    @input="setMin"
            ></dropdown-select>
        </form>
        <validation-message
                :v="v"
        />
    </div>
</template>

<script>
    import requiredLabelMixin from '@/mixins/requiredLabelMixin';
    import dropdownSelect from './dropdown-select';
    import validationMessage from './validation-message';

    export default {
        name: "timepicker",
        mixins: [requiredLabelMixin],
        components: {
            dropdownSelect,
            validationMessage
        },

        props: {
            label: {
                type: String,
            },
            value: {
                type: [Number, Object],
                required: true
            },
            hourOptions: {
                type: Array,
            },
            minOptions: {
                type: Array,
                default: () => ['00', '15', '30', '45']
            },
            required: {
                type: Boolean,
                default: false
            },
            v: {
                type: Object,
                default: () => ({
                    $error: null,
                    $touch: () => {
                    },
                }),
            },
        },

        data() {
            return {
                hour: 0,
                min: 0,
            }
        },

        mounted() {
            this.convertMinToHours();
        },

        computed: {
            initHourList() {
                const hourList = [];
                for (let i = 0; i < 24; i++) {
                    let hour;
                    if (i < 10) {
                        hour = '0' + i;
                    } else {
                        hour = i + '';
                    }
                    hourList.push(hour);
                }
                hourList.push('23:59');
                return hourList;
            },
        },

        methods: {
            setHour(value) {
                this.hour = value;
            },

            setMin(value) {
                this.min = value;
            },

            convertHoursToMin() {
                const value = this.hour*60 + this.min;
                this.$emit('input', value);
            },

            convertMinToHours() {
                const minInHour = 60;

                this.hour = Math.floor(this.value / minInHour)+'';
                this.min = Math.floor(this.value % minInHour)+'';

                if (this.hour-0 < 10) {
                    this.hour = '0' + this.hour;
                }
                if (this.min-0 < 10) {
                    this.min = '0' + this.min;
                }

                // if (minutes < 10) minutes += '0';
                // return hours + ':' + minutes;
            },
        }
    }
</script>

<style lang="scss">
    .timepicker {
        overflow: visible !important;
    }

    .timepicker__form {
        display: flex;
        align-items: center;

        .delimiter {
            margin: 0 7px;
        }

        .dropdown-select {
            min-width: 90px;
            width: 90px;

            .label, .input__details {
                display: none;
            }

            .vs--open .vs__selected {
                display: none;
            }
        }

        .vs__dropdown-menu {
            min-width: 75px;
        }
    }
</style>