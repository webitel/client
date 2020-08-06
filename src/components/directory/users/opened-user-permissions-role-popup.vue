<template>
    <popup
            :title="$t('objects.permissions.object.newPermissionRole')"
            :primaryText="$t('objects.add')"
            :primaryAction="save"
            @close="$emit('close')"
            overflow
    >
        <section>
            <dropdown-select
                v-model="newGrantee"
                :options="computeAvailableGrantees"
                :placeholder="$tc('objects.permissions.permissionsRole', 1)"
                @search="loadDropdownOptionsList"
            ></dropdown-select>
        </section>
    </popup>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import popup from '../../utils/popup.vue';
    import dropdownSelect from '../../utils/dropdown-select.vue';
    import { getRoleList } from '../../../api/permissions/roles/roles';

    export default {
        name: 'opened-user-permissions-role-popup',
        components: { popup, dropdownSelect },
        data() {
            return {
                newGrantee: '',
                dropdownOptionsList: [],
            };
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('directory/users/permissions', {
                dataList: (state) => state.dataList,
            }),

            computeAvailableGrantees() {
                return this.dropdownOptionsList.filter((grantee) => !this.dataList.some((usedGrantee) => grantee.id === usedGrantee.grantee.id));
            },
        },

        methods: {
            async save() {
                try {
                    await this.addRole(this.newGrantee);
                    this.$emit('close');
                } catch {}
            },

            async loadDropdownOptionsList(search) {
                const response = await getRoleList(1, 10, search);
                this.dropdownOptionsList = [...response.list];
            },

            ...mapActions('directory/users/permissions', {
                addRole: 'ADD_ITEM_ROLE',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
