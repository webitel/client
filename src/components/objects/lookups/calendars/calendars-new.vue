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
                            :options="timezoneList"
                            :displayProperty="'name'"
                            :label="$t('objects.lookups.calendars.timezone')"
                            :placeholder="$t('objects.lookups.calendars.timezone')"
                            :value="$v.calendarInstance.timezone.$model"
                            @input="calendarInstance.timezone = $event"
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
                    <work-week></work-week>
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
    import calendarsWorkWeek from './calendars-work-week';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import datepicker from 'vuejs-datepicker';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import btn from '@/components/utils/btn';

    import {required} from 'vuelidate/lib/validators';
    import {
        addCalendar,
        getCalendar,
        getCalendarTimezones,
        updateCalendar,
    } from "../../../../api/objects/lookups/calendars";

    export default {
        name: "calendars-new",
        components: {
            'work-week': calendarsWorkWeek,
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
            }
            this.loadTimezones();
        },

        computed: {},

        methods: {
            async loadCalendar() {
                const response = await getCalendar(this.id);
                this.calendarInstance = response;
                this.initialCalendar = JSON.parse(JSON.stringify(response));
            },

            async sendCalendar() {
                if (this.id) {
                    let calendarToSend = {
                        id: this.calendarInstance.id,
                        name: this.calendarInstance.name,
                        timezone: {
                            id: this.calendarInstance.timezone.id,
                        },
                        description: this.calendarInstance.name
                    };
                    await updateCalendar(calendarToSend);
                } else {
                    let calendarToSend = {
                        name: this.calendarInstance.name,
                        timezone: {
                            id: this.calendarInstance.timezone.id,
                        },
                        description: this.calendarInstance.name
                    };
                    await addCalendar(calendarToSend);
                }
            },

            async loadTimezones() {
                const response = await getCalendarTimezones();
                this.timezoneList = response.items;
            },

            save() {
                if (this.id) {
                    //    update
                } else {
                    //    create
                }

                this.close();
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