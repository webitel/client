<template>
    <section>
        <holiday-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></holiday-popup>

        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.calendars.holidays')}}</h3>
            <i class="icon-action icon-icon_plus" @click="popupTriggerIf = true"></i>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >

            <template slot="date" slot-scope="props">
                <span>{{new Date(+dataList[props.rowIndex].date).toLocaleDateString()}}</span>
            </template>

            <template slot="repeat" slot-scope="props">
                <switcher
                    :value="dataList[props.rowIndex].repeat"
                    @input="toggleItemProperty(props.rowIndex)"
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
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-calendar-holidays",
        mixins: [tableComponentMixin, openedTabComponentMixin],
        components: {holidayPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'date', title: this.$t('objects.lookups.calendars.date')},
                    {name: 'repeat', title: this.$t('objects.lookups.calendars.repeat')},
                    _actionsTableField_2,
                ],
            }
        },

        computed: {
            ...mapState('lookups/calendars/holidays', {
                dataList: state => state.dataList,
            }),
        },

        methods: {
            async create() {
                this.popupTriggerIf = true;
            },

            closePopup() {
                this.setId(null);
                this.popupTriggerIf = false;
            },

            edit(rowIndex) {
                this.setId(rowIndex);
                this.popupTriggerIf = true;
            },

            ...mapActions('lookups/calendars/holidays', {
                setId: 'SET_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                toggleItemProperty: 'TOGGLE_ITEM_PROPERTY',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style scoped>

</style>