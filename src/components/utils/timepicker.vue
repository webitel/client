<template>
    <div class="timepicker">
        <div class="label">{{label}}</div>
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
    </div>
</template>

<script>
    import dropdownSelect from './dropdown-select';

    export default {
        name: "timepicker",
        components: {
            dropdownSelect,
        },

        props: {
            label: {
                type: Number,
            },
            value: {
                reuqired: true
            },
            hourOptions: {
                type: Array,
            },
            minOptions: {
                type: Array,
                default: () => ['00', '15', '30', '45']
            }
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

                console.log(this.hour, this.min);
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
        display: flex;
        align-items: center;
        overflow: visible !important;

        .delimiter {
            margin: 0 7px;
        }

        .dropdown-select {
            min-width: 90px;
            width: 90px;

            .vs__dropdown-toggle {
                border-color: transparent;
            }

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