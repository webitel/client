<template>
    <div class="content-wrap">
        <object-header>{{$t('objects.permissions.permissions')}} |
            {{$tc('objects.permissions.object.object', 1)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">
                    {{$t('objects.permissions.object.allObjects')}}
                </h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="ObAC" slot-scope="props">
                    <status
                            :class="{'status__true': test[props.rowIndex].ObAC}"
                            :text="computeStatusText(test[props.rowIndex].ObAC)"
                    ></status>
                </template>

                <template slot="RbAC" slot-scope="props">
                    <status
                            :class="{'status__true': test[props.rowIndex].RbAC}"
                            :text="computeStatusText(test[props.rowIndex].RbAC)"
                    ></status>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit"
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
    import status from '../../../utils/status';

    export default {
        name: "permissions-object",
        components: {
            'object-header': objectHeader,
            status,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'head', title: this.$t('objects.name')},
                    {name: 'ObAC', title: this.$t('objects.permissions.object.ObAC')},
                    {name: 'RbAC', title: this.$t('objects.permissions.object.RbAC')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '60px'
                    },
                ],
                test: [],
            };
        },
        mounted() {
            // FIXME: delete test data
            this.test.push({
                head: 'Devices',
                ObAC: true,
                RbAC: false,
                id: 0,
            });
            this.test.push({
                head: 'Users',
                ObAC: true,
                RbAC: false,
                id: 1,
            });
            this.test.push({
                head: 'Roles',
                ObAC: true,
                RbAC: false,
                id: 2,
            });
        },
        methods: {
            edit() {
                this.$router.push('/permissions/object/edit');
            },
            computeStatusText(state) {
                return state ? this.$t('objects.on') : this.$t('objects.off');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>