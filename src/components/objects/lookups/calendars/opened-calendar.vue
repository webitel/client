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
            <!--            <expansion-panel class="grid-w100">-->
            <!--                <template slot="expansion-header">-->
            <!--                    <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>-->
            <!--                </template>-->
            <!--                <template slot="expansion-content">-->
            <!--                    <work-week/>-->
            <!--                </template>-->
            <!--            </expansion-panel>-->

            <!--            <expansion-panel class="grid-w100">-->
            <!--                <template slot="expansion-header">-->
            <!--                    <h3 class="content-title">{{$t('objects.lookups.calendars.holidays')}}</h3>-->
            <!--                </template>-->
            <!--                <template slot="expansion-content">-->
            <!--                    <holidays/>-->
            <!--                </template>-->
            <!--            </expansion-panel>-->
        </section>
    </div>
</template>

<script>
    import openedCalendarGeneral from './opened-calendar-general';
    import calendarsWorkWeek from './calendars-work-week';
    import calendarsHolidays from './calendars-holidays';
    import editComponentMixin from '@/mixins/editComponentMixin';

    import {required} from 'vuelidate/lib/validators';
    import {
        addCalendar,
        getCalendar,
        updateCalendar,
    } from "../../../../api/objects/lookups/calendars";

    export default {
        name: "opened-calendar",
        mixins: [editComponentMixin],
        components: {
            'work-week': calendarsWorkWeek,
            'holidays': calendarsHolidays,
            openedCalendarGeneral,
        },
        data() {
            return {
                itemInstance: {
                    name: '',
                    timezone: {},
                    description: '',
                    startDate: Date.now(),
                    endDate: Date.now()
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
                name: {
                    required
                },
                timezone: {
                    required
                }
            }
        },

        methods: {
            async loadItem() {
                const response = await getCalendar(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            },

            async save() {
                if (this.id) {
                    let calendarToSend = {
                        id: this.itemInstance.id,
                        name: this.itemInstance.name,
                        timezone: {
                            id: this.itemInstance.timezone.id,
                        },
                        description: this.itemInstance.name
                    };
                    await updateCalendar(calendarToSend);
                } else {
                    let calendarToSend = {
                        name: this.itemInstance.name,
                        timezone: {
                            id: this.itemInstance.timezone.id,
                        },
                        description: this.itemInstance.name
                    };
                    await addCalendar(calendarToSend);
                }

                this.close();
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>