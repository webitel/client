<template>
    <section>
        <resource-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></resource-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.res.res', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <wt-search-bar
                        v-model="search"
                        @filterData="loadList"
                ></wt-search-bar>
                <wt-table-actions
                    @input="tableActionsHandler"
                ></wt-table-actions>
                <i
                        class="icon-action icon-icon_plus"
                        :title="$t('iconHints.add')"
                        @click="create"
                ></i>
            </div>
        </header>

        <loader v-show="!isLoaded"></loader>
        <div class="table-wrapper" v-show="isLoaded">
            <wt-table
                    :headers="fields"
                    :data="dataList"
            >
                <template slot="name" slot-scope="{item}">
                    <div>
                        {{item.resourceGroup.name}}
                    </div>
                </template>
            </wt-table>
            <wt-pagination
                    v-model="size"
                    @loadDataList="loadList"                
                    :next="isNextPage"
            ></wt-pagination>
        </div>
    </section>
</template>

<script>
    import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import eventBus from '../../../utils/eventBus';
    import resourcePopup from './opened-queue-resources-popup';
    import tableActionsHandlerMixin from '../../../mixins/tableActionsMixin';

    export default {
        name: 'opened-queue-resources',
        mixins: [tableComponentMixin, openedTabComponentMixin, tableActionsHandlerMixin],
        components: { resourcePopup },

        data() {
            return {
                fields: [
                    { value: 'name', text: this.$t('objects.name') },
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
            ...mapState('ccenter/queues/resGroups', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.ccenter.queues.resGroups.size; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.ccenter.queues.resGroups.search; },
                set(value) { this.setSearch(value); },
            },
        },

        methods: {
            async create() {
                if (!this.checkValidations()) {
                    if (!this.id) await this.addParentItem();
                    this.popupTriggerIf = true;
                } else {
                    eventBus.$emit('notificationError', 'Check your validations!');
                }
            },

            edit(rowIndex) {
                this.setId(this.dataList[rowIndex].id);
                this.popupTriggerIf = true;
            },

            ...mapActions('ccenter/queues', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/queues/resGroups', {
                setParentId: 'SET_PARENT_ITEM_ID',
                setId: 'SET_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/css/objects/table-page';
</style>
