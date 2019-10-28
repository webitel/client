<template>
    <popup
            :title="$t('objects.lookups.calendars.newHoliday')"
            @close="$emit('close')">
        <form>
            <form-input
                v-model="itemInstance.name"
                :label="$t('objects.name')"
                :placeholder="$t('objects.lookups.calendars.date')"
            ></form-input>
            <div class="date">
                <datepicker
                        class="datepicker__to-right"
                        v-model="itemInstance.date"
                        :label="$t('objects.lookups.calendars.date')"
                        :calendar-button-icon="'icon-icon_arrow-down'"
                        calendar-button
                ></datepicker>
                <div class="switcher-label-wrap">
                    <div class="label">{{$t('objects.lookups.calendars.everyYear')}}</div>
                    <switcher
                            v-model="itemInstance.repeat"
                    ></switcher>
                </div>
            </div>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import datepicker from '@/components/utils/datepicker';
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-calendar-holiday-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
            datepicker,
        },
        data() {
            return {
                itemInstance: {
                    name: '',
                    date: Date.now(),
                    repeat: true,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .date {
        display: flex;
        margin-top: 14px;

        .datepicker {
            margin-right: 18px;
        }

        .switcher {
            margin-top: 9px;
        }
    }
</style>