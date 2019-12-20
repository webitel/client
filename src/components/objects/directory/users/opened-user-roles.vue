<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.permissions.permissionsRole')}}</h3>
        </header>
        <form class="object-input-grid">
            <div>
                <tags-input
                    v-model="roles"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.permissions.permissionsRole')"
                    @searchOptions="searchList"
                ></tags-input>

                <tags-input
                    v-model="roleAdmin"
                    :options="roles"
                    :label="$t('objects.directory.users.roleAdmin')"
                ></tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getRoleList} from "../../../../api/objects/permissions/roles";
    import {mapActions} from "vuex";

    export default {
        name: "opened-user-roles",
        mixins: [openedTabComponentMixin],

        computed: {
            roles: {
                get() {
                    return this.$store.state.directory.users.itemInstance.roles
                },
                set(value) {
                    this.setItemProp({prop: 'roles', value})
                }
            },
            roleAdmin: {
                get() {
                    return this.$store.state.directory.users.itemInstance.roleAdmin
                },
                set(value) {
                    this.setItemProp({prop: 'roleAdmin', value})
                }
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getRoleList(10, search);
                this.dropdownOptionsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>