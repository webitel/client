<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.calendar.name.$model"
                    :v="v.itemInstance.calendar.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    :options="timezoneList"
                    :displayProperty="'name'"
                    :label="$t('objects.lookups.calendars.timezone')"
                    :placeholder="$t('objects.lookups.calendars.timezone')"
                    :value="v.itemInstance.calendar.timezone.$model"
                    @input="itemInstance.calendar.timezone = $event"
                    required
            ></dropdown-select>

            <form-input
                    class="form__input"
                    v-model.trim="itemInstance.calendar.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="calendars__dates">
                <div class="calendars__date-wrap">
                    <datepicker
                            v-model="itemInstance.calendar.start"
                            :label="$t('objects.lookups.calendars.start')"
                            :format="'d MMMM yyyy'"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :maximum-view="'day'"
                            :disabled="!itemInstance.calendar.expires"
                            monday-first
                            calendar-button
                    ></datepicker>
                    <datepicker
                            v-model="itemInstance.calendar.finish"
                            :label="$t('objects.lookups.calendars.end')"
                            :format="'d MMMM yyyy'"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :maximum-view="'day'"
                            :disabled="!itemInstance.calendar.expires"
                            monday-first
                            calendar-button
                    ></datepicker>
                    <div class="switcher-label-wrap">
                        <div class="label">{{$t('objects.lookups.calendars.fulltime')}}</div>
                        <switcher
                                v-model="itemInstance.calendar.expires"
                        ></switcher>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import datepicker from '@/components/utils/datepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { getCalendarTimezones } from "../../../../api/objects/lookups/calendars";

    export default {
        name: "opened-calendar-general",
        mixins: [openedTabComponentMixin],
        components: {
            datepicker,
        },

        data() {
            return {
                timezoneList: []
            }
        },

        mounted() {
            this.loadTimezones();
        },

        methods: {
            async loadTimezones() {
                const response = await getCalendarTimezones();
                this.timezoneList = response.items;
            },
        }
    }
</script>

<style lang="scss" scoped>

    .calendars__to-separator {
        color: $icon-color;
    }

    .calendars__date-wrap {
        display: flex;
        align-items: center;

        .datepicker {
            // all width - switch margin - switch wrap
            width: calc(50% - (43px + 48px + 40px) / 2);
            margin-right: 28px;
        }

        .switcher-label-wrap {
            margin: 0 0 auto;
            .switcher {
                margin-top: 7px;
            }
        }
    }
</style>