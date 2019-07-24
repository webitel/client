<template>
    <div class="module-wrap">
        <app-nav></app-nav>
        <main class="module permissions">
            <app-header></app-header>
            <module-header :primaryAction="create">{{$t('modules.permissions.permissionsTitle')}} |
                {{$tc('modules.permissions.permissionsRole', 2)}}</module-header>
            <section class="module-content">
                <h3 class="module-content__header">{{$t('modules.permissions.allRoles')}}</h3>

                <vuetable
                        :api-mode="false"
                        :fields="fields"
                        :data="test"
                >
                    <template slot="image" slot-scope="props">
                        <img class="vuetable-action"
                             src="../../../assets/img/modules/table/edit.svg"
                             alt="edit"
                             @click="action('edit')"
                        >
                        <img class="vuetable-action"
                             src="../../../assets/img/modules/table/delete.svg"
                             alt="delete"
                             @click="action('delete')"
                        >
                    </template>
                </vuetable>
            </section>
        </main>
    </div>
</template>

<script>
    import theHeader from '../../the-header';
    import theNavbar from '../../the-navbar';
    import moduleHeader from '../module-header';
    import divider from '../../utils/divider';
    import vuetable from 'vuetable-2/src/components/Vuetable';

    export default {
        name: "the-permissions",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            'module-header': moduleHeader,
            divider,
            vuetable
        },
        data() {
            return {
                //vuetable prop
                fields: [
                    {name: 'head', title: this.$t('modules.permissions.name')},
                    {name: 'body', title: this.$t('modules.description')},
                    {name: '__slot:image', title: this.$t('modules.action')},
                ],
                test: []
            }
        },
        mounted() {

            //FIXME: delete test data
            let start = Date.now();
            let data = {
                head: 'head',
                body: 'body'
            };
            for (let i = 0; i < 100; i++) {
                this.test.push(data);
            }
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
                let end = Date.now();
                console.log(end - start);
            })
        },
        methods: {
            create() {
                this.$router.push('/permissions/new');
            },
            action(action) {
                if(action === 'edit') {
                    this.$router.push({path: 'permissions/new', query: {edit: 'true'}});
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../assets/css/modules/modules';
</style>