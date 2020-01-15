<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$t('objects.ccenter.queues.predictiveDialer')}} |
            {{computeTitle}}
        </object-header>

        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedQueuePredictiveDialerGeneral from './opened-queue-predictive-dialer-general';
    import openedQueuePredictiveDialerResources from '../opened-queue-resources';
    import openedQueuePredictiveDialerVariables from '../opened-queue-variables';
    import openedQueuePredictiveDialerTiming from './opened-queue-predictive-dialer-timing';
    import openedQueuePredictiveDialerBuckets from '../opened-queue-buckets';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-queue-predictive-dialer',
        components: {
            openedQueuePredictiveDialerGeneral,
            openedQueuePredictiveDialerResources,
            openedQueuePredictiveDialerVariables,
            openedQueuePredictiveDialerTiming,
            openedQueuePredictiveDialerBuckets,
        },
        mixins: [editComponentMixin],

        data() {
            return {
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.variables', 2),
                        value: 'variables',
                    },
                    {
                        text: this.$t('objects.ccenter.queues.timing'),
                        value: 'timing',
                    },
                    {
                        text: this.$tc('objects.ccenter.buckets.buckets', 2),
                        value: 'buckets',
                    }
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                calendar: {
                    required
                },
                strategy: {
                    required
                },
                schema: {
                    required
                },
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem('predictive-dialer');
        },

        computed: {
            ...mapState('ccenter/queues', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.queues.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('ccenter/queues', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>


<style lang="scss" scoped>
    .value-pair-wrap {
        margin-top: 8px;
    }

    .value-pair {
        grid-template-columns: 1fr 24px;
    }
</style>
