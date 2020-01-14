<template>
    <popup
            :title="$tc('objects.ccenter.queues.destination', 2)"
            :primaryText="$t('objects.ok')"
            :primaryAction="() => $emit('close')"
            @close="$emit('close')"
    >
        <section class="destinations-popup">
            <vuetable
                    class="popup-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="destination" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].destination}}
                    </div>
                </template>

                <template slot="type" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].type.name}}
                    </div>
                </template>

                <template slot="priority" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].priority}}
                    </div>
                </template>
            </vuetable>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {mapGetters} from "vuex";

    export default {
        name: "opened-queue-member-destinations-popup",
        mixins: [tableComponentMixin],
        components: {
            popup,
        },

        data() {
            return {
                fields: [
                    {name: 'destination', title: this.$tc('objects.ccenter.queues.destination', 1)},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                ],
            }
        },

        computed: {
            ...mapGetters('ccenter/queues/members', {
                dataList: 'GET_ITEM_DESTINATIONS',
            }),

            // dataList() {
            //     return this.$store.getters.ccenter.queues.members['GET_ITEM_DESTINATIONS'];
            // }
        },

        methods: {
            loadDataList() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .destinations-popup {
        margin-bottom: 30px;
    }
</style>