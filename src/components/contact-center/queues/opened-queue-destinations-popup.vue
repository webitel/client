<template>
    <popup
            :title="$tc('objects.ccenter.queues.destination', 2)"
            :primaryBtnText="$t('objects.directory.devices.ok')"
            :primaryBtnAction="() => $emit('close')"
            @close="$emit('close')">
        <section class="destinations-popup">
            <vuetable
                    class="popup-table"
                    ref="vuetable"
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
                        {{dataList[props.rowIndex].type}}
                    </div>
                </template>

                <template slot="priority" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].priority}}
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

    export default {
        name: "opened-queue-destinations-popup",
        mixins: [tableComponentMixin],
        components: {
            popup,
        },
        props: {
            value: {
                type: Object,
            },
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

        methods: {
            loadDataList() {
                for(let i = 0; i < 10; i++) {
                    this.dataList.push({
                        destination: '8 800 555 3535',
                        type: 'comm type',
                        priority: 'High'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .destinations-popup {
        margin-bottom: 30px;
    }
</style>