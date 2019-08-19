<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >{{$t('objects.users')}} |
            {{$t('objects.edit')}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.permissions.object.operations')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="create" slot-scope="props">
                    <checkbox
                        :value="test[props.rowIndex].create"
                        :label="$t('objects.allow')"
                        @toggleCheckbox="selectRow($event, props.rowIndex, 'create')"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            :value="test[props.rowIndex].read"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="selectRow($event, props.rowIndex, 'read')"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            :value="test[props.rowIndex].edit"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="selectRow($event, props.rowIndex, 'edit')"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            :value="test[props.rowIndex].delete"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="selectRow($event, props.rowIndex, 'delete')"
                    ></checkbox>
                </template>
            </vuetable>
        </section>
    </div>
</template>


<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '../../object-header';
    import tableCheckbox from '../../../utils/checkbox';

    export default {
        name: "permissions-object",
        components: {
            'object-header': objectHeader,
            checkbox: tableCheckbox,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'create', title: this.$t('objects.create')},
                    {name: 'read', title: this.$t('objects.read')},
                    {name: 'edit', title: this.$t('objects.edit')},
                    {name: 'delete', title: this.$t('objects.delete')},
                ],
                test: [],

            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 10; i++) {
                this.test.push({
                    name: `Devices ${i}`,
                    create: true,
                    read: false,
                    edit: true,
                    delete: false,
                    id: i,
                });
            }
        },
        methods: {
            selectRow(newValue, id, property) {
                this.test[id][property] = newValue;
            },
            close() {
                this.$router.push('/permissions/object');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>