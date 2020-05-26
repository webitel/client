<template>
    <popup
            :title="$t('objects.directory.devices.deviceHistory')"
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
                    :page="page"
            ></pagination>
        </section>
    </popup>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import popup from '../../utils/popup';
    import datetimePicker from '../../utils/datetimepicker';

    export default {
        name: 'device-history-popup',
        mixins: [tableComponentMixin],
        components: {
            datetimePicker,
            popup,
        },
        data() {
            return {
                fields: [
                    { name: 'loggedIn', title: this.$t('objects.directory.devices.loggedIn') },
                    { name: 'loggedOut', title: this.$t('objects.directory.devices.loggedOut') },
                    { name: 'user', title: this.$tc('objects.directory.users.users', 1) },
                ],
            };
        },

        computed: {
            ...mapState('directory/devices', {
                dataList: (state) => state.history.dataList,
                date: (state) => state.history.date,
                page: (state) => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.directory.devices.history.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.directory.devices.history.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },

            date: {
                get() {
                    return this.$store.state.directory.devices.history.date;
                },
                set(value) {
                    this.setHistoryDate(value);
                },
            },
        },

        methods: {
            computeTime(time) {
                if (isNaN(parseInt(time))) return time;
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
        },
    };
</script>

<style lang="scss">
    .history-popup {
        padding-bottom: 28px;

        table {
            min-width: auto;
        }

        .pagination {
            width: fit-content;
            margin-top: 28px;
            margin-left: auto;
        }
    }
</style>
