<template>
    <section class="opened-calendar-work-week">
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.workWeek')}}</h3>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
                :row-class="computeWorkdayEnd"
        >

            <template slot="name" slot-scope="props">
                <span v-if="isDayStart(props.rowIndex)">
                    {{weekdays[dataList[props.rowIndex].day]}}
                </span>
            </template>

            <template slot="start" slot-scope="props">
                <timepicker
                        :value="dataList[props.rowIndex].start"
                        :format="'hh:mm'"
                        @input="setItemProp({prop: 'start', index: props.rowIndex, value: $event})"
                ></timepicker>
            </template>

            <template slot="end" slot-scope="props">
                <timepicker
                        :value="dataList[props.rowIndex].end"
                        :format="'hh:mm'"
                        @input="setItemProp({prop: 'end', index: props.rowIndex, value: $event})"
                ></timepicker>
            </template>

            <template slot="status" slot-scope="props">
                <switcher
                        :value="!dataList[props.rowIndex].disabled"
                        @input="setItemProp({prop: 'disabled', index: props.rowIndex, value: !$event})"
                ></switcher>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_plus"
                   v-if="isDayStart(props.rowIndex)"
                   :title="$t('iconHints.add')"
                   @click="addWorkRange(dataList[props.rowIndex].day)"
                ></i>
                <i class="vuetable-action icon-icon_delete calendar-workweek__item"
                   v-else
                   :title="$t('iconHints.delete')"
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
    import { _actionsTableField_1, _switcherWidth } from '@/utils/tableFieldPresets';

    import { mapActions, mapState } from 'vuex';
    import { deleteWorkday } from '../../../api/lookups/calendars/calendars';

    export default {
        name: 'opened-calendar-work-week',
        components: {
            vuetable,
            timepicker,
        },
        mixins: [openedTabComponentMixin],
        data() {
            return {
                fields: [
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'start', title: this.$t('objects.lookups.calendars.start') },
                    { name: 'end', title: this.$t('objects.lookups.calendars.end') },
                    { name: 'status', title: this.$t('objects.lookups.calendars.enabled'), width: _switcherWidth },
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

        computed: {
            ...mapState('lookups/calendars', {
                dataList: (state) => state.itemInstance.accepts,
            }),
        },

        methods: {
            isDayStart(rowIndex) {
                return this.dataList[rowIndex].day // this day index is not equal to
                    !== (this.dataList[rowIndex - 1] || {}).day; // prev day index (or empty)
            },

            computeWorkdayEnd(item, rowIndex) {
                return this.isDayStart(rowIndex) ? 'day-start' : '';
            },

            ...mapActions('lookups/calendars', {
                setItemProp: 'SET_ACCEPT_ITEM_PROPERTY',
                addWorkRange: 'ADD_ACCEPT_ITEM',
                remove: 'REMOVE_ACCEPT_ITEM',
            }),

        },
    };
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
