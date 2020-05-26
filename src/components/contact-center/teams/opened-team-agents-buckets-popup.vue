<template>
    <popup
            :title="$tc('objects.ccenter.buckets.buckets', 2)"
            :primaryText="$t('objects.ok')"
            :primaryAction="() => $emit('close')"
            @close="$emit('close')"
    >
        <section class="agent-buckets-popup">
            <vuetable
                    class="popup-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="getBuckets"
            >
                <template slot="bucket" slot-scope="props">
                    <div>
                        {{getBuckets[props.rowIndex].name}}
                    </div>
                </template>

            </vuetable>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { mapGetters } from 'vuex';

    export default {
        name: 'opened-team-agents-buckets-popup',
        mixins: [tableComponentMixin],
        components: {
            popup,
        },
        props: ['itemId'],
        data() {
            return {
                fields: [
                    { name: 'bucket', title: this.$tc('objects.ccenter.buckets.buckets', 1) },
                ],
            };
        },

        computed: {
            ...mapGetters('ccenter/teams/agents', [
                        'GET_ITEM_BUCKETS',
            ]),

            getBuckets() {
                return this.GET_ITEM_BUCKETS(this.itemId);
            },
        },

        methods: {
            loadDataList() {
            },
        },
    };
</script>

<style lang="scss" scoped>
    .destinations-popup {
        margin-bottom: 30px;
    }
</style>
