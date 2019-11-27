<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.ccenter.agents.agents', 1)}} | {{computeTitle}}
        </object-header>

        <section class="object-content module-new object-with-tabs">
            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
        </section>
    </div>
</template>

<script>
    import openedAgentGeneral from './opened-agent-general';
    import openedAgentTeams from './opened-agent-teams';
    import openedAgentQueues from './opened-agent-queues';
    import openedAgentSkills from './opened-agent-skills';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";

    export default {
        name: 'opened-agent',
        components: {
            openedAgentGeneral,
            openedAgentTeams,
            openedAgentQueues,
            openedAgentSkills
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    agent: {
                        user: {
                            id: 1,
                            name: 'name'
                        },
                        description: ''
                    },
                    permissions: {},
                    teams: {},
                    queues: {},
                    skills: {},
                },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.ccenter.agents.permissions'),
                        value: 'permissions',
                    },
                    {
                        text: this.$tc('objects.ccenter.teams.teams', 2),
                        value: 'teams',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.queues', 2),
                        value: 'queues',
                    },
                    {
                        text: this.$tc('objects.ccenter.skills.skills', 2),
                        value: 'skills',
                    }
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                agent: {
                    user: {
                        required
                    }
                }
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
