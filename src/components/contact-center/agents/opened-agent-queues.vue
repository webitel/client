<template><section>
    <header class="content-header">
        <h3 class="content-title">{{$tc('objects.ccenter.queues.queues', 2)}}</h3>
        <div class="content-header__actions-wrap">
            <i
                    class="icon-icon_reload icon-action"
                    @click="loadDataList"
            ></i>
        </div>
    </header>

    <vuetable
            :api-mode="false"
            :fields="fields"
            :data="dataList"
    >
        <template slot="name" slot-scope="props">
            <div>
                {{dataList[props.rowIndex].queue.name}}
            </div>
        </template>
    </vuetable>
    <pagination
            v-model="size"
            @loadDataList="loadDataList"
            @next="nextPage"
            @prev="prevPage"
            :isNext="isNextPage"
            :isPrev="!!page"
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
                ],
            }
        },

        watch: {
            parentId: function (value) {
                this.setParentId(value);
            }
        },

        mounted() {
            this.setParentId(this.parentId);
            this.loadDataList();
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