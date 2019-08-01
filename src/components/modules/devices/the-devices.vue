<template>
    <div class="content-wrap">

        <module-header
                :primaryAction="create"
        >
            Devices
        </module-header>

        <section class="module-content">
            <header class="module-content__header">
                <h3 class="module-content__title">All devices</h3>
            </header>

            <vuetable
                    class="devices-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="checkbox" slot-scope="props">
                    <checkbox
                            :value="test[props.rowData.id].isSelected"
                            @changeCheckbox="toggleCheckbox($event, props.rowData.id)"
                    >
                    </checkbox>
                </template>

                <template slot="name" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowData.id].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="authId" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowData.id].authId"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="user" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowData.id].user"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="presence" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowData.id].presence"
                            :disabled="true"
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
    import checkbox from '../utils/table-checkbox';


    export default {
        name: 'the-devices',
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            vuetable,
            checkbox
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    // TODO: UNITED 'NAME' TRANSLATION
                    {
                        name: '__slot:checkbox',
                        title: '',
                        titleClass: 'vuetable-td-checkbox',
                        dataClass: 'vuetable-td-checkbox',
                    },
                    {name: '__slot:name', title: this.$t('modules.permissions.name')},
                    {name: '__slot:authId', title: 'Auth ID'},
                    {name: '__slot:user', title: 'User'},
                    {name: '__slot:presence', title: 'Presence'},
                    {
                        name: '__slot:image',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                    },
                ],
                test: [],
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 20; i++) {
                this.test.push({
                    isSelected: false,
                    head: `head${i}`,
                    authId: (i*Math.round(Math.random()*10))+'',
                    user: 'user '+Math.round(Math.random()*10),
                    presence: 'true',
                    id: i,
                });
            }
        },
        methods: {
            create() {
                // this.$router.push('/permissions/new');
            },
            action(action) {
                if (action === 'edit') {
                    // this.$router.push({path: '/permissions/new', query: {edit: 'true'}});
                }
            },
            toggleCheckbox(newValue, id) {
                this.test[id].isSelected = newValue;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
