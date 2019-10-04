<template>
    <section>
        <vuetable
                :api-mode="false"
                :fields="holidaysFields"
                :data="holidayList"
        >

            <template slot="date" slot-scope="props">
                <span>{{holidayList[props.rowIndex].date}}</span>
            </template>

            <template slot="repeat" slot-scope="props">
                <span>{{holidayList[props.rowIndex].repeat}}</span>
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
        <i class="icon-action icon-icon_plus" @click=""></i>
        <btn @click.native="sendHolidays">send</btn>
    </section>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import btn from '@/components/utils/btn';
    import {addHoliday, deleteHoliday, getHolidayList} from "../../../../api/objects/lookups/calendars";

    export default {
        name: "calendars-holidays",
        components: {
            vuetable,
            btn
        },
        mixins: [editComponentMixin],
        data() {
            return {
                holidayList: [],
                holidaysFields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'date', title: this.$t('objects.lookups.calendars.date')},
                    {name: 'repeat', title: this.$t('objects.lookups.calendars.repeat')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
            }
        },

        mounted() {
            this.loadHolidayList();
        },

        methods: {
            async loadHolidayList() {
                if (this.id) {
                    const holidayList = await getHolidayList(this.id);
                    this.holidayList = [...holidayList.items];
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
                    this.holidayList.push({
                        name: 'New Year',
                        date: (new Date('10.10.120').getTime()+'').slice(0, 10),
                        repeat: 1
                    });
                }
            },

            async remove(rowId) {
                const deletedHoliday = this.holidayList.splice(rowId, 1)[0];

                try {
                    await deleteHoliday(this.id, deletedHoliday.id)
                } catch (err) {
                    this.holidayList.splice(rowId, 0, deletedHoliday);
                }
            },

            async sendHolidays() {
                await addHoliday(this.holidayList[0], this.id);
            },
        }
    }
</script>

<style scoped>

</style>