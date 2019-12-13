<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.lookups.calendars.calendars', 1)}}</span> | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedCalendarGeneral from './opened-calendar-general';
    import openedCalendarWorkWeek from './opened-calendar-work-week';
    import openedCalendarHolidays from './opened-calendar-holidays';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {timerangeNotIntersect, timerangeStartLessThanEnd} from '@/utils/validators';
    import {
        addCalendar,
        getCalendar,
        updateCalendar,
        getWorkdayList,
        getHolidayList, addWorkday, addHoliday, updateWorkday, updateHoliday,
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
                        end: Date.now(),
                        expires: false,
                    },
                    workWeek: [],
                    holidays: []
                },
                tabs: [
                    {value: 'general', text: this.$t('objects.general'),},
                    {value: 'work-week', text: this.$t('objects.lookups.calendars.workWeek'),},
                    {value: 'holidays', text: this.$t('objects.lookups.calendars.holidays'),}
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
                },
                workWeek: {
                    timerangeNotIntersect,
                    $each: {
                        timerangeStartLessThanEnd
                    }
                },
            }
        },

        mounted() {
            this.loadItem();
        },

        methods: {
            async save() {
                try {
                    this.id = await this.saveObject('calendar', addCalendar, updateCalendar);
                    await this.saveArray('workWeek', addWorkday);
                    await this.updateArray('workWeek', updateWorkday);
                    await this.saveArray('holidays', addHoliday);
                    await this.updateArray('holidays', updateHoliday);
                    this.close();
                } catch (err) {
                    this.loadItem();
                }
            },

            async loadItem() {
                await this.loadCalendar();
                await this.loadWorkWeek();
                await this.loadHolidays();

                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
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
                    this.itemInstance.workWeek = [];
                    for (let i = 0; i < 7; i++) {
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
                    this.itemInstance.holidays = [...response];
                } else {
                    this.itemInstance.holidays.push({
                        name: 'New Year',
                        date: new Date('01.01.2020').getTime(),
                        repeat: true
                    });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>