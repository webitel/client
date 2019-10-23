<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.holidays')}}</h3>
            <i class="icon-action icon-icon_plus" @click=""></i>
        </header>
        <vuetable
                :api-mode="false"
                :fields="holidaysFields"
                :data="itemInstance.holidays"
        >

            <template slot="date" slot-scope="props">
                <span>{{itemInstance.holidays[props.rowIndex].date}}</span>
            </template>

            <template slot="repeat" slot-scope="props">
                <switcher
                    v-model="itemInstance.holidays[props.rowIndex].repeat"
                ></switcher>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_edit"
                   @click="edit(props.rowIndex)"
                ></i>
                <i class="vuetable-action icon-icon_delete"
                   @click="remove(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
    </section>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {addHoliday, deleteHoliday, getHolidayList} from "@/api/objects/lookups/calendars";
    import {_actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-calendar-holidays",
        components: {
            vuetable,
        },
        mixins: [openedTabComponentMixin],
        data() {
            return {
                holidaysFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'date', title: this.$t('objects.lookups.calendars.date')},
                    {name: 'repeat', title: this.$t('objects.lookups.calendars.repeat')},
                    _actionsTableField_2,
                ],
            }
        },

        methods: {
            async loadHolidayList() {
                // if (this.id) {
                //     const holidayList = await getHolidayList(this.id);
                //     this.holidayList = [...holidayList.items];
                    // this.workWeek = workWeek.items.map(workday => {
                    //     return {
                    //         name: this.weekdays[workday.week_day],
                    //         id: workday.id,
                    //         enabled: !workday.disabled,
                    //         start: this.convertSecToHours(workday.start_time_of_day),
                    //         end: this.convertSecToHours(workday.end_time_of_day),
                    //         origin: true
                    //     }
                    // });
                // } else {

                // }
            },

            async remove(rowId) {
                // const deletedHoliday = this.holidayList.splice(rowId, 1)[0];

                try {
                    // await deleteHoliday(this.id, deletedHoliday.id)
                } catch (err) {
                    // this.holidayList.splice(rowId, 0, deletedHoliday);
                }
            },

            async sendHolidays() {
                // await addHoliday(this.holidayList[0], this.id);
            },
        }
    }
</script>

<style scoped>

</style>