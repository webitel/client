<template>
    <popup
            :title="$t('objects.permissions.object.newPermissionRole')"
            :primaryText="$t('objects.add')"
            :primaryAction="save"
            @close="$emit('close')"
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
    import popup from '../../utils/popup';
    import dropdownSelect from '../../utils/dropdown-select';
    import {getRoleList} from "../../../api/permissions/roles";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-object-permissions-role-popup",
        components: {popup, dropdownSelect},
        data() {
            return {
                newGrantee: '',
                optionsList: [], // list of all roles to add new. retrieves from roles GET request
            }
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('permissions/objects', {
                dataList: state => state.itemPermissionsDataList,
            }),

            computeAvailableGrantees() {
                // filter available grantees:
                return this.dropdownOptionsList.filter(grantee => {
                    return !this.dataList.some(usedGrantee => {
                        return grantee.id === usedGrantee.grantee.id;
                    });
                });
            }
        },

        methods: {
            async save() {
                try {
                    await this.patchItem(this.newGrantee);
                    this.$emit('close');
                } catch {}
            },

            // get all roles to choose which to add
            async loadDropdownOptionsList(search) {
                const response = await getRoleList(null, search);
                this.dropdownOptionsList = [...response];
            },

            ...mapActions('permissions/objects', {
                patchItem: 'ADD_ITEM_ROLE',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>