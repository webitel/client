<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.teams.teams', 1)}} |
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
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { required, numeric } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import openedTeamGeneral from './opened-team-general';
    import openedTeamSupervisors from './opened-team-supervisors';
    import openedTeamAgents from './opened-team-agents';
    import openedTeamSkills from './opened-team-skills';
    import openedTeamTiming from './opened-team-timing';
    import openedTeamPermissions from './opened-team-permissions';

    export default {
        name: 'opened-team',
        components: {
            openedTeamGeneral,
            openedTeamSupervisors,
            openedTeamAgents,
            openedTeamSkills,
            openedTeamTiming,
            openedTeamPermissions,
        },
        mixins: [editComponentMixin],

        data() {
            return {};
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required,
                },
                strategy: {
                    required,
                },
                maxNoAnswer: {
                    numeric,
                    required,
                },
                wrapUpTime: {
                    numeric,
                    required,
                },
                busyDelayTime: {
                    numeric,
                    required,
                },
                callTimeout: {
                    numeric,
                    required,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/teams', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.ccenter.teams.itemId;
                },
                set(value) {
                    this.setId(value);
                },
            },

            tabs() {
                const tabs = [{
                    text: this.$t('objects.general'),
                    value: 'general',
                }, {
                    text: this.$t('objects.ccenter.teams.timing'),
                    value: 'timing',
                }, {
                    text: this.$tc('objects.ccenter.teams.supervisors', 2),
                    value: 'supervisors',
                }, {
                    text: this.$tc('objects.ccenter.agents.agents', 2),
                    value: 'agents',
                }, {
                    text: this.$tc('objects.ccenter.skills.skills', 2),
                    value: 'skills',
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
            ...mapActions('ccenter/teams', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>


<style lang="scss" scoped>

</style>
