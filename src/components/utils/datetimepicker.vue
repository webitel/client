<template>
    <div class="datetimepicker">
        <datepicker
                :value="computeDateValue"
                :label="label"
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

    const msInDay = 24 * 60 * 60 * 10**3;

    export default {
        name: "datetimepicker",
        components: {datepicker, timepicker},
        props: {
            value: {
                type: [String, Number],
                required: true,
            },
            label: {
                type: String
            }
        },
        computed: {
            computeDateValue() {
                return this.value - (this.value % msInDay);
            },

            computeTimeValue() {
                return Math.round(this.value % msInDay/10**3);
            }
        },
        methods: {
            setValue(period, value) {
                let datetime;
                if (period === 'date') {
                    datetime = value + this.computeTimeValue*10**3;
                } else if(period === 'time') {
                    datetime = this.computeDateValue + value*10**3;
                }
                this.$emit('input', datetime);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .datetimepicker {
        /*display: flex;*/
    }
</style>