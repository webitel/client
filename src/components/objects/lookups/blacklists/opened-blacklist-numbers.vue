<template>
    <section>
        <number-popup
                v-if="popupTriggerIf"
                :value="dataList[editedIndex]"
                @addItem="addItem"
                @close="popupTriggerIf = false"
        ></number-popup>

        <header class="content-header">
            <h3 class="content-title">{{$t('objects.lookups.blacklist.allBlacklists')}}</h3>
            <div class="content-header__actions-wrap">
                <search
                        @filterData="filterData"
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
                :data="filteredDataList"
        >
            <template slot="number" slot-scope="props">
                <div>
                    {{filteredDataList[props.rowIndex].number}}
                </div>
            </template>

            <template slot="description" slot-scope="props">
                <div>
                    {{filteredDataList[props.rowIndex].description}}
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

    export default {
        name: "opened-blacklist-numbers",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {
            numberPopup
        },
        data() {
            return {
                filterProperties: ['number'],
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
                console.log(this.dataList[this.editedIndex])
                this.popupTriggerIf = true;
            },

            addItem(item) {
                item.isSelected = false;
                if(this.editedIndex === null) this.dataList.push(item);
                this.popupTriggerIf = false;
                this.editedIndex = null;
                this.filterData();
            },

            async deleteItem(delItem) {
                const index = this.dataList.findIndex(item => item === delItem);
                this.dataList.splice(index, 1);
                // await deleteCommunication(item.id);
            },

            async loadDataList() {
                // this.dataList = await getCommunicationsList();
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        number: (Math.random() + i) * 8 * 10 ** 7 + '',
                        description: 'Math.random() * 100',
                        isSelected: false,
                    });
                }
                this.filterData();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>