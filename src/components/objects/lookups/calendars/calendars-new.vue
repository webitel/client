<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'calendarInstance', 'initialCalendar')"
                :secondaryAction="close"
        >
            <span>{{$tc('objects.lookups.calendars.calendars', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new calendars-new">


            <expansion-panel opened>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model.trim="$v.calendarInstance.name.$model"
                            :v="$v.calendarInstance.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            required
                    ></form-input>

                    <dropdown-select
                            :v="$v.calendarInstance.timezone.name"
                            :options="computeTimezoneRepresentation"
                            :label="$t('objects.lookups.calendars.timezone')"
                            :placeholder="$v.calendarInstance.timezone.name.$model ||
                             $t('objects.lookups.calendars.timezone')"
                            @input="calendarInstance.timezone.name = $event"
                            required
                    ></dropdown-select>

                    <form-input
                            class="form__input"
                            v-model.trim="calendarInstance.description"
                            :label="$t('objects.description')"
                            :placeholder="$t('objects.description')"
                    ></form-input>

                    <div class="calendars__dates">
                        <div class="calendars__date-wrap">
                            <datepicker
                                    v-model="calendarInstance.startDate"
                                    :format="'d MMMM yyyy'"
                                    :calendar-button-icon="'icon-icon_arrow-down'"
                                    :maximum-view="'day'"
                                    :disabled="!isCalendarExpiration"
                                    monday-first
                                    calendar-button
                            ></datepicker>
                        </div>
                        <span class="calendars__to-separator">to</span>
                        <div class="calendars__date-wrap">
                            <datepicker
                                    v-model="calendarInstance.endDate"
                                    :format="'d MMMM yyyy'"
                                    :calendar-button-icon="'icon-icon_arrow-down'"
                                    :maximum-view="'day'"
                                    :disabled="!isCalendarExpiration"
                                    monday-first
                                    calendar-button
                            ></datepicker>
                        </div>
                        <switcher
                                :value="isCalendarExpiration"
                                @toggleSwitch="isCalendarExpiration = $event"
                        ></switcher>
                    </div>


                    <btn @click.native="sendCalendar">send</btn>
                </template>
            </expansion-panel>

            <expansion-panel class="grid-w100" opened>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>
                </template>
                <template slot="expansion-content">
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
                            <div class="vuetable-actions">
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
                </template>
            </expansion-panel>

            <expansion-panel class="grid-w100">
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.lookups.calendars.holidays')}}</h3>
                </template>
                <template slot="expansion-content">
                    <vuetable
                            :api-mode="false"
                            :fields="holidaysFields"
                            :data="holidays"
                    >

                        <template slot="date" slot-scope="props">
                            <span>{{holidays[props.rowIndex].date}}</span>
                        </template>

                        <template slot="repeat" slot-scope="props">
                            <span>{{holidays[props.rowIndex].repeat}}</span>
                        </template>

                        <template slot="actions" slot-scope="props">
                            <i class="vuetable-action icon-icon_edit"
                               @click="edit(props.rowIndex)"
                            ></i>
                            <i class="vuetable-action icon-icon_delete"
                               @click="this.remove(props.rowIndex)"
                            ></i>
                        </template>
                    </vuetable>
                    <i class="icon-action icon-icon_plus" @click=""></i>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import datepicker from 'vuejs-datepicker';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import btn from '@/components/utils/btn';

    import {required} from 'vuelidate/lib/validators';
    import {addCalendar, getCalendar, getCalendarTimezones} from "../../../../api/objects/lookups/calendars";

    export default {
        name: "calendars-new",
        components: {
            vuetable,
            datepicker,
            btn
        },
        mixins: [editComponentMixin],
        data() {
            return {
                calendarInstance: {
                    name: '',
                    timezone: {},
                    description: '',
                    startDate: '',
                    endDate: ''
                },
                initialCalendar: {
                    name: '',
                    timezone: {},
                    description: '',
                    startDate: Date.now(),
                    endDate: Date.now()
                },
                isCalendarExpiration: false,
                workWeek: {
                    Monday: [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: [],
                    Sunday: []
                },
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
                holidays: [
                    {
                        name: 'New Year',
                        date: '01.01',
                        repeat: 'yep'
                    }
                ],
                holidaysFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'date', title: this.$t('objects.lookups.calendars.date')},
                    {name: 'repeat', title: this.$t('objects.lookups.calendars.repeat')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
                timezoneList: []
            };
        },

        // by vuelidate
        validations: {
            calendarInstance: {
                name: {
                    required
                },
                timezone: {
                    required
                }
            }
        },

        mounted() {
            if (this.id) {
                this.loadCalendar();
                this.loadHolidays();
            }
            this.loadWorkWeek();
            this.loadTimezones();
        },

        computed: {
            computeWWeekRepresentation() {
                const workWeek = [];
                Object.values(this.workWeek).map((workDay, dayIndex) => {
                    workDay.forEach((range, rangeIndex) => {
                        workWeek.push({
                            name: rangeIndex === 0 ? Object.keys(this.workWeek)[dayIndex] : '',
                            start: range.start,
                            end: range.end,
                            enabled: range.enabled,
                            origin: !!range.origin,
                            tag: Object.keys(this.workWeek)[dayIndex]
                        })
                    });
                });
                return workWeek;
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

            computeTimezoneRepresentation() {
                return this.timezoneList.map(timezone => {
                    let timezoneOffset;

                    if (timezone.offset[0] === '-') {
                        timezoneOffset = timezone.offset.slice(0, 6);
                    } else {
                        timezoneOffset = timezone.offset.slice(0, 5);
                    }
                    return timezone.name + ', ' + timezoneOffset;
                })
            }
        },

        methods: {
            async loadCalendar() {
                const response = await getCalendar(this.id);
                this.calendarInstance = response;
                this.initialCalendar = JSON.parse(JSON.stringify(response));
            },

            async sendCalendar() {
                const timezone = this.timezoneList.find(timezone => {
                    return timezone.name = this.calendarInstance.timezone.split(',')[0].trim();
                });

                let calendarToSend = {
                    name: this.calendarInstance.name,
                    timezone: {
                        id: timezone.id,
                        name: timezone.name
                    },
                    description: this.calendarInstance.name
                };
                await addCalendar(calendarToSend);
            },

            async loadWorkWeek() {
                if (this.id) {
                    // this.workWeek = await getWorkWeek();
                } else {
                    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    weekdays.forEach(day => {
                        this.workWeek[day] = [{
                            enabled: true,
                            start: '9:00',
                            end: '20:00',
                            origin: true
                        }]
                    });
                }
            },

            async loadTimezones() {
                this.timezoneList = await getCalendarTimezones();
            },

            loadHolidays() {

            },

            addWorkRange(day) {
                this.workWeek[day].push({
                    enabled: true,
                    start: '10:10',
                    end: '20:20',
                });
            },

            setWorkWeekTime(day, rowIndex, time, newValue) {
                this.workWeek[day][rowIndex][time] = newValue;
            },

            removeWorkRange(day, rowIndex) {
                this.workWeek[day].splice(rowIndex, 1);
            },

            save() {
                if (this.id) {
                    //    update
                } else {
                    //    create
                }

                this.close();
            },

            computeWorkdayEnd(dataItem) {
                return dataItem.name !== '' ? 'day-start' : ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    .calendars__to-separator {
        color: $icon-color;
    }

    .calendars__dates {
        display: flex;
        padding: 25px 0 20px; /*FIXME: BALANCE GRID*/

        .calendars__date-wrap {
            // all width - "to" margins - "to" - switch margin - switch
            width: calc(50% - (23px * 2 + 19px + 43px + 40px) / 2);
        }

        .calendars__to-separator {
            margin: auto 23px;
        }

        .switcher {
            margin: auto 0 auto 43px;
        }
    }

    .calendar-workweek__item {
        /*height: 52px;*/
    }
</style>