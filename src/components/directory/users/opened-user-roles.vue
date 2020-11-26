<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.permissions.permissionsRole')}}</h3>
        </header>
        <form class="object-input-grid">
            <div>
                <wt-select
                    v-model="roles"
                    :close-on-select="false"
                    :label="$tc('objects.permissions.permissionsRole')"
                    :search="loadDropdownOptionsList"
                    :internal-search="false"
                    multiple
                ></wt-select>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getRoleList } from '../../../api/permissions/roles/roles';

    export default {
        name: 'opened-user-roles',
        mixins: [openedTabComponentMixin],

        computed: {
            roles: {
                get() {
                    return this.$store.state.directory.users.itemInstance.roles;
                },
                set(value) {
                    this.setItemProp({ prop: 'roles', value });
                },
            },           
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getRoleList(0, 10, search);
                if(response.list) {
                return response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
                }
                return [];
            },

            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>
