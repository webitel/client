<template>
    <section class="object-content">

        <role-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></role-popup>

        <header class="content-header">
            <h3 class="content-title">{{$t('objects.permissions.object.operations')}}</h3>
            <div class="content-header__actions-wrap">
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

        <wt-loader v-show="!isLoaded"></wt-loader>

        <wt-table
                v-show="isLoaded"
                :headers="fields"
                :data="dataList"
                :grid-actions="false"
        >

            <template slot="grantee" slot-scope="{item}">
                <div>
                    {{item.grantee.name}}
                </div>
            </template>

            <template slot="read" slot-scope="{item}">
                <checkbox
                        :value="item.access.r"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'r', index: item})"
                ></checkbox>
            </template>

            <template slot="edit" slot-scope="{item}">
                <checkbox
                        :value="item.access.w"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'w', index: item})"
                ></checkbox>
            </template>

            <template slot="delete" slot-scope="{ item }">
                <checkbox
                        :value="item.access.d"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'd', index: item})"
                ></checkbox>
            </template>
        </wt-table>
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
    import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import rolePopup from './opened-queue-permissions-role-popup';

    export default {
        name: 'opened-queue-permissions',
        mixins: [tableComponentMixin, editComponentMixin],
        components: { rolePopup },
        data() {
            return {
                // vuetable prop
                fields: [
                    { value: 'grantee', text: this.$t('objects.name') },
                    { value: 'read', text: this.$t('objects.read') },
                    { value: 'edit', text: this.$t('objects.edit') },
                    { value: 'delete', text: this.$t('objects.delete') },
                ],
            };
        },

        watch: {
            parentId(value) {
                this.setParentId(value);
            },
        },

        computed: {
            ...mapState('ccenter/queues', {
                parentId: (state) => state.itemId,
            }),
            ...mapState('ccenter/queues/permissions', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.ccenter.queues.permissions.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.ccenter.queues.permissions.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {
            ...mapActions('ccenter/queues/permissions', {
                setParentId: 'SET_PARENT_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                patchItem: 'PATCH_ITEM_PERMISSIONS',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
