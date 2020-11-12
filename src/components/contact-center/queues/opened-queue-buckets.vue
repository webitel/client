<template>
    <section>
        <bucket-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></bucket-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.buckets.buckets', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <search
                        v-model="search"
                        @filterData="loadList"
                ></search>
                <i
                        class="icon-icon_delete icon-action"
                        :class="{'hidden': anySelected}"
                        :title="$t('iconHints.deleteSelected')"
                        @click="deleteSelected"
                ></i>
                <i
                        class="icon-icon_reload icon-action"
                        :title="$t('iconHints.reload')"
                        @click="loadList"
                ></i>
                <i
                        class="icon-action icon-icon_plus"
                        :title="$t('iconHints.add')"
                        @click="create"
                ></i>
            </div>
        </header>

        <loader v-show="!isLoaded"></loader>

        <wt-table
                v-show="isLoaded"
                :headers="fields"
                :data="dataList"
                sortable
        >
            <template slot="name" slot-scope="{item}">
                <div>
                    {{item.bucket.name}}
                </div>
            </template>

            <template slot="capacity" slot-scope="{item}">
                <div>
                    {{item.ratio}}
                </div>
            </template>

            <template slot="actions" slot-scope="{item}">
                <i class="vuetable-action icon-icon_edit"
                   :title="$t('iconHints.edit')"
                   @click="edit(item)"
                ></i>
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
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import bucketPopup from './opened-queue-buckets-popup';
    import eventBus from '../../../utils/eventBus';

    export default {
        name: 'opened-queue-outbound-ivr-buckets',
        mixins: [tableComponentMixin, openedTabComponentMixin],
        components: { bucketPopup },

        data() {
            return {
                fields: [
                    { value: 'name', text: this.$tc('objects.ccenter.skills.skills', 2) },
                    { value: 'ratio', text: this.$t('objects.ccenter.queues.bucketRatio') },
                    _actionsTableField_2,
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
            ...mapState('ccenter/queues/buckets', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.ccenter.queues.buckets.size; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.ccenter.queues.buckets.search; },
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

            edit(item) {
                this.setId(item.id);
                this.popupTriggerIf = true;
            },

            ...mapActions('ccenter/queues', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/queues/buckets', {
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

</style>
