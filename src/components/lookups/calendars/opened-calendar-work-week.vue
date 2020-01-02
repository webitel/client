<template>
    <section class="opened-calendar-work-week">
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>
        </header>

        <vuetable
                :api-mode="false"
                :fields="workWeekFields"
                :data="itemInstance.workWeek"
                :row-class="computeWorkdayEnd"
        >

            <template slot="name" slot-scope="props">
                <span v-if="computeDayStart(props.rowIndex)">
                    {{weekdays[itemInstance.workWeek[props.rowIndex].day]}}
                </span>
            </template>

            <template slot="start" slot-scope="props">
                <timepicker
                        v-model="itemInstance.workWeek[props.rowIndex].start"
                >
                </timepicker>
            </template>

            <template slot="end" slot-scope="props">
                <timepicker
                        v-model="itemInstance.workWeek[props.rowIndex].end"
                >
                </timepicker>
            </template>

            <template slot="status" slot-scope="props">
                <switcher
                        v-model="itemInstance.workWeek[props.rowIndex].enabled"
                ></switcher>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_plus"
                   v-if="computeDayStart(props.rowIndex)"
                   @click="addWorkRange(itemInstance.workWeek[props.rowIndex].day)"
                ></i>
                <i class="vuetable-action icon-icon_delete calendar-workweek__item"
                   v-else
                   @click="remove(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_1} from "@/utils/tableFieldPresets";
    import {_switcherWidth} from "../../../utils/tableFieldPresets";
    import {deleteWorkday} from "../../../api/lookups/calendars";

    export default {
        name: "opened-calendar-work-week",
        components: {
            vuetable,
            timepicker,
        },
        mixins: [openedTabComponentMixin],
        data() {
            return {
                workWeekFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'start', title: this.$t('objects.lookups.calendars.start')},
                    {name: 'end', title: this.$t('objects.lookups.calendars.end')},
                    {name: 'status', title: this.$t('objects.lookups.calendars.enabled'), width: _switcherWidth},
                    _actionsTableField_1,
                ],
                weekdays: [
                    this.$t('objects.lookups.calendars.mon'),
                    this.$t('objects.lookups.calendars.tue'),
                    this.$t('objects.lookups.calendars.wed'),
                    this.$t('objects.lookups.calendars.thu'),
                    this.$t('objects.lookups.calendars.fri'),
                    this.$t('objects.lookups.calendars.sat'),
                    this.$t('objects.lookups.calendars.sun'),
                ],
            };
        },

        methods: {
            computeDayStart(rowIndex) {
                return this.itemInstance.workWeek[rowIndex].day !==
                    (this.itemInstance.workWeek[rowIndex - 1] || {}).day;
            },

            addWorkRange(day) {
                const dayRangeIndex = this.itemInstance.workWeek
                    .findIndex((workday, index, array) => {
                        return workday.day === day && (array[index + 1] || {}).day !== day
                    });

                this.itemInstance.workWeek.splice(dayRangeIndex + 1, 0, {
                    day,
                    enabled: true,
                    start: 9 * 60,
                    end: 20 * 60,
                });
            },

            async remove(rowIndex) {
                const deletedItem = this.itemInstance.workWeek.splice(rowIndex, 1)[0];
                if(deletedItem.id) {
                    try {
                        await deleteWorkday(this.id, deletedItem.id);
                    } catch {
                        this.itemInstance.workWeek.splice(rowIndex, 0, deletedItem);
                    }
                }
            },

            computeWorkdayEnd(item, rowIndex) {
                return this.computeDayStart(rowIndex) ? 'day-start' : ''
            },
        }
    }
</script>

<style lang="scss">
    .opened-calendar-work-week {
        .timepicker {
            position: relative;
            left: -16px;

            .vs__dropdown-toggle {
                border-color: transparent;
            }
        }
    }
</style>