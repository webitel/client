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
                            :label="$t('objects.lookups.calendars.timezone')"
                            :placeholder="$t('objects.lookups.calendars.timezone')"
                    ></dropdown-select>

                    <form-input
                            class="form__input"
                            v-model.trim="$v.calendarInstance.description"
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
                                    monday-first
                                    calendar-button
                            ></datepicker>
                        </div>
                        <switcher
                                :value="isCalendarExpiration"
                        ></switcher>
                    </div>

                </template>
            </expansion-panel>

            <expansion-panel class="grid-w100">
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>
                </template>
                <template slot="expansion-content">
                    <vuetable
                            :api-mode="false"
                            :fields="workWeekFields"
                            :data="computeWorkWeekRepresentation"
                            :row-class="computeWorkdayEnd"
                    >

                        <template slot="start" slot-scope="props">
                            <div class="calendar-workweek__item">
                                {{computeWorkWeekRepresentation[props.rowIndex].start}}
                            </div>
                        </template>

                        <template slot="to" slot-scope="props">
                            <span class="calendars__to-separator">to</span>
                        </template>

                        <template slot="end" slot-scope="props">
                            <div class="calendar-workweek__item">
                                {{computeWorkWeekRepresentation[props.rowIndex].end}}
                            </div>
                        </template>

                        <template slot="status" slot-scope="props">
                            <switcher
                                    :value="computeWorkWeekRepresentation[props.rowIndex].enabled"
                                    @toggleSwitcher="computeWorkWeekRepresentation[props.rowIndex].status = $event"
                            ></switcher>
                        </template>

                        <template slot="actions" slot-scope="props">
                            <div class="vuetable-actions">
                                <i class="vuetable-action icon-icon_plus"
                                   v-if="computeWorkWeekRepresentation[props.rowIndex].origin"
                                   @click="edit(props.rowIndex)"
                                ></i>
                                <i class="vuetable-action icon-icon_delete calendar-workweek__item"
                                   v-else
                                   @click="this.remove(props.rowIndex)"
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

    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "calendars-edit",
        components: {
            vuetable,
            datepicker
        },
        mixins: [editComponentMixin],
        data() {
            return {
                calendarInstance: {
                    name: 'calendar name',
                    timezone: '',
                    description: '',
                    startDate: Date.now(),
                    endDate: Date.now()
                },
                initialCalendar: {
                    name: 'calendar name',
                    // description: '',
                },
                isCalendarExpiration: false,
                workWeek: {
                    monday: [
                        {
                            enabled: true,
                            start: '10.10.10',
                            end: '20.20.20',
                            origin: true
                        },
                        {
                            enabled: false,
                            start: '10.10.10',
                            end: '20.20.20'
                        }
                    ],
                    tuesday: [
                        {
                            enabled: true,
                            start: '10.10.10',
                            end: '20.20.20',
                            origin: true
                        },
                    ]
                },
                // workWeek: [
                //     {
                //         name: 'Monday',
                //         enabled: true,
                //         ranges: [
                //             {
                //                 start: '20.20.02',
                //                 end: '10.10.01',
                //             },
                //             // {
                //             //     start: '20.20.02',
                //             //     end: '10.10.01',
                //             // }
                //         ]
                //
                //     },
                //     {
                //         name: 'Monday',
                //         enabled: true,
                //         ranges: [
                //             {
                //                 start: '20.20.02',
                //                 end: '10.10.01',
                //             }
                //         ]
                //
                //     },
                //     {
                //         name: 'Tuesday',
                //         enabled: false,
                //         ranges: [
                //             {
                //                 start: '20.20.02',
                //                 end: '10.10.01',
                //             },
                //             // {
                //             //     start: '20.20.02',
                //             //     end: '10.10.01',
                //             // }
                //         ]
                //
                //     },
                // ],
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
            };
        },

        // by vuelidate
        validations: {
            calendarInstance: {
                name: {
                    required
                }
            }
        },

        computed: {
            computeWorkWeekRepresentation() {
                const workWeek = [];
                Object.values(this.workWeek).map((workDay, dayIndex) => {
                    workDay.forEach((range, rangeIndex) => {
                        workWeek.push({
                            name: rangeIndex === 0 ? Object.keys(this.workWeek)[dayIndex] : '',
                            start: range.start,
                            end: range.end,
                            enabled: range.enabled,
                            origin: !!range.origin
                        })
                    });
                });
                return workWeek;
            },
        },

        methods: {
            computeWorkdayEnd(dataItem, index) {
                return dataItem.name !== '' ? 'day-start' : ''
            },
            save() {
                if (this.id) {
                    //    update
                } else {
                    //    create
                }

                this.close();
            }
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
            width: calc(50% - 23px * 2 - 19px - 43px - 40px); // all width - "to" margins - "to" - switch margin - switch
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