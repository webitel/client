<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.logs.logs', 1)}}</h3>
        </header>

        <loader v-show="!isLoaded"></loader>

        <wt-table ref="vuetable"
                v-show="isLoaded"
                :headers="fields"
                sortable
                :data="dataList"
                @sort="sort = getNextSort($event.sort)"
        >
            <template slot="number" slot-scope="{item}">
                <div>
                    {{item.destination.destination}}
                </div>
            </template>

            <template slot="agent" slot-scope="{item}">
                <div v-if="item.agent">
                    {{item.agent.name}}
                </div>
            </template>

            <template slot="start" slot-scope="{item}">
                <div>
                    {{formatDate(item.joinedAt)}}
                </div>
            </template>

            <template slot="offering" slot-scope="{item}">
                <div>
                    {{formatDate(item.offeringAt)}}
                </div>
            </template>

            <template slot="end" slot-scope="{item}">
                <div>
                    {{formatDate(item.leavingAt)}}
                </div>
            </template>

            <template slot="attempt" >
                <div>
                    {{"no data"}}
                </div>
            </template>

            <template slot="duration" >
                <div>
                    {{"no data"}}
                </div>
            </template>

            <template slot="name" slot-scope="{item}">
                <div>
                    {{item.destination.description}}
                </div>
            </template>

            <template slot="result" slot-scope="{item}">
                <div>
                    {{item.result}}
                </div>
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
    import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-queue-logs',
        mixins: [tableComponentMixin, openedTabComponentMixin],

        data() {
            return {
                sortOrder: [
                        {
                            field: 'start',
                            sortField: 'joined_at',
                            direction: 'asc',
                        },
                    ],
                fields: [
                    {
 value: 'number', text: 'Number', sortField: 'number', sort: 'asc',
},
                    { value: 'agent', text: this.$tc('objects.ccenter.agents.agents', 1), sortField: 'agent' },
                    { value: 'start', text: 'Call start', sortField: 'joined_at' },
                    { value: 'end', text: 'Call end', sortField: 'joined_at' },
                    { value: 'offering', text: 'Offering time', sortField: 'offering' },
                    { value: 'attempt', text: 'Attempts', sortField: 'attempt' },
                    { value: 'duration', text: 'Duration', sortField: 'duration' },
                    { value: 'name', text: 'View number', sortField: 'name' },
                    { value: 'result', text: 'Call result', sortField: 'result' },

                ],
            };
        },

        watch: {
            parentId(value) {
                this.setParentId(value);
            },

            // dataList() {
            //     this.$refs.vuetable.setData(this.dataList);
            // },
        },

        computed: {
            ...mapState('ccenter/queues', {
                parentId: (state) => state.itemId,
            }),
            ...mapState('ccenter/callLog', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.ccenter.queues.resGroups.size; },
                set(value) { this.setSize(value); },
            },
        },

        methods: {
            formatDate(value) {
                const time = new Date(+value).toLocaleString('en-GB').replace(',', '\n').replace('Invalid Date', '');
                return time;
            },

            getDuration(item) {
                if (this.item) {
                    let millis = this.item.offeringAt - this.item.joinedAt;
                    millis = millis >= 0 ? millis : 0;
                    const stringTime = this.msToTime(millis);
                    return stringTime;
                }
                return '';
            },

            msToTime(s) {
                function pad(n, z) {
                    z = z || 2;
                    return (`00${n}`).slice(-z);
                }
                const ms = s % 1000;
                s = (s - ms) / 1000;
                const secs = s % 60;
                s = (s - secs) / 60;
                const mins = s % 60;
                const hrs = (s - mins) / 60;
                return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
            },


            dataManager(sortOrder) {
                if (sortOrder[0]) {
                    const sortDir = sortOrder[0].direction === 'asc' ? '-' : '+';
                    const sortStr = sortDir + sortOrder[0].sortField;
                    this.setSort(sortStr);
                }
            },

            ...mapActions('ccenter/callLog', {
                setParentId: 'SET_PARENT_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSort: 'SET_SORT',
                setSize: 'SET_SIZE',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
            }),
        },
    };
</script>

<style lang="scss">
    .sort-icon {
        position: relative;
        float: none !important;
    }

    .sort-icon:before {
        display: none;
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        Top: 50%;
        left: 5px;
        background: url("../../../../../assets/img/nav/accent/arrow.svg");
        background-size: contain;
        transform: translateY(-50%);
    }

    .sorted-asc .sort-icon:before {
        display: block;
        transform: translateY(-50%) rotate(180deg);
    }

    .sorted-desc .sort-icon:before {
        display: block;
    }
</style>
