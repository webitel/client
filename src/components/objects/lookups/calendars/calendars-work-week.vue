<template>
    <section>
        <vuetable
                :api-mode="false"
                :fields="workWeekFields"
                :data="computeWWeekRepresentation"
                :row-class="computeWorkdayEnd"
        >

            <template slot="start" slot-scope="props">
                <dropdown-select
                        class="inline-dropdown options-align-right"
                        :placeholder="computeWWeekRepresentation[props.rowIndex].start"
                        :options="initHourList"
                        @input="setWorkWeekTime(computeWWeekRepresentation[props.rowIndex].
                                    tag, props.rowIndex, 'start', $event)"
                ></dropdown-select>
            </template>

            <template slot="to" slot-scope="props">
                <span class="calendars__to-separator calendars__to-separator__grid">to</span>
            </template>

            <template slot="end" slot-scope="props">
                <dropdown-select
                        class="inline-dropdown options-align-right"
                        :placeholder="computeWWeekRepresentation[props.rowIndex].end"
                        :options="initHourList"
                        @input="setWorkWeekTime(computeWWeekRepresentation[props.rowIndex].
                                    tag, props.rowIndex, 'end', $event)"
                ></dropdown-select>
            </template>

            <template slot="status" slot-scope="props">
                <switcher
                        :value="computeWWeekRepresentation[props.rowIndex].enabled"
                        @toggleSwitcher="computeWWeekRepresentation[props.rowIndex].status = $event"
                ></switcher>
            </template>

            <template slot="actions" slot-scope="props">
                <div class="vuetable-actions__wrap">
                    <i class="vuetable-action icon-icon_plus"
                       v-if="computeWWeekRepresentation[props.rowIndex].origin"
                       @click="addWorkRange(computeWWeekRepresentation[props.rowIndex].name)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete calendar-workweek__item"
                       v-else
                       @click="removeWorkRange(computeWWeekRepresentation[props.rowIndex].tag,
                                    props.rowIndex)"
                    ></i>
                </div>
            </template>
        </vuetable>
        <btn @click.native="sendWorkWeek">sendWorkWeek</btn>
    </section>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import btn from '@/components/utils/btn';

    import {
        getWorkdayList,
        addWorkday
    } from "../../../../api/objects/lookups/calendars";

    export default {
        name: "calendars-work-week",
        components: {
            vuetable,
            btn
        },
        mixins: [editComponentMixin],
        data() {
            return {
                workWeekFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'start', title: this.$t('objects.lookups.calendars.start')},
                    {name: 'to', title: ''},
                    {name: 'end', title: this.$t('objects.lookups.calendars.end')},
                    {name: 'status', title: this.$t('objects.lookups.calendars.enabled')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '60px'
                    },
                ],
                workWeek: [],
                weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            };
        },

        mounted() {
            this.loadWorkWeek();
        },

        computed: {
            computeWWeekRepresentation() {
                return this.workWeek.map((range, dayIndex) => {
                    return {
                        name: this.weekdays[range.week_day || dayIndex],
                        start: range.start,
                        end: range.end,
                        enabled: range.enabled,
                        origin: !!range.origin,
                        tag: Object.keys(this.workWeek)[dayIndex]
                    }
                });
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
                    hour += ':00';
                    hourList.push(hour);
                }
                hourList.push('23:59');
                return hourList;
            },
        },

        methods: {
            async loadWorkWeek() {
                if (this.id) {
                    const workWeek = await getWorkdayList(this.id);
                    this.workWeek = workWeek.items.map(workday => {
                        return {
                            name: this.weekdays[workday.week_day],
                            id: workday.id,
                            enabled: !workday.disabled,
                            start: this.convertSecToHours(workday.start_time_of_day),
                            end: this.convertSecToHours(workday.end_time_of_day),
                            origin: true
                        }
                    });
                } else {
                    this.workWeek = this.weekdays.map((day, index) => {
                        return {
                            name: this.weekdays[index],
                            enabled: index < 5,
                            start: '9:00',
                            end: '20:00',
                            origin: true
                        }
                    });
                }
            },

            async sendWorkWeek() {
                if (this.id) {

                    // } else {
                    Object.values(this.workWeek).forEach((weekday, index) => {
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
                this.workWeek[rowIndex][time] = newValue;
            },

            removeWorkRange(day, rowIndex) {
                this.workWeek[day].splice(rowIndex, 1);
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

            convertSecToHours(minNum) {
                const minInHour = 60;

                let hours = Math.floor(minNum / minInHour);
                let minutes = Math.floor(minNum % minInHour);

                if (minutes < 10) minutes += '0';
                return hours + ':' + minutes;
            },

            computeWorkdayEnd(dataItem) {
                return dataItem.name !== '' ? 'day-start' : ''
            },
        }
    }
</script>

<style scoped>

</style>