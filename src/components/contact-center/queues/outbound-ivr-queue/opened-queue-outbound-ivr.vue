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
    import openedQueueOutboundIvrTiming from './opened-queue-outbound-ivr-timing';
    import openedQueueOutboundIvrBuckets from '../opened-queue-buckets';
    import openedQueueOutboundIvrPermissions from '../opened-queue-permissions';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";
    import openedQueueOutboundIvrLogs from "../opened-queue-logs";

    export default {
        name: 'opened-queue-outbound-ivr',
        components: {
            openedQueueOutboundIvrGeneral,
            openedQueueOutboundIvrResources,
            openedQueueOutboundIvrVariables,
            openedQueueOutboundIvrTiming,
            openedQueueOutboundIvrBuckets,
            openedQueueOutboundIvrLogs,
            openedQueueOutboundIvrPermissions,
        },
        mixins: [editComponentMixin],

        data() {
            return {};
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
            this.loadItem('outbound-ivr');
        },

        computed: {
            ...mapState('ccenter/queues', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.ccenter.queues.itemId
                },
                set(value) {
                    this.setId(value)
                }
            },

            tabs() {
                const tabs = [{
                    text: this.$t('objects.general'),
                    value: 'general',
                }, {
                    text: this.$tc('objects.ccenter.res.res', 2),
                    value: 'resources',
                }, {
                    text: this.$tc('objects.ccenter.queues.variables', 2),
                    value: 'variables',
                }, {
                    text: this.$t('objects.ccenter.queues.timing'),
                    value: 'timing',
                }, {
                    text: this.$tc('objects.ccenter.buckets.buckets', 2),
                    value: 'buckets',
                }, {
                    text: this.$tc('objects.ccenter.logs.logs', 1),
                    value: 'logs',
                }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },
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
