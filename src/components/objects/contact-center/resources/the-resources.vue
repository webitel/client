<template>
    <div class="gateways">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.res.res', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.res.allRes')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.ccenter.res.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                    </div>
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

                <template slot="gateway" slot-scope="props">
                    <span>
                        {{filteredDataList[props.rowIndex].gateway.name}}
                    </span>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            :value="filteredDataList[props.rowIndex].enabled"
                            @input="filteredDataList[props.rowIndex].enabled = $event"
                    >
                    </switcher>
                </template>

                <template slot="reserve" slot-scope="props">
                    <switcher
                            :value="filteredDataList[props.rowIndex].reserve"
                            @input="filteredDataList[props.rowIndex].reserve = $event"
                    >
                    </switcher>
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
    import {getResourceList} from '@/api/objects/contact-center/resources';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";


    export default {
        name: "the-resources",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'gateway', title: this.$tc('objects.routing.gateways.gateways', 1)},
                    {name: 'enabled', title: this.$t('objects.enabled')},
                    {name: 'reserve', title: this.$t('objects.ccenter.res.reserve')},
                    _actionsTableField_2,
                ],
                filterProperties: ['name'],
            };
        },

        methods: {
            create() {
                this.$router.push('/contact-center/resource/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-resource-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async remove(rowId) {
                // remove item
                const deletedItem = this.dataList.splice(rowId, 1)[0];
                this.filterData();

                try {
                    // await deleteGateway(deletedItem.id);
                } catch (err) {
                    // if request fails, restore
                    this.dataList.splice(rowId, 0, deletedItem);
                    this.filterData();
                }
            },

            async loadDataList() {
                const response = await getResourceList(this.rowsPerPage);
                this.dataList = [...response];
                this.filterData();
            }
        },

    }
</script>