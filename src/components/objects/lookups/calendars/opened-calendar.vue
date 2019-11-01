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
    import deepEqual from 'deep-equal';
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
            async submit() {
                const isEqualToInitial = deepEqual(this.itemInstance, this.initialItem);
                if (!isEqualToInitial) {
                    const validations = this.checkValidations('itemInstance');
                    if (!validations) {
                        try {
                            await this.saveCalendar();
                            await this.saveWorkWeek();
                            await this.saveHolidays();
                            // this.close();
                        } catch (err) {
                            // this.loadItem();
                        }
                    }
                } else {
                    this.close();
                }
            },

            async saveCalendar() {
                const calendarChanged = !deepEqual(this.itemInstance.calendar, this.initialItem.calendar);
                if (calendarChanged) {
                    if (this.id) {
                        await updateCalendar(this.itemInstance.calendar.id, this.itemInstance.calendar);
                    } else {
                        this.id = await addCalendar(this.itemInstance.calendar);
                    }
                }
            },

            async saveWorkWeek() {
                this.addWorkWeek();
                this.updateWorkWeek();
            },

            async saveHolidays() {
                this.addHolidays();
                this.updateHolidays();
            },

            async addWorkWeek() {
                const newWorkdays = this.itemInstance.workWeek.filter(workday => !workday.id);
                if (newWorkdays.length) {
                    for (const workday of newWorkdays) {
                        try {
                            await addWorkday(this.id, workday);
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            },
            async addHolidays() {
                const newHolidays = this.itemInstance.holidays.filter(holiday => !holiday.id);
                if (newHolidays.length) {
                    for (const holiday of newHolidays) {
                        try {
                            await addHoliday(this.id, holiday);
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            },
            async updateWorkWeek() {
                // console.log(this.itemInstance.workWeek);
                // await this.itemInstance.workWeek.forEach(async workday => {
                //     console.log(workday)
                for (const workday of this.itemInstance.workWeek) {
                    console.log(workday);
                    if (workday.id) {
                        const initIndex = this.initialItem.workWeek.findIndex(initialWeekday => {
                            return deepEqual(workday, initialWeekday);
                        });
                        if (initIndex === -1) {
                            try {
                                console.log('before send', workday);
                                await updateWorkday(this.id, workday.id, workday);
                            } catch (err) {
                                throw err;
                            }
                        }
                    }
                }
            },
            async updateHolidays() {
                for (const holiday of this.itemInstance.holidays) {
                    if (holiday.id) {
                        const initIndex = this.initialItem.holidays.findIndex(initialHoliday => {
                            return deepEqual(holiday, initialHoliday);
                        });
                        if (initIndex === -1) {
                            try {
                                await updateHoliday(this.id, holiday.id, holiday);
                            } catch (err) {
                                throw err;
                            }
                        }
                    }
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