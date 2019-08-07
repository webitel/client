<template>
    <div class="content-wrap">
        <module-header>{{$t('modules.permissions.permissionsTitle')}} |
            {{$t('modules.permissions.object.object')}}
        </module-header>

        <section class="module-content">
            <header class="module-content__header">
                <h3 class="module-content__title">{{$t('modules.permissions.object.allObjects')}}</h3>
            </header>

            <vuetable
                    class="permissions-table permissions-object-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="head" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="ObAC" slot-scope="props">
                    <table-status
                        :value="test[props.rowIndex].ObAC"
                    ></table-status>
                </template>

                <template slot="RbAC" slot-scope="props">
                    <table-status
                            :value="test[props.rowIndex].RbAC"
                    ></table-status>
                </template>

                <template slot="image" slot-scope="props">
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
    import moduleHeader from '../module-header';
    import editField from '../utils/edit-field';
    import tableStatus from '../utils/table-status';

    export default {
        name: "permissions-object",
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            'table-status': tableStatus,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'head', title: this.$t('modules.permissions.name')},
                    {name: 'ObAC', title: this.$t('modules.permissions.object.ObAC')},
                    {name: 'RbAC', title: this.$t('modules.permissions.object.RbAC')},
                    {
                        name: 'image',
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
            for (let i = 0; i < 10; i++) {
                this.test.push({
                    head: `head${i}`,
                    ObAC: true,
                    RbAC: false,
                    id: i,
                });
            }
        },
        methods: {
            edit() {
                this.$router.push('/permissions/object/edit');
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>