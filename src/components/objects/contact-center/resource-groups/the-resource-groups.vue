<template>
    <div class="gateways">
        <object-header>
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.resGroups.resGroups', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.resGroups.allResGroups')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.ccenter.resGroups.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                    </div>
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
                    <div class="vuetable-actions__wrap">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="remove(props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';


    export default {
        name: "the-resource-groups",
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                dataList: [], // list of all objects to show
                filteredDataList: [],

                // vuetable prop
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'description', title: this.$t('objects.description')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
                search: '',
            };
        },
        mounted() {
            this.loadDataList();
        },
        methods: {
            filterData() {
                this.filteredDataList = this.dataList.filter(dataItem => {
                    return dataItem.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
                });
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-resource-group-edit',
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
                // const response = await getGatewayList();

                const response = [];

                for (let i = 0; i < 10; i++) {
                    response.push({
                        name: 'res group ' + i,
                        description: 'res group descr ' + i,
                        id: i
                    });
                }

                this.dataList = [...response];
                this.filterData();
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>