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
                    v-if="timeVisibility.hour"
                    :value="computeHours"
                    :options="hourOptions || initHourList"
                    taggable
                    @input="setHours"
            ></dropdown-select>
            <span
                    class="delimiter"
                    v-if="timeVisibility.hour"
            >:</span>
            <dropdown-select
                    v-if="timeVisibility.min"
                    :value="computeMins"
                    :options="minOptions"
                    taggable
                    @input="setMins"
            ></dropdown-select>
            <span
                    class="delimiter"
                    v-if="timeVisibility.min && timeVisibility.sec"
            >:</span>
            <dropdown-select
                    v-if="timeVisibility.sec"
                    :value="computeSecs"
                    :options="secOptions"
                    taggable
                    @input="setSecs"
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
            format: {
                type: String,
                default: 'hh:mm:ss'
            },
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
            secOptions: {
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
                time: {
                    hour: 0,
                    min: 0,
                    sec: 0,
                },
                timeVisibility: {
                    hour: false,
                    min: false,
                    sec: false,
                }
            }
        },

        watch: {
            value: function () {
                this.updateComponentTime();
            }
        },

        mounted() {
            this.setVisibleFormat();
            this.updateComponentTime();
        },

        computed: {
            computeHours() {
                return this.addZero(this.time.hour);
            },

            computeMins() {
                return this.addZero(this.time.min);
            },

            computeSecs() {
                return this.addZero(this.time.sec);
            },

            initHourList() {
                const hourList = [];
                for (let i = 0; i < 24; i++) {
                    hourList.push(this.addZero(i));
                }
                return hourList;
            },
        },

        methods: {
            updateComponentTime() {
                let value = this.value;
                if (!this.timeVisibility.sec) value = value * 60;
                if (!this.timeVisibility.min) value = value * 60;
                this.time.sec = value % 60;
                this.time.min = Math.floor(value / 60 % 60);
                this.time.hour = Math.floor(value / 3600);
            },

            setTime() {
                let value = this.time.hour*3600 + this.time.min*60 + this.time.sec;
                if (!this.format.includes('s')) value = value / 60;
                if (!this.format.includes('m')) value = value / 60;
                this.$emit('input', value);
            },

            setHours(value) {
                this.time.hour = +value;
                this.setTime();
            },

            setMins(value) {
                this.time.min = +value;
                this.setTime();
            },

            setSecs(value) {
                this.time.sec = +value;
                this.setTime();
            },

            setVisibleFormat() {
                if (this.format.includes('h')) {
                    this.timeVisibility.hour = true;
                }
                if (this.format.includes('m')) {
                    this.timeVisibility.min = true;
                }
                if (this.format.includes('s')) {
                    this.timeVisibility.sec = true;
                }
            },

            addZero(value) {
                return (value - 0 < 10) ? '0' + value : value + '';
            },
        }
    }
</script>

<style lang="scss">
    .timepicker {
        @extend .typo-input-label;
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