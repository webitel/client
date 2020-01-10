<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$t('objects.ccenter.queues.inboundQueue')}} | {{computeTitle}}
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
    import openedQueueInboundQueueGeneral from './opened-queue-inbound-queue-general';
    import openedQueueInboundQueueVariables from '../opened-queue-variables';
    import openedQueueInboundQueueMembers from '../opened-queue-members';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";

    export default {
        name: 'opened-queue-inbound-queue',
        components: {
            openedQueueInboundQueueGeneral,
            openedQueueInboundQueueVariables,
            openedQueueInboundQueueMembers,
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: '',
                    calendar: {name: 'Calendar name', id: 0},
                    priority: {name: 'High', value: 1},
                    blacklist: {name: 'Blacklist name', id: 0},
                    schema: {name: 'Schema name', id: 0},
                    team: {name: 'Team name', id: 0},
                    description: 'lorem ipsum',
                    variables: [],
                },
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
                        text: this.$tc('objects.ccenter.queues.members', 2),
                        value: 'members',
                    },
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
