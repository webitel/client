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
        getHolidayList,
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
                        name: '',
                        timezone: {},
                        description: '',
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
                await this.loadCalendar();
                await this.loadWorkWeek();
                await this.loadHolidays();

                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },

            async loadCalendar() {
                if(this.id) {
                    this.itemInstance.calendar = await getCalendar(this.id);
                }
            },
            async loadWorkWeek() {
                if(this.id) {
                    this.itemInstance.workWeek = await getWorkdayList(this.id);
                } else {
                    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


                    weekdays.forEach((day, index) => {
                        this.itemInstance.workWeek.push({
                                name: weekdays[index],
                                enabled: index < 5,
                                start: '9:00',
                                end: '20:00',
                            });
                    });
                }
            },
            async loadHolidays() {
                if(this.id) {
                    this.itemInstance.holidays = await getHolidayList(this.id);
                } else {
                    this.itemInstance.holidays.push({
                        name: 'New Year',
                        date: (new Date('10.10.120').getTime()+'').slice(0, 10),
                        repeat: true
                    });
                }
            },

            async save() {
                if (this.id) {
                    // let calendarToSend = {
                    //     id: this.itemInstance.id,
                    //     name: this.itemInstance.name,
                    //     timezone: {
                    //         id: this.itemInstance.timezone.id,
                    //     },
                    //     description: this.itemInstance.name
                    // };
                    // await updateCalendar(calendarToSend);
                } else {
                    // let calendarToSend = {
                    //     name: this.itemInstance.name,
                    //     timezone: {
                    //         id: this.itemInstance.timezone.id,
                    //     },
                    //     description: this.itemInstance.name
                    // };
                    // await addCalendar(calendarToSend);
                }

                this.close();
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>