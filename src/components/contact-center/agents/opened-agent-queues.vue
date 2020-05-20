<template><section>
    <header class="content-header">
        <h3 class="content-title">{{$tc('objects.ccenter.queues.queues', 2)}}</h3>
        <div class="content-header__actions-wrap">
            <i
                    class="icon-icon_reload icon-action"
                    :title="$t('iconHints.reload')"
                    @click="loadList"
            ></i>
        </div>
    </header>

    <loader v-show="!isLoaded"></loader>

    <vuetable
            v-show="isLoaded"
            :api-mode="false"
            :fields="fields"
            :data="dataList"
    >
        <template slot="name" slot-scope="props">
            <div>
                {{dataList[props.rowIndex].queue.name}}
            </div>
        </template>

        <template slot="type" slot-scope="props">
            <div>
                {{computeQueueType(dataList[props.rowIndex].type)}}
            </div>
        </template>

        <template slot="count" slot-scope="props">
            <div>
                {{computeCount(dataList[props.rowIndex].countMember)}}
            </div>
        </template>

        <template slot="waiting" slot-scope="props">
            <div>
                {{computeCount(dataList[props.rowIndex].waitingMember)}}
            </div>
        </template>

        <template slot="strategy" slot-scope="props">
            <div>
                {{computeStrategy(dataList[props.rowIndex].strategy)}}
            </div>
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
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-agent-queues",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$tc('objects.ccenter.queues.queues', 2)},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    {name: 'count', title: this.$tc('objects.ccenter.queues.members', 2)},
                    {name: 'waiting', title: this.$t('objects.ccenter.queues.waiting')},
                    {name: 'strategy', title: this.$t('objects.ccenter.queues.strategy')},
                ],
            }
        },

        watch: {
            parentId: function (value) {
                this.setParentId(value);
            }
        },

        computed: {
            ...mapState('ccenter/agents', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/agents/queues', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.agents.skills.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.agents.skills.search},
                set(value) {this.setSearch(value)}
            }
        },

        methods: {
            computeCount(item) {
                return item ? item : 0;
            },

            computeQueueType(type) {
                switch (type) {
                    case 0:
                        return 'Offline Queue';
                    case 1:
                        return 'Inbound Queue';
                    case 2:
                        return 'Outbound IVR Queue';
                    case 3:
                        return 'Preview Dialer';
                    case 4:
                        return 'Progressive Dialer';
                    case 5:
                        return 'Predictive Dialer';
                    default:
                        return 'Unknown';
                }
            },

            computeStrategy(strategy) {
                switch (strategy) {
                    case 'random':
                        return 'Random';
                    case 'strict-circuit':
                        return 'Strict circuit';
                    case 'next-try-circuit':
                        return 'Next try circuit';
                    case 'by-buckets':
                        return 'By buckets';
                    case 'by-skills':
                        return 'By skills';
                    default:
                        return 'Unknown';
                }
            },

            ...mapActions('ccenter/agents', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/agents/queues', {
                setParentId: 'SET_PARENT_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .inline-dropdown {
        width: 226px;
    }
</style>