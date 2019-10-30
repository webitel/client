<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.lookups.calendars.calendars', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new calendars-new object-with-tabs">
            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
        </section>
    </div>
</template>

<script>
    import openedCalendarGeneral from './opened-calendar-general';
    import openedCalendarWorkWeek from './opened-calendar-work-week';
    import openedCalendarHolidays from './opened-calendar-holidays';
    import editComponentMixin from '@/mixins/editComponentMixin';

    import {required} from 'vuelidate/lib/validators';
    import {
        addCalendar,
        getCalendar,
        updateCalendar,
        getWorkdayList,
        getHolidayList, addWorkday, addHoliday,
    } from "../../../../api/objects/lookups/calendars";

    export default {
        name: "opened-calendar",
        mixins: [editComponentMixin],
        components: {
            openedCalendarWorkWeek,
            openedCalendarHolidays,
            openedCalendarGeneral,
        },
        data() {
            return {
                itemInstance: {
                    calendar: {
                        name: '11calendar',
                        timezone: {},
                        description: '11calendar',
                        start: Date.now(),
                        finish: Date.now(),
                        expires: false,
                    },
                    workWeek: [],
                    holidays: []
                },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.lookups.calendars.workWeek'),
                        value: 'work-week',
                    },
                    {
                        text: this.$t('objects.lookups.calendars.holidays'),
                        value: 'holidays',
                    }
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                calendar: {
                    name: {
                        required
                    },
                    timezone: {
                        required
                    }
                }
            }
        },

        mounted() {
            this.loadItem();
        },

        methods: {
            async loadItem() {
                 this.loadCalendar();
                 this.loadWorkWeek();
                 this.loadHolidays();

                // this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },

            async loadCalendar() {
                if (this.id) {
                    this.itemInstance.calendar = await getCalendar(this.id);
                }
            },
            async loadWorkWeek() {
                if (this.id) {
                    this.itemInstance.workWeek = await getWorkdayList(this.id);
                } else {
                   for(let i = 0; i < 7; i++) {
                        this.itemInstance.workWeek.push({
                            day: i,
                            enabled: i < 5,
                            start: 9 * 60,
                            end: 20 * 60,
                        });
                    }
                }
            },
            async loadHolidays() {
                if (this.id) {
                    const response = await getHolidayList(this.id);
                    console.log(response);
                    this.itemInstance.holidays = [...response];
                } else {
                    this.itemInstance.holidays.push({
                        name: 'New Year',
                        date: +((new Date('01.01.2020').getTime() + '').slice(0, 10)),
                        repeat: true
                    });
                }
            },

            async save() {
                if (this.id) {
                    try {

                    } catch (err) {

                    }
                } else {
                    try {
                        const calendarId = await addCalendar(this.itemInstance.calendar);
                        await this.itemInstance.workWeek.forEach(async workday => {
                            await addWorkday(calendarId, workday);
                        });
                        await this.itemInstance.holidays.forEach(async holiday => {
                            addHoliday(calendarId, holiday);
                        });
                        this.close();
                    } catch (err) {

                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>