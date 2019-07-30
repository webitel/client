<template>
    <div class="content-wrap">
        <module-header>{{$t('modules.permissions.permissionsTitle')}} |
            Object
        </module-header>

        <section class="module-content">
            <header class="module-content__header">
                <h3 class="module-content__title">All objects</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="head" slot-scope="props">
                    <edit-field
                            class="form__input fs14"
                            :text="test[props.rowData.id].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="ObAC" slot-scope="props">
                    <img
                         class="permissions__object-boolean"
                         src="../../../assets/img/modules/table/circle-true.svg"
                         alt="edit"
                         @click="edit"
                    >
                </template>

                <template slot="RbAC" slot-scope="props">
                    <img
                            class="permissions__object-boolean"
                            src="../../../assets/img/modules/table/circle-false.svg"
                         alt="edit"
                         @click="edit"
                    >
                </template>

                <template slot="image" slot-scope="props">
                    <div class="vuetable-actions vuetable-actions-1">
                        <img class="vuetable-action"
                             src="../../../assets/img/modules/table/edit.svg"
                             alt="edit"
                             @click="edit"
                        >
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

    export default {
        name: "permissions-object",
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: '__slot:head', title: this.$t('modules.permissions.name')},
                    {name: '__slot:ObAC', title: 'Managed by operations'},
                    {name: '__slot:RbAC', title: 'Managed by records'},
                    {name: '__slot:image', title: ''},
                ],
                test: [],
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 10; i++) {
                this.test.push({
                    head: `head${i}`,
                    ObAC: 'true',
                    RbAC: 'false',
                    id: i,
                });
            }
        },
        methods: {
            edit() {
                // this.$router.push({path: '/permissions/new', query: {edit: 'true'}});
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>