<template>
    <popup
            :title="$t('objects.directory.devices.deviceHistory')"
            :primaryBtnText="$t('objects.directory.devices.ok')"
            :primaryBtnAction="() => $emit('close')"
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
                    class="devices-history-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
            </vuetable>
            <pagination></pagination>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import pagination from '@/components/utils/table-pagination';
    import datepicker from '@/components/utils/datepicker';
    import vuetable from 'vuetable-2';

    export default {
        name: "device-history-popup",
        components: {
            pagination,
            datepicker,
            vuetable,
            popup
        },
        data() {
            return {
                date: Date.now(),
                dataList: [],
                fields: [
                    {name: 'login', title: this.$t('objects.directory.devices.loggedIn')},
                    {name: 'logout', title: this.$t('objects.directory.devices.loggedOut')},
                    {name: 'user', title: this.$tc('objects.directory.users.users', 1)},
                ],
            }
        },

        mounted() {
            this.loadDataList();
        },

        methods: {
            loadDataList() {
                for (let i = 0; i < 7; i++) {
                    this.dataList.push({
                        login: '5 August 2019, 10:16 AM',
                        logout: '5 August 2019, 10:16 AM',
                        user: `User ${i}`,
                        id: i,
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .history-popup {
        padding-bottom: 28px;

        .history-popup__datepicker {
            max-width: 220px;
        }

        .devices-history-table table {
            min-width: auto;
        }

        .pagination {
            width: fit-content;
            margin-top: 28px;
            margin-left: auto;
        }
    }
</style>