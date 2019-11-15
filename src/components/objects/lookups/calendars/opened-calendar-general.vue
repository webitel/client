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
                    :options="dropdownOptionsList"
                    :displayProperty="'name'"
                    :label="$t('objects.lookups.calendars.timezone')"
                    :placeholder="$t('objects.lookups.calendars.timezone')"
                    :value="v.itemInstance.calendar.timezone.$model"
                    @input="itemInstance.calendar.timezone = $event"
                    @search="searchList"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="itemInstance.calendar.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="calendars__dates">
                <div class="switcher-label-wrap">
                    <div class="label">{{$t('objects.lookups.calendars.fulltime')}}</div>
                    <switcher
                            v-model="itemInstance.calendar.expires"
                    ></switcher>
                </div>
                <div class="calendars__date-wrap">
                    <datepicker
                            v-model="itemInstance.calendar.start"
                            :label="$t('objects.lookups.calendars.start')"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :disabled="!itemInstance.calendar.expires"
                            calendar-button
                    ></datepicker>
                    <datepicker
                            v-model="itemInstance.calendar.end"
                            :label="$t('objects.lookups.calendars.end')"
                            :calendar-button-icon="'icon-icon_arrow-down'"
                            :disabled="!itemInstance.calendar.expires"
                            calendar-button
                    ></datepicker>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import datepicker from '@/components/utils/datepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getCalendarTimezones} from "../../../../api/objects/lookups/calendars";

    export default {
        name: "opened-calendar-general",
        mixins: [openedTabComponentMixin],
        components: {
            datepicker,
        },

        data() {
            return {}
        },

        methods: {
            async loadDropdownOptionsList() {
                const response = await getCalendarTimezones();
                this.dropdownOptionsList = response.items;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .switcher-label-wrap {
        margin: 0 0 28px;

        .switcher {
            margin-top: 7px;
        }
    }

    .calendars__date-wrap {
        display: flex;
        align-items: center;

        .datepicker:first-child {
            margin-right: 28px;
        }
    }
</style>