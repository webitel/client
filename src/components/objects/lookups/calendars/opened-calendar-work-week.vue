<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>
        </header>

        <vuetable
                :api-mode="false"
                :fields="workWeekFields"
                :data="itemInstance.workWeek"
                :row-class="computeWorkdayEnd"
        >

            <template slot="name" slot-scope="props">
                <span v-if="computeDayStart(props.rowIndex)">
                    {{itemInstance.workWeek[props.rowIndex].name}}
                </span>
            </template>

            <template slot="start" slot-scope="props">
                <timepicker
                        v-model="itemInstance.workWeek[props.rowIndex].start"
                >
                </timepicker>
            </template>

            <template slot="end" slot-scope="props">
                <timepicker
                        v-model="itemInstance.workWeek[props.rowIndex].end"
                >
                </timepicker>
            </template>

            <template slot="status" slot-scope="props">
                <switcher
                        :value="itemInstance.workWeek[props.rowIndex].enabled"
                        @input="itemInstance.workWeek[props.rowIndex].status = $event"
                ></switcher>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_plus"
                   v-if="computeDayStart(props.rowIndex)"
                   @click="addWorkRange(itemInstance.workWeek[props.rowIndex].name)"
                ></i>
                <i class="vuetable-action icon-icon_delete calendar-workweek__item"
                   v-else
                   @click="removeWorkRange(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_1} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-calendar-work-week",
        components: {
            vuetable,
            timepicker,
        },
        mixins: [openedTabComponentMixin],
        data() {
            return {
                workWeekFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'start', title: this.$t('objects.lookups.calendars.start')},
                    {name: 'end', title: this.$t('objects.lookups.calendars.end')},
                    {name: 'status', title: this.$t('objects.lookups.calendars.enabled')},
                    _actionsTableField_1,
                ],
                weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            };
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
                    hour += ':00';
                    hourList.push(hour);
                }
                hourList.push('23:59');
                return hourList;
            },
        },

        methods: {
            async sendWorkWeek() {
                if (this.id) {

                    // } else {
                    Object.values(this.itemInstance.workWeek).forEach((weekday, index) => {
                        weekday.forEach(async range => {
                            await addWorkday({
                                week_day: index,
                                start_time_of_day: this.convertHoursToSec(range.start),
                                end_time_of_day: this.convertHoursToSec(range.end),
                                disabled: !range.enabled
                            }, this.id);
                        });
                    });
                }
            },

            setWorkWeekTime(day, rowIndex, time, newValue) {
                this.itemInstance.workWeek[rowIndex][time] = newValue;
            },

            computeDayStart(rowIndex) {
                return this.itemInstance.workWeek[rowIndex].name !==
                    (this.itemInstance.workWeek[rowIndex-1] || {}).name;
            },

            addWorkRange(day) {
                const dayRangeIndex = this.itemInstance.workWeek
                    .findIndex((workday, index, array) => {
                        return workday.name === day && array[index + 1].name !== day
                    });

                this.itemInstance.workWeek.splice(dayRangeIndex + 1, 0, {
                    name: day,
                    enabled: true,
                    start: 9*60,
                    end: 20*60,
                });
            },

            removeWorkRange(rowIndex) {
                this.itemInstance.workWeek.splice(rowIndex, 1);
            },

            convertHoursToSec(hoursStr) {
                let minSum = 0;
                const minInHour = 60;
                hoursStr.split(':').forEach((timeDigits, index) => {
                    if (index === 0) {
                        minSum += Math.floor(timeDigits * minInHour);
                    } else {
                        minSum += Math.floor(timeDigits % minInHour);
                    }
                });

                return minSum;
            },

            computeWorkdayEnd(dataItem, rowIndex) {
                return this.itemInstance.workWeek[rowIndex].name !==
                (this.itemInstance.workWeek[rowIndex-1] || {}).name
                    ? 'day-start' : ''
            },
        }
    }
</script>

<style scoped>

</style>