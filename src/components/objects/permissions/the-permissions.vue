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
                <h3 class="content-title">{{$t('objects.all') +
                    $tc('objects.permissions.permissionsRole', 2)}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="head" slot-scope="props">
                    <edit-field
                            :text="test[props.rowIndex].head"
                            :placeholder="$t('objects.password')"
                            :disabled="computeEditInstance(props.rowIndex, 'head')"
                            @start-update="startUpdate({id: props.rowIndex,name: 'head'})"
                            @text-updated="inlineEdit($event, props.rowIndex, 'head')"
                    ></edit-field>
                </template>

                <template slot="body" slot-scope="props">
                    <edit-field
                            :text="test[props.rowIndex].body"
                            :placeholder="$t('objects.password')"
                            :disabled="computeEditInstance(props.rowIndex, 'body')"
                            @start-update="startUpdate({id: props.rowIndex,name: 'body'})"
                            @text-updated="inlineEdit($event, props.rowIndex, 'body')"
                    ></edit-field>
                </template>

                <template slot="actions" slot-scope="props">
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
    import objectHeader from '../object-header';
    import editField from '../../utils/edit-field';

    import {getRoles} from '../../../api/objects/permissions/permissions';


    export default {
        name: 'the-permissions',
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            vuetable,
        },
        data() {
            return {
                test: [],
                editInstance: null, // only 1 field can be edited at a time
                // vuetable prop
                fields: [
                    {name: 'head', title: this.$t('objects.name')},
                    {name: 'body', title: this.$t('objects.description')},
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
            // FIXME: delete test data
            for (let i = 0; i < 10; i++) {
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
                        this.test.length = response.length;
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
