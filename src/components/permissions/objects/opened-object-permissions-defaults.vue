<template>
    <section>
        <role-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></role-popup>

        <header ref="rbac" class="content-header">
                <h3 class="content-title">{{$t('objects.permissions.object.defaultList')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                        class="icon-icon_reload icon-action"
                        :title="$t('iconHints.reload')"
                        @click="loadList"
                    ></i>
                     <i
                            class="icon-icon_plus icon-action"
                            :title="$t('iconHints.add')"
                            @click="popupTriggerIf = true"
                    ></i>
                </div>
            </header>
            <vuetable ref="rbac"
                v-show="isLoaded"
                :api-mode="false"
                :fields="rbac.fields"
                :data="defaultList"
            >
                <template slot="grantor" slot-scope="props">
                    <div>
                        {{defaultList[props.rowIndex].grantor.name}}
                    </div>
                </template>

                <template slot="grantee" slot-scope="props">
                    <div>
                        {{defaultList[props.rowIndex].grantee.name}}
                    </div>
                </template>

                <template slot="read" slot-scope="props">
                     <dropdown-select
                        v-model="props.rowData.perm.r"
                        :options="dropdownOptionsList"
                        @input="toggleDefaultMode(
                            {mode: $event, ruleName: 'r', index: props.rowIndex}
                        )"
                    ></dropdown-select>
                </template>

                <template slot="write" slot-scope="props">
                    <dropdown-select
                        v-model="props.rowData.perm.w"
                        :options="dropdownOptionsList"
                        @input="toggleDefaultMode(
                            {mode: $event, ruleName: 'w', index: props.rowIndex}
                        )"
                    ></dropdown-select>
                </template>

                <template slot="delete" slot-scope="props">
                   <dropdown-select
                        v-model="props.rowData.perm.d"
                        :options="dropdownOptionsList"
                        @input="toggleDefaultMode(
                            {mode: $event, ruleName: 'd', index: props.rowIndex}
                        )"
                    ></dropdown-select>
                </template>
            </vuetable>
    </section>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import { getObject } from '../../../api/permissions/objects/objects';
    import rolePopup from './opened-object-permissions-role-defaults-popup';

       export default {
        name: 'opened-object-permissions-defaults',
        mixins: [tableComponentMixin, editComponentMixin],
        components: { rolePopup },
        data() {
            return {
                headerTitle: '', // header title. retieves from object GET request
                // [R]ecord-[b]ased [A]ccess [C]ontrol section (!)
                rbac: {
                    fields: [
                        { name: 'grantor', title: this.$t('objects.permissions.object.grantor') },
                        { name: 'grantee', title: this.$t('objects.permissions.object.grantee') },
                        { name: 'read', title: this.$t('objects.read') },
                        { name: 'write', title: this.$t('objects.edit') },
                        { name: 'delete', title: this.$t('objects.delete') },
                    ],
                },
                dropdownOptionsList: [
                    {
                        name: 'Forbidden',
                        id: 1,
                    },

                    {
                        name: 'Allow',
                        id: 2,
                    },
                    {
                        name: 'Allow with delegation',
                        id: 3,
                    },
                ],
            };
        },

        mounted() {
            this.id = this.$route.params.id;
        },
         computed: {
            ...mapState('permissions/objects', {
                defaultList: (state) => state.itemPermissionsDefaultList,
            }),

            search: {
                    get() {
                         return this.$store.state.permissions.objects.itemSearch;
},
                    set(value) { this.setSearch(value); },
                },
        },

        methods: {
            ...mapActions('permissions/objects', {
                setId: 'SET_ITEM_ID',
                setSize: 'SET_ITEM_PERMISSIONS_SIZE',
                setSearch: 'SET_ITEM_PERMISSIONS_SEARCH',
                nextPage: 'NEXT_ITEM_PERMISSIONS_PAGE',
                prevPage: 'PREV_ITEM_PERMISSIONS_PAGE',

                loadDataList: 'SEARCH_DEFAULT_LIST',
                toggleDefaultMode: 'TOGGLE_DEFAULT_MODE',
            }),

            // get object title to show on page header
            async loadHeaderTitle(id) {
                this.headerTitle = await getObject(id);
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
