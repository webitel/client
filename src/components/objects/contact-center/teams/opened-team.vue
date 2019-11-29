<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.ccenter.teams.teams', 1)}} | {{computeTitle}}
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
    import openedTeamGeneral from './opened-team-general';
    import openedTeamSupervisors from './opened-team-supervisors';
    import openedTeamAgents from './opened-team-agents';
    import openedTeamSkills from './opened-team-skills';
    import openedTeamTiming from './opened-team-timing';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric} from 'vuelidate/lib/validators';

    export default {
        name: 'opened-team',
        components: {
            openedTeamGeneral,
            openedTeamSupervisors,
            openedTeamAgents,
            openedTeamSkills,
            openedTeamTiming
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: 'name',
                    description: 'descr',
                    strategy: {
                        name: 'strategy'
                    },
                    maxNoAnswer: 0,
                    wrapUpTime: 0,
                    rejectDelayTime: 0,
                    busyDelayTime: 0,
                    noAnswerDelayTime: 0,
                    callTimeout: 0,
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
                        text: this.$tc('objects.ccenter.teams.supervisors', 2),
                        value: 'supervisors',
                    },
                    {
                        text: this.$tc('objects.ccenter.agents.agents', 2),
                        value: 'agents',
                    },
                    {
                        text: this.$tc('objects.ccenter.skills.skills', 2),
                        value: 'skills',
                    },
                    {
                        text: this.$t('objects.ccenter.teams.timing'),
                        value: 'timing',
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
                strategy: {
                    required
                },
                maxNoAnswer: {
                    numeric,
                    required
                },
                wrapUpTime: {
                    numeric,
                    required
                },
                rejectDelayTime: {
                    numeric,
                    required
                },
                busyDelayTime: {
                    numeric,
                    required
                },
                noAnswerDelayTime: {
                    numeric,
                    required
                },
                callTimeout: {
                    numeric,
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

</style>
