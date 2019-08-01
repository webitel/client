<template>
    <div class="content-wrap">

        <module-header
                :primaryAction="create"
        >
            {{$t('modules.permissions.permissionsTitle')}} |
            {{$tc('modules.permissions.permissionsRole', 2)}}
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
                            v-bind:text="test[props.rowIndex].head"
                            :placeholder="$t('auth.passwordPlaceholder')"
                            :disabled="computeEditInstance(props.rowIndex, 'head')"
                            @start-update="startUpdate({id: props.rowIndex,name: 'head'})"
                            @text-updated="inlineEdit($event, props.rowIndex, 'head')"
                    ></edit-field>
                </template>

                <template slot="body" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].body"
                            :placeholder="$t('auth.passwordPlaceholder')"
                            :disabled="computeEditInstance(props.rowIndex, 'body')"
                            @start-update="startUpdate({id: props.rowIndex,name: 'body'})"
                            @text-updated="inlineEdit($event, props.rowIndex, 'body')"
                    ></edit-field>
                </template>

                <template slot="image" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                             @click="action('edit')"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                             @click="action('delete')"
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

    import {getRoles} from '../../../api/modules/permissions/permissions';


    export default {
        name: 'the-permissions',
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
                    {name: '__slot:body', title: this.$t('modules.description')},
                    {
                        name: '__slot:image',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                    },
                ],
                test: [],
                editInstance: null
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 20; i++) {
                this.test.push({
                    head: `head${i}`,
                    body: 'body',
                    id: i,
                });
            }

            getRoles()
                .then((response) => {
                        response.forEach((item, index) => {
                            this.test[index].head = item.role;
                        });
                        // this.test.length = response.length;
                    },
                    (error) => {
                        this.$log.info('error roles', error);
                        this.showError(error);
                    });
        },
        methods: {
            create() {
                this.$router.push('/permissions/new');
            },
            action(action) {
                if (action === 'edit') {
                    this.$router.push({path: '/permissions/new', query: {edit: 'true'}});
                }
            },
            inlineEdit(newValue, id, property) {
                this.test[id][property] = newValue;
                this.editInstance = null;
            },

            // Edit Instance -- only 1 instance of editable field which we can edit at one time
            startUpdate(editInstance) {
                this.editInstance = editInstance;
            },
            computeEditInstance(id, name) {
                if(this.editInstance) {
                    return !(id === this.editInstance.id && name === this.editInstance.name);
                }
                return false;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
