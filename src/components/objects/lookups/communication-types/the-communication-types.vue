<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.communications.communications', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.communications.allCommunications')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >
                <template slot="communicationCode" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{filteredDataList[props.rowIndex].code}}
                        </span>
                    </div>
                </template>

                <template slot="communicationName" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].name}}
                    </div>
                </template>

                <template slot="communicationDescription" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {deleteCommunication, getCommunicationsList} from "../../../../api/objects/lookups/communications";

    export default {
        name: "the-communication-types",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'communicationCode', title: this.$t('objects.lookups.communications.code')},
                    {name: 'communicationName', title: this.$t('objects.name')},
                    {name: 'communicationDescription', title: this.$t('objects.description')},
                    _actionsTableField_2,
                ],
            };
        },

        methods: {
            create() {
                this.$router.push('/lookups/communications/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'communications-lookup-edit',
                    params: {id: this.filteredDataList[rowId].id},
                });
            },

            async remove(item) {
                const rowIndex = this.dataList.indexOf(item);
                const deletedItem = this.dataList.splice(rowIndex, 1)[0];
                this.filterData();
                try {
                    await deleteCommunication(deletedItem.id);
                } catch (err) {
                    // if request fails, restore
                    this.dataList.splice(rowIndex, 0, deletedItem);
                    this.filterData();
                }
            },

            async loadDataList() {
                this.dataList = await getCommunicationsList();
                this.filterData();
            }
        }
    }
</script>

<style scoped>

</style>