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
                           class="form__input fs14"
                           v-bind:text="test[props.rowData.id].head"
                           :placeholder="$t('auth.passwordPlaceholder')"
                           @text-updated-blur="inlineEdit($event, props.rowData.id, 'head')"
                           @text-updated-enter="inlineEdit($event, props.rowData.id, 'head')"
                   ></edit-field>
               </template>

               <template slot="body" slot-scope="props">
                   <edit-field
                           class="form__input fs14"
                           v-bind:text="test[props.rowData.id].body"
                           :placeholder="$t('auth.passwordPlaceholder')"
                           @text-updated-blur="inlineEdit($event, props.rowData.id, 'body')"
                           @text-updated-enter="inlineEdit($event, props.rowData.id, 'body')"
                   ></edit-field>
               </template>

               <template slot="image" slot-scope="props">
                   <div class="vuetable-actions vuetable-actions-2">
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
                    this.$router.push({path: 'permissions/new', query: {edit: 'true'}});
                }
            },
            inlineEdit(newValue, id, property) {
                this.test[id][property] = newValue;
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
