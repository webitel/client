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
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{dataList[props.rowIndex].role}}
                        </span>
                    </div>
                </template>

                <template slot="description" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].description}}
                    </div>
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

    import {deleteRole, getRoles} from '@/api/objects/permissions/roles';


    export default {
        name: 'the-roles',
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                dataList: [],
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
            };
        },
        mounted() {
            this.loadDataList();
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

            async remove(rowId) {
                // remove role
                const deletedObject = this.dataList.splice(rowId, 1)[0];
                try {
                    await deleteRole(deletedObject.id);
                } catch (err) {
                    // if request fails, restore
                    this.dataList.splice(rowId, 0, deletedObject);
                }
            },

            async loadDataList() {
                const response = await getRoles();
                this.dataList = [...response].reverse();
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
