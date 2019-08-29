<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.permissions.permissions')}} |
            {{$tc('objects.permissions.permissionsRole', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.permissions.allRoles')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="roleList"
            >
                <template slot="roleName" slot-scope="props">
                    <div>
                        {{roleList[props.rowIndex].role}}
                    </div>
                </template>

                <template slot="roleDescription" slot-scope="props">
                    <div>
                        {{roleList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="action('edit', props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="action('delete', props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '../../object-header';

    import {getRoles} from '../../../../api/objects/permissions/roles';


    export default {
        name: 'the-permissions',
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                roleList: [],
                // vuetable prop
                fields: [
                    {name: 'roleName', title: this.$t('objects.name')},
                    {name: 'roleDescription', title: this.$t('objects.description')},
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
            getRoles()
                .then((response) => {
                    this.roleList = [...response.results];
                });
        },
        methods: {
            create() {
                this.$router.push('/permissions/roles/new');
            },
            action(action, rowId) {
                if (action === 'edit') {
                    this.$router.push({
                        name: 'permissions-roles-edit',
                        params: {id: this.roleList[rowId].id},
                    });
                }
            },
        }
    };
</script>

<style lang="scss" scoped>

</style>
