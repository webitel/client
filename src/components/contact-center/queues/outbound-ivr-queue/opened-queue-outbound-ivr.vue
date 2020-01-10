<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$t('objects.ccenter.queues.outboundIVRQueue')}} | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
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
                itemInstance: {
                    name: '',
                    calendar: {name: 'Calendar name', id: 0},
                    strategy: {name: 'Strategy name', id: 0},
                    timezone: {name: 'Timezone name', id: 0},
                    priority: {name: 'High', value: 1},
                    blacklist: {name: 'Blacklist name', id: 0},
                    schema: {name: 'Schema name', id: 0},
                    callLimit: 10,
                    description: 'lorem ipsum',
                    resources: [],
                    variables: [],
                    originateTimeout: 15,
                    waitBetweenRetries: 30*3600, //30h
                    timeout: 10,
                    maxNumberOfRetry: 10,
                    buckets: [{key: {name: 'Bucket name as key'}, value: 'Value'},
                        {key: {name: 'Bucket name as key'}, value: 'Value'}]
                },
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
                timezone: {
                    required
                },
                schema: {
                    required
                },
            }
        },

        methods: {
            async submit() {
                const isItemChanged = !deepEqual(this.itemInstance, this.initialItem);
                if (isItemChanged) {
                    const validations = this.checkValidations();
                    if (!validations) {
                        try {
                            this.close();
                        } catch (err) {
                            this.loadItem();
                        }
                    }
                } else {
                    this.close();
                }
            },

            // load current item from backend
            async loadItem() {
                // await this.loadResource();
                // await this.loadNumbers();


                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },
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
