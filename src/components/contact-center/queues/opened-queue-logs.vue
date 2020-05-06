<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.logs.logs', 1)}}</h3>
        </header>

        <loader v-show="!isLoaded"></loader>

        <vuetable ref="vuetable"
                v-show="isLoaded"
                :api-mode="false"
                :fields="fields"
                :data-manager="dataManager"
                :show-sort-icons="true"
        >
            <template slot="number" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].destination.destination}}
                </div>
            </template>

            <template slot="agent" slot-scope="props">
                <div v-if="dataList[props.rowIndex].agent">
                    {{dataList[props.rowIndex].agent.name}}
                </div>
            </template>

            <template slot="start" slot-scope="props">
                <div>
                    {{formatDate(dataList[props.rowIndex].joinedAt)}}
                </div>
            </template>

            <template slot="offering" slot-scope="props">
                <div>
                    {{getDuration(props.rowIndex)}}
                </div>
            </template>

            <template slot="end" slot-scope="props">
                <div>
                    {{formatDate(dataList[props.rowIndex].leavingAt)}}
                </div>
            </template>

            <template slot="attempt" slot-scope="props">
                <div>
                    {{"no data"}}
                </div>
            </template>

            <template slot="duration" slot-scope="props">
                <div>
                    {{"no data"}}
                </div>
            </template>

            <template slot="name" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].destination.description}}
                </div>
            </template>

            <template slot="result" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].result}}
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
        name: "opened-queue-logs",
        mixins: [tableComponentMixin, openedTabComponentMixin],

        data() {
            return {
                sortOrder: [
                        {
                            field: 'start',
                            sortField: 'joined_at',
                            direction: 'asc'
                        }
                    ],
                fields: [
                    {name: 'number', title: 'Number', sortField: 'number'},
                    {name: 'agent', title: this.$tc('objects.ccenter.agents.agents', 1), sortField: 'agent'},
                    {name: 'start', title: 'Call start', sortField: 'joined_at'},
                    {name: 'end', title: 'Call end', sortField: 'joined_at'},
                    {name: 'offering', title: 'Offering time', sortField: 'offering'},
                    {name: 'attempt', title: 'Attempts', sortField: 'attempt'},
                    {name: 'duration', title: 'Duration', sortField: 'duration'},
                    {name: 'name', title: 'View number', sortField: 'name'},
                    {name: 'result', title: 'Call result', sortField: 'result'},

                ]
            };
        },

        watch: {
            parentId: function (value) {
                this.setParentId(value);
            }
        },

        mounted() {
            this.$refs.vuetable.setData(this.dataList);
        },

        computed: {
            ...mapState('ccenter/queues', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/callLog', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.queues.resGroups.size},
                set(value) {this.setSize(value)}
            },
        },

        methods: {
            formatDate(value) {
                let time = new Date(+value).toLocaleString('en-GB');
                return time;
            },

            getDuration(rowId) {
                let millis = this.dataList[rowId].offeringAt-this.dataList[rowId].joinedAt;
                millis = millis >=0 ? millis : 0;
                let stringTime = this.msToTime(millis);
                return stringTime;
            },

            msToTime(s) {
                function pad(n, z) {
                    z = z || 2;
                    return ('00' + n).slice(-z);
                }
                let ms = s % 1000;
                s = (s - ms) / 1000;
                let secs = s % 60;
                s = (s - secs) / 60;
                let mins = s % 60;
                let hrs = (s - mins) / 60;
                return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
            },


            dataManager(sortOrder) {
                if(sortOrder[0]) {
                    let sortDir = sortOrder[0].direction ===  'asc' ? '-' : '+';
                    let sortStr = sortDir + sortOrder[0].sortField;
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
        }
    }
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
        background: url("../../../assets/img/nav/accent/arrow.svg");
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