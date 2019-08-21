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
                <h3 class="content-title">{{$t('objects.permissions.allRoles')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

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
    import objectHeader from '../../object-header';

    import {getRoles} from '../../../../api/objects/permissions/permissions';


    export default {
        name: 'the-permissions',
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                test: [],
                editInstance: null, // only 1 field can be edited at a time
                // vuetable prop
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
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
            for (let i = 0; i < 40; i++) {
                this.test.push({
                    name: `head${i}`,
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
        }
    };
</script>

<style lang="scss" scoped>

</style>
