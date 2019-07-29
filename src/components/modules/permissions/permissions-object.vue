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
                            v-bind:text="test[props.rowData.id].head"
                            placeholder="$t('auth.passwordPlaceholder')"
                            @text-updated-blur="inlineEdit($event, props.rowData.id, 'head')"
                            @text-updated-enter="inlineEdit($event, props.rowData.id, 'head')"
                    ></edit-field>
                </template>

                <template slot="ObAC" slot-scope="props">
                    <edit-field
                            class="form__input fs14"
                            v-bind:text="test[props.rowData.id].ObAC"
                            @text-updated-blur="inlineEdit($event, props.rowData.id, 'body')"
                            @text-updated-enter="inlineEdit($event, props.rowData.id, 'body')"
                    ></edit-field>
                </template>

                <template slot="RbAC" slot-scope="props">
                    <edit-field
                            class="form__input fs14"
                            v-bind:text="test[props.rowData.id].RbAC"
                            @text-updated-blur="inlineEdit($event, props.rowData.id, 'body')"
                            @text-updated-enter="inlineEdit($event, props.rowData.id, 'body')"
                    ></edit-field>
                </template>

                <template slot="image" slot-scope="props">
                    <img class="vuetable-action"
                         src="../../../assets/img/modules/table/edit.svg"
                         alt="edit"
                         @click="edit"
                    >
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import moduleWrap from '../module-wrap';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import moduleHeader from '../module-header';
    import editField from '../utils/edit-field';

    export default {
        name: "permissions-object",
        components: {
            'module-wrap': moduleWrap,
            'module-header': moduleHeader,
            'edit-field': editField,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: '__slot:head', title: this.$t('modules.permissions.name')},
                    {name: '__slot:ObAC', title: this.$t('modules.description')},
                    {name: '__slot:RbAC', title: this.$t('modules.description')},
                    {name: '__slot:image', title: this.$t('modules.action')},
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

<style scoped>

</style>