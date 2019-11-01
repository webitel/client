<template>
    <div class="timepicker">
        <div class="label"
             v-if="label"
             :class="{'invalid': v && v.$error}
        ">
            {{computeRequiredLabel}}
        </div>
        <form class="timepicker__form">
            <dropdown-select
                    :value="computeHours"
                    :options="hourOptions || initHourList"
                    taggable
                    @input="setHours"
            ></dropdown-select>
            <span class="delimiter">:</span>
            <dropdown-select
                    :value="computeMins"
                    :options="minOptions"
                    taggable
                    @input="setMins"
            ></dropdown-select>
        </form>
        <validation-message
                v-if="v"
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
            },
        },

        data() {
            return {
                hour: 0,
                min: 0
            }
        },

        mounted() {
            this.hour = Math.floor(this.value / 60);
            this.min = Math.floor(this.value % 60) ;
        },

        computed: {
            computeHours() {
                let hours = Math.floor(this.value / 60) + '';
                if (hours - 0 < 10) {
                    hours = '0' + hours;
                }
                return hours;
            },

            computeMins() {
                let mins = Math.floor(this.value % 60) + '';
                if (mins - 0 < 10) {
                    mins = '0' + mins;
                }
                return mins;
            },

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
            setHours(value) {
                this.hour = value*60;
                const newVal = this.hour + this.min;
                this.$emit('input', newVal);
            },

            setMins(value) {
                this.min = +value;
                const newVal = this.hour + this.min;
                this.$emit('input', newVal);
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