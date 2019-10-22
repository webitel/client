<template>
    <section>
        <template slot="expansion-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </template>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    :options="timezoneList"
                    :displayProperty="'name'"
                    :label="$t('objects.lookups.calendars.timezone')"
                    :placeholder="$t('objects.lookups.calendars.timezone')"
                    :value="v.itemInstance.timezone.$model"
                    @input="itemInstance.timezone = $event"
                    required
            ></dropdown-select>

            <form-input
                    class="form__input"
                    v-model.trim="itemInstance.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="calendars__dates">
                <div class="calendars__date-wrap">
                    <datepicker
                            v-model="itemInstance.startDate"
                            :label="$t('objects.lookups.calendars.start')"
                            :format="'d MMMM yyyy'"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :maximum-view="'day'"
                            :disabled="isCalendarExpiration"
                            monday-first
                            calendar-button
                    ></datepicker>
                    <span class="calendars__to-separator">to</span>
                    <datepicker
                            v-model="itemInstance.endDate"
                            :label="$t('objects.lookups.calendars.end')"
                            :format="'d MMMM yyyy'"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :maximum-view="'day'"
                            :disabled="isCalendarExpiration"
                            monday-first
                            calendar-button
                    ></datepicker>
                    <div class="switcher-label-wrap">
                        <div class="label">{{$t('objects.lookups.calendars.fulltime')}}</div>
                        <switcher
                                :value="isCalendarExpiration"
                                @toggleSwitch="isCalendarExpiration = $event"
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
                isCalendarExpiration: false,
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
            // all width - "to" margins - "to" - switch margin - switch wrap
            width: calc(50% - (23px * 2 + 19px + 43px + 48px) / 2);
        }

        .calendars__to-separator {
            margin: auto 23px;
        }

        .switcher-label-wrap {
            margin: 0 0 auto 43px;
            .switcher {
                margin-top: 7px;
            }
        }
    }
</style>