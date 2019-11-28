<template>
    <popup
            :title="$t('objects.ccenter.teams.statusHistory')"
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
                    class="history-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': dataList[props.rowIndex].state}"
                            :text=computeOnlineText(dataList[props.rowIndex].state)
                    >
                    </status>
                </template>

                <template slot="from" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].from}}
                    </div>
                </template>

                <template slot="to" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].to}}
                    </div>
                </template>

                <template slot="duration" slot-scope="props">
                    <div>
                        {{computeDuration(dataList[props.rowIndex])}}
                    </div>
                </template>
            </vuetable>
            <pagination></pagination>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import datepicker from '@/components/utils/datepicker';
    import status from '../../../utils/status';

    export default {
        name: "team-history-popup",
        mixins: [tableComponentMixin],
        components: {
            datepicker,
            popup,
            status,
        },
        props: {
            itemId: {
                type: Number,
                // required: true
            }
        },
        data() {
            return {
                date: Date.now(),
                fields: [
                    {name: 'state', title: this.$t('objects.ccenter.teams.historyState')},
                    {name: 'from', title: this.$t('objects.ccenter.teams.historyFrom')},
                    {name: 'to', title: this.$t('objects.ccenter.teams.historyTo')},
                    {name: 'duration', title: this.$t('objects.ccenter.teams.historyDuration')},
                ],
            }
        },

        methods: {
            computeOnlineText(state) {
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            computeDuration(item) {
                return '10h 21m'
            },

            loadDataList() {
                for (let i = 0; i < 6; i++) {
                    this.dataList.push({
                        state: !!(i%2),
                        from: '5 August 2019, 10:16 AM',
                        to: '5 August 2019, 10:16 AM',
                        id: i,
                    });
                }
            }
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