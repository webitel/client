<template>
    <popup
            :title="$t('objects.ccenter.agents.statusHistory')"
            :primaryText="$t('objects.ok')"
            :primaryAction="() => $emit('close')"
            @close="$emit('close')"
            overflow
    >
        <section class="history-popup">
            <datetime-picker
                    class="history-popup__datetimepicker datepicker__to-right"
                    v-model="date"
                    hide-label
                    hide-details
            ></datetime-picker>
            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="state" slot-scope="props">
<!--                    <status-->
<!--                            :class="{'status__true': dataList[props.rowIndex].state}"-->
<!--                            :text=computeOnlineText(dataList[props.rowIndex].state)-->
<!--                    ></status>-->
                    <div>
                        {{dataList[props.rowIndex].state.toUpperCase()}}
                    </div>
                </template>

                <template slot="from" slot-scope="props">
                    <div>
                        {{computeTime(dataList[props.rowIndex].joinedAt)}}
                    </div>
                </template>

                <template slot="to" slot-scope="props">
                    <div>
                        {{computeTime(dataList[props.rowIndex].loggedOut) || 'Now'}}
                    </div>
                </template>

                <template slot="duration" slot-scope="props">
                    <div>
                        {{computeDuration(props.rowIndex)}}
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
    </popup>
</template>

<script>
    import popup from '../../utils/popup';
    import tableComponentMixin from '../../../mixins/tableComponentMixin';
    import {mapActions, mapState} from "vuex";
    import datetimePicker from "../../utils/datetimepicker";

    export default {
        name: "agent-history-popup",
        mixins: [tableComponentMixin],
        components: {
            datetimePicker,
            popup,
        },
        data() {
            return {
                fields: [
                    {name: 'state', title: this.$t('objects.ccenter.agents.historyState')},
                    {name: 'from', title: this.$t('objects.ccenter.agents.historyFrom')},
                    {name: 'to', title: this.$t('objects.ccenter.agents.historyTo')},
                    {name: 'duration', title: this.$t('objects.ccenter.agents.historyDuration')},
                ],
            }
        },

        computed: {
            ...mapState('ccenter/agents', {
                dataList: state => state.history.dataList,
                page: state => state.history.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.history.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.agents.history.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.agents.history.search},
                set(value) {this.setSearch(value)}
            },

            date: {
                get() {return this.$store.state.ccenter.agents.history.date},
                set(value) {this.setHistoryDate(value)}
            },
        },

        methods: {
            computeOnlineText(state) {
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            computeTime(time) {
                if(isNaN(parseInt(time))) return time;
                return new Date(+time).toString().split(' ')[4];
            },

            computeDuration(rowIndex) {
                const range = (this.dataList[rowIndex].loggedOut || Date.now()) - this.dataList[rowIndex].joinedAt;
                return new Date(range).toISOString().slice(11, 19);
            },

            ...mapActions('ccenter/agents', {
                loadDataList: 'LOAD_HISTORY_DATA_LIST',
                setSize: 'SET_HISTORY_SIZE',
                setSearch: 'SET_HISTORY_SEARCH',
                setHistoryDate: 'SET_HISTORY_DATE',
                nextPage: 'NEXT_HISTORY_PAGE',
                prevPage: 'PREV_HISTORY_PAGE',
            }),
        },
    }
</script>

<style lang="scss">
    .history-popup {
        padding-bottom: 28px;

        .history-popup__datepicker {
            max-width: 220px;
        }

        .history-table table {
            min-width: auto;
        }

        .pagination {
            width: fit-content;
            margin-top: 28px;
            margin-left: auto;
        }
    }
</style>