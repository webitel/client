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
                        @click="loadDataList"
                ></i>
                <i
                        class="icon-icon_plus icon-action"
                        :title="$t('iconHints.add')"
                        @click="popupTriggerIf = true"
                ></i>
            </div>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >

            <template slot="grantee" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].grantee.name}}
                </div>
            </template>

            <template slot="read" slot-scope="props">
                <checkbox
                        :value="dataList[props.rowIndex].access.r"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'r', index: props.rowIndex})"
                ></checkbox>
            </template>

            <template slot="edit" slot-scope="props">
                <checkbox
                        :value="dataList[props.rowIndex].access.u"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'u', index: props.rowIndex})"
                ></checkbox>
            </template>

            <template slot="delete" slot-scope="props">
                <checkbox
                        :value="dataList[props.rowIndex].access.d"
                        :label="$t('objects.allow')"
                        @input="patchItem({prop: 'd', index: props.rowIndex})"
                ></checkbox>
            </template>
        </vuetable>
        <pagination
                v-model="size"
                @loadDataList="loadDataList"
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
    import rolePopup from './opened-calendar-permissions-role-popup';

    export default {
        name: 'opened-calendar-permissions',
        mixins: [tableComponentMixin, editComponentMixin],
        components: { rolePopup },
        data() {
            return {
                // vuetable prop
                fields: [
                    { name: 'grantee', title: this.$t('objects.name') },
                    { name: 'read', title: this.$t('objects.read') },
                    { name: 'edit', title: this.$t('objects.edit') },
                    { name: 'delete', title: this.$t('objects.delete') },
                ],
            };
        },

        watch: {
            parentId(value) {
                this.setParentId(value);
            },
        },

        computed: {
            ...mapState('lookups/calendars', {
                parentId: (state) => state.itemId,
            }),
            ...mapState('lookups/calendars/permissions', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.calendars.permissions.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.lookups.calendars.permissions.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {
            ...mapActions('lookups/calendars/permissions', {
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
