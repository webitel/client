<template>
    <popup
            :title="$t('objects.directory.devices.deviceHistory')"
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
                <template slot="loggedIn" slot-scope="props">
                    <div>{{computeTime(dataList[props.rowIndex].loggedIn)}}</div>
                </template>
                <template slot="loggedOut" slot-scope="props">
                    <div>{{computeTime(dataList[props.rowIndex].loggedOut)}}</div>
                </template>
                <template slot="user" slot-scope="props">
                    <div>{{dataList[props.rowIndex].user.name}}</div>
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
    import popup from '@/components/utils/popup';
    import datepicker from '@/components/utils/datepicker';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {getDeviceHistory} from "../../../api/directory/devices/devices";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "device-history-popup",
        components: {
            datepicker,
            popup
        },
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'loggedIn', title: this.$t('objects.directory.devices.loggedIn')},
                    {name: 'loggedOut', title: this.$t('objects.directory.devices.loggedOut')},
                    {name: 'user', title: this.$tc('objects.directory.users.users', 1)},
                ],
            }
        },

        watch: {
            date: function () {
                this.loadDataList();
            }
        },

        computed: {
            ...mapState('directory/devices', {
                dataList: state => state.history.dataList,
                date: state => state.history.date,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.directory.devices.history.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.directory.devices.history.search},
                set(value) {this.setSearch(value)}
            },

            date: {
                get() {return this.$store.state.directory.devices.history.date},
                set(value) {this.setHistoryDate(value)}
            },
        },

        methods: {
            computeTime(time) {
                if(isNaN(parseInt(time))) return time;
                return new Date(+time).toString().split(' ')[4];
            },

            ...mapActions('directory/devices', {
                loadDataList: 'LOAD_HISTORY_DATA_LIST',
                setSize: 'SET_HISTORY_SIZE',
                setSearch: 'SET_HISTORY_SEARCH',
                setHistoryDate: 'SET_HISTORY_DATE',
                nextPage: 'NEXT_HISTORY_PAGE',
                prevPage: 'PREV_HISTORY_PAGE',
            }),
        }
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