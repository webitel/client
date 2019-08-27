<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >{{objectTitle}} |
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
                    :data="data"
            >

                <template slot="create" slot-scope="props">
                    <checkbox
                        :value="data[props.rowIndex].create"
                        :label="$t('objects.allow')"
                        @toggleCheckbox="data[props.rowIndex].create = $event"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].read"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="data[props.rowIndex].read = $event"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].edit"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="data[props.rowIndex].edit = $event"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].delete"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="data[props.rowIndex].delete = $event"
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

    import {getObjects} from "../../../../api/objects/permissions/objects";
    import {getObjectPermissions} from "../../../../api/objects/permissions/objects";

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
                    {name: 'grantee.role', title: this.$t('objects.name')},
                    {name: 'create', title: this.$t('objects.create')},
                    {name: 'read', title: this.$t('objects.read')},
                    {name: 'edit', title: this.$t('objects.edit')},
                    {name: 'delete', title: this.$t('objects.delete')},
                ],
                data: [],
                id: this.$route.params.id,
                objectTitle: ''
            };
        },
        mounted() {
            getObjects(this.id)
                .then(
                    (response) => {
                        this.objectTitle = response.class.class;
                    }
                );
            getObjectPermissions(this.id).then(
                    (response) => {
                        this.data = response.list;
                        console.log(this.data);
                        this.data.forEach(item => {
                            item.create = item.privileges.includes('CREATE');
                            item.read = item.privileges.includes('SELECT');
                            item.edit = item.privileges.includes('UPDATE');
                            item.delete = item.privileges.includes('DELETE');
                        });
                        console.log(this.data);
                    },
                    (error) => {
                        this._showError(error);
                    }
                );
        },
        methods: {

            close() {
                this.$router.push('/permissions/objects');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>