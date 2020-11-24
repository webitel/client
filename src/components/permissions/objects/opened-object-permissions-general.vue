<template>
    <section>
        <role-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></role-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.permissions.object.operations', 2)}}</h3>
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

        <loader v-show="!isLoaded"></loader>

       <vuetable
                ref="obac"
                v-show="isLoaded"
                :api-mode="false"
                :fields="fields"
                :data="dataList"
            >

                <template slot="grantee" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].grantee.name}}
                    </div>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__c"
                            :value="dataList[props.rowIndex].access.x"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'x', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__r"
                            :value="dataList[props.rowIndex].access.r"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'r', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__u"
                            :value="dataList[props.rowIndex].access.w"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'w', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__d"
                            :value="dataList[props.rowIndex].access.d"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'd', index: props.rowIndex})"
                    ></checkbox>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
    </section>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    // eslint-disable-next-line import/extensions
    import rolePopup from './opened-object-permissions-role-popup';

       export default {
        name: 'opened-object-permissions-general',
        mixins: [tableComponentMixin, editComponentMixin],
        components: { rolePopup },
        data() {
            return {
                // vuetable prop
                fields: [
                    { name: 'grantee', title: this.$t('objects.permissions.object.grantee') },
                    { name: 'create', title: this.$t('objects.create') },
                    { name: 'read', title: this.$t('objects.read') },
                    { name: 'edit', title: this.$t('objects.edit') },
                    { name: 'delete', title: this.$t('objects.delete') },
                ],
                headerTitle: '',
            };
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadList();
        },
         computed: {
            ...mapState('permissions/objects', {
                dataList: (state) => state.itemPermissionsDataList,
                page: (state) => state.itemPage,
                isNextPage: (state) => state.isItemNextPage,
            }),

            id: {
                get() {
                    return this.$store.state.permissions.objects.itemId;
                },
                set(value) {
                    this.setId(value);
                },
            },

            size: {
                get() { return this.$store.state.permissions.objects.itemSize; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.permissions.objects.itemSearch; },
                set(value) { this.setSearch(value); },
            },
        },

        methods: {
            ...mapActions('permissions/objects', {
                setId: 'SET_ITEM_ID',
                setItemProp: 'SET_ITEM_PROPERTY',
                loadDataList: 'LOAD_ITEM_PERMISSIONS_DATA_lIST',
                patchItem: 'PATCH_ITEM_PERMISSIONS',
                setSize: 'SET_ITEM_PERMISSIONS_SIZE',
                setSearch: 'SET_ITEM_PERMISSIONS_SEARCH',
                nextPage: 'NEXT_ITEM_PERMISSIONS_PAGE',
                prevPage: 'PREV_ITEM_PERMISSIONS_PAGE',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
