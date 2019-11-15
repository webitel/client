<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.holidays')}}</h3>
            <i class="icon-action icon-icon_plus" @click="popupTriggerIf = true"></i>
        </header>
        <holiday-popup
                v-if="popupTriggerIf"
                :value="itemInstance.holidays[editedIndex]"
                :v="v"
                @addItem="addHoliday"
                @close="popupTriggerIf = false"
        ></holiday-popup>
        <vuetable
                :api-mode="false"
                :fields="holidaysFields"
                :data="itemInstance.holidays"
        >

            <template slot="date" slot-scope="props">
                <span>{{new Date(+itemInstance.holidays[props.rowIndex].date).toLocaleDateString()}}</span>
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
    import holidayPopup from './opened-calendar-holiday-popup';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {deleteHoliday} from "@/api/objects/lookups/calendars";
    import {_actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-calendar-holidays",
        components: {
            holidayPopup,
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
                popupTriggerIf: false,
                editedIndex: null,
            }
        },

        methods: {
            edit(rowIndex) {
                this.editedIndex = rowIndex;
                this.popupTriggerIf = true;
            },

            remove(rowIndex) {
                const deletedItem = this.itemInstance.holidays.splice(rowIndex, 1)[0];
                if(deletedItem.id) {
                    try {
                        deleteHoliday(this.id, deletedItem.id);
                    } catch {
                        this.itemInstance.holidays.splice(rowIndex, 0, deletedItem);
                    }
                }
            },

            addHoliday(item) {
                if(this.editedIndex === null) this.itemInstance.holidays.push(item);
                this.popupTriggerIf = false;
                this.editedIndex = null;
            },
        }
    }
</script>

<style scoped>

</style>