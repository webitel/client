<template>
    <div class="gateways">
        <object-header
            :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.resGroups.resGroups', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.resGroups.allResGroups')}}
                </h3>

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
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="description" slot-scope="props">
                    <span>
                        {{filteredDataList[props.rowIndex].description}}
                    </span>
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

            <pagination/>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";


    export default {
        name: "the-resource-groups",
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'communication', title: this.$t('objects.description')},
                    _actionsTableField_2,
                ],
            };
        },
        methods: {
            create() {
                this.$router.push('/contact-center/resource-groups/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-resource-group-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },


            async remove(rowId) {
                // remove item
                const deletedItem = this.filteredDataList.splice(rowId, 1)[0];
                this.filterData();

                try {
                    // await deleteGateway(deletedItem.id);
                } catch (err) {
                    // if request fails, restore
                    this.filteredDataList.splice(rowId, 0, deletedItem);
                    this.filterData();
                }
            },

            async loadDataList() {
                // const response = await getGatewayList();

                const response = [];

                for (let i = 0; i < 10; i++) {
                    response.push({
                        isSelected: false,
                        name: 'res group ' + i,
                        communication: 'res group communication ' + i,
                        id: i
                    });
                }

                this.dataList = [...response];
                this.filterData();
            }
        },

    }
</script>