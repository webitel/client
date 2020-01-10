<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$t('objects.ccenter.queues.outboundIVRQueue')}} |
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
    import openedQueueOutboundIvrGeneral from './opened-queue-outbound-ivr-general';
    import openedQueueOutboundIvrResources from '../opened-queue-resources';
    import openedQueueOutboundIvrVariables from '../opened-queue-variables';
    import openedQueueOutboundIvrMembers from '../opened-queue-members';
    import openedQueueOutboundIvrTiming from './opened-queue-outbound-ivr-timing';
    import openedQueueOutboundIvrBuckets from '../opened-queue-buckets';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-queue-outbound-ivr',
        components: {
            openedQueueOutboundIvrGeneral,
            openedQueueOutboundIvrResources,
            openedQueueOutboundIvrVariables,
            openedQueueOutboundIvrMembers,
            openedQueueOutboundIvrTiming,
            openedQueueOutboundIvrBuckets,
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
                        text: this.$tc('objects.ccenter.res.res', 2),
                        value: 'resources',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.variables', 2),
                        value: 'variables',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.members', 2),
                        value: 'members',
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
            this.loadItem();
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
