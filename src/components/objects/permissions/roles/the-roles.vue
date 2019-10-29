<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.permissions.permissions')}} |
            {{$tc('objects.permissions.permissionsRole', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.permissions.allRoles')}}</h3>
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
                        {{filteredDataList[props.rowIndex].role}}
                        </span>
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
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';

    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {deleteRole, getRoleList} from '@/api/objects/permissions/roles';

    export default {
        name: 'the-roles',
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_2,
                ],
                filterProperties: ['role'],
            };
        },

        methods: {
            create() {
                this.$router.push('/permissions/roles/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'permissions-roles-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async deleteItem(item) {
                await deleteRole(item.id);
            },

            async loadDataList() {
                const response = await getRoleList();
                this.dataList = [...response].reverse();
                this.filterData();
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
