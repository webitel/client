<template>
    <popup
            :title="$t('objects.directory.devices.deviceHistory')"
            :primaryBtnText="$t('objects.ok')"
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
            <pagination></pagination>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import datepicker from '@/components/utils/datepicker';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {getDeviceHistory} from "../../../../api/objects/directory/devices";

    export default {
        name: "device-history-popup",
        components: {
            datepicker,
            popup
        },
        mixins: [tableComponentMixin],
        props: {
            itemId: {
                type: [String, Number],
                required: true
            }
        },

        watch: {
          itemId: function() {
              this.loadDataList();
          }
        },

        data() {
            return {
                date: Date.now(),
                fields: [
                    {name: 'loggedIn', title: this.$t('objects.directory.devices.loggedIn')},
                    {name: 'loggedOut', title: this.$t('objects.directory.devices.loggedOut')},
                    {name: 'user', title: this.$tc('objects.directory.users.users', 1)},
                ],
            }
        },

        methods: {
            computeTime(time) {
                if(isNaN(parseInt(time))) return time;
                return new Date(+time).toString().split(' ')[4];
            },

            async loadDataList() {
                this.dataList = await getDeviceHistory(this.itemId, this.date);
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