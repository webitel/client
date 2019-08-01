<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('modules.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >{{$t('modules.users')}} |
            {{$t('modules.edit')}}
        </module-header>

        <section class="module-content">
            <header class="module-content__header">
                <h3 class="module-content__title">{{$t('modules.permissions.allRoles')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="head" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowData.id].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                        :value="test[props.rowData.id].create"
                        :label="checkboxLabels"
                        @changeCheckbox="changeCheckbox($event, props.rowData.id, 'create')"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            :value="test[props.rowData.id].read"
                            :label="checkboxLabels"
                            @changeCheckbox="changeCheckbox($event, props.rowData.id, 'read')"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            :value="test[props.rowData.id].edit"
                            :label="checkboxLabels"
                            @changeCheckbox="changeCheckbox($event, props.rowData.id, 'edit')"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            :value="test[props.rowData.id].delete"
                            :label="checkboxLabels"
                            @changeCheckbox="changeCheckbox($event, props.rowData.id, 'delete')"
                    ></checkbox>
                </template>
            </vuetable>
        </section>
    </div>
</template>


<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import moduleHeader from '../module-header';
    import editField from '../utils/edit-field';
    import tableCheckbox from '../utils/table-checkbox';

    export default {
        name: "permissions-object",
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            checkbox: tableCheckbox,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: '__slot:head', title: this.$t('modules.permissions.name')},
                    {name: '__slot:create', title: this.$t('modules.create')},
                    {name: '__slot:read', title: this.$t('modules.read')},
                    {name: '__slot:edit', title: this.$t('modules.edit')},
                    {name: '__slot:delete', title: this.$t('modules.delete')},
                ],
                test: [],
                checkboxLabels: {
                    true: this.$t('modules.allow'),
                    false: '- -'
                }
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 10; i++) {
                this.test.push({
                    head: `Devices ${i}`,
                    create: true,
                    read: false,
                    edit: true,
                    delete: false,
                    id: i,
                });
            }
        },
        methods: {
            changeCheckbox(newValue, id, property) {
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