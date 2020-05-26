<template>
    <div class="datetimepicker">
        <datepicker
                :value="computeDateValue"
                :label="label"
                :hide-label="hideLabel"
                :hide-details="hideDetails"
                @input="setValue('date', $event)"
        ></datepicker>
        <timepicker
                :value="computeTimeValue"
                @input="setValue('time', $event)"
        ></timepicker>
    </div>
</template>

<script>
    import datepicker from './datepicker';
    import timepicker from './timepicker';

    const msInDay = 24 * 60 * 60;

    export default {
        name: 'datetimepicker',
        components: { datepicker, timepicker },
        props: {
            value: {
                type: [String, Number],
                required: true,
            },
            label: {
                type: String,
            },
            hideLabel: {
                type: Boolean,
                default: false,
            },
            hideDetails: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            computeDateValue() {
                return this.value - (this.value % msInDay);
            },

            computeTimeValue() {
                return this.value % msInDay;
            },
        },
        methods: {
            setValue(period, value) {
                let datetime;
                if (period === 'date') {
                    datetime = (value - value % msInDay) + this.computeTimeValue;
                } else if (period === 'time') {
                    datetime = this.computeDateValue + value;
                }
                this.$emit('input', datetime);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .datetimepicker {
        /*display: flex;*/

        &.history-popup__datetimepicker {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
