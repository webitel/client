<template>
    <section>
        <number-popup
                v-if="popupTriggerIf"
                :value="dataList[editedIndex]"
                @addItem="addItem"
                @close="popupTriggerIf = false"
        ></number-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.lookups.blacklist.number', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <search
                        v-model="search"
                        @filterData="loadDataList"
                ></search>
                <i
                        class="icon-icon_delete icon-action"
                        :class="{'hidden': anySelected}"
                        @click="deleteSelected"
                ></i>
                <i class="icon-action icon-icon_upload"></i>
                <i class="icon-action icon-icon_plus" @click="create"></i>
            </div>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="number" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].number}}
                </div>
            </template>

            <template slot="description" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].description}}
                </div>
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
        <pagination></pagination>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import numberPopup from './opened-blacklist-number-popup';
    import {
        deleteBlacklistCommunication,
        getBlacklistCommunicationList
    } from "../../../../api/objects/lookups/blacklists";

    export default {
        name: "opened-blacklist-numbers",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {
            numberPopup
        },
        data() {
            return {
                editedIndex: null,
                fields: [
                    _checkboxTableField,
                    {name: 'number', title: this.$tc('objects.lookups.blacklist.number', 1)},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_3,
                ],
            }
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowIndex) {
                this.editedIndex = rowIndex;
                this.popupTriggerIf = true;
            },

            addItem(item) {
                item.isSelected = false;
                if(this.editedIndex === null) this.dataList.push(item);
                this.popupTriggerIf = false;
                this.editedIndex = null;
            },

            async deleteItem(item) {
                if(item.id) await deleteBlacklistCommunication(this.id, item.id);
            },

            async loadDataList() {
                if(this.id) {
                    this.dataList = await getBlacklistCommunicationList(this.id, this.size, this.search);
                }
                this.itemInstance.numberList = this.dataList;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>