<template>
    <popup
            :title="$t('objects.ccenter.teams.statusHistory')"
            :primaryText="$t('objects.ok')"
            :primaryAction="() => $emit('close')"
            @close="$emit('close')"
    >
        <section class="history-popup">
            <datepicker
                    class="history-popup__datepicker datepicker__to-right"
                    v-model="date"
                    :calendar-button-icon="'icon-icon_arrow-down'"
                    :maximum-view="'day'"
                    full-month-name
                    calendar-button
            ></datepicker>
            <vuetable
                    class="popup-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': dataList[props.rowIndex].state}"
                            :text=computeOnlineText(dataList[props.rowIndex].state)
                    ></status>
                </template>

                <template slot="from" slot-scope="props">
                    <div>
                        {{computeTime(dataList[props.rowIndex].loggedIn)}}
                    </div>
                </template>

                <template slot="to" slot-scope="props">
                    <div>
                        {{computeTime(dataList[props.rowIndex].loggedOut)}}
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
            ></pagination>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import datepicker from '@/components/utils/datepicker';
    import status from '../../../utils/status';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "team-history-popup",
        mixins: [tableComponentMixin],
        components: {
            datepicker,
            popup,
        },
        data() {
            return {
                fields: [
                    {name: 'state', title: this.$t('objects.ccenter.teams.historyState')},
                    {name: 'from', title: this.$t('objects.ccenter.teams.historyFrom')},
                    {name: 'to', title: this.$t('objects.ccenter.teams.historyTo')},
                    {name: 'duration', title: this.$t('objects.ccenter.teams.historyDuration')},
                ],
            }
        },

        watch: {
            date: function () {
                this.loadDataList();
            }
        },

        computed: {
            ...mapState('ccenter/teams', {
                dataList: state => state.historyDataList,
                date: state => state.historyDate,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.historySize},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.historySearch},
                set(value) {this.setSearch(value)}
            },

            date: {
                get() {return this.$store.state.ccenter.teams.historyDate},
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
                const range = this.dataList[rowIndex].loggedIn - this.dataList[rowIndex].loggedOut;
                return new Date(range).toISOString().slice(11, 19);
            },

            ...mapActions('ccenter/teams', {
                loadDataList: 'LOAD_HISTORY_DATA_LIST',
                setSize: 'SET_HISTORY_SIZE',
                setSearch: 'SET_HISTORY_SEARCH',
                setHistoryDate: 'SET_HISTORY_DATE',
                nextPage: '',
                prevPage: '',
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