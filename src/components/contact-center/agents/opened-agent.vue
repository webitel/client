<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.agents.agents', 1)}} |
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
    import openedAgentGeneral from './opened-agent-general';
    import openedAgentTeams from './opened-agent-teams';
    import openedAgentQueues from './opened-agent-queues';
    import openedAgentSkills from './opened-agent-skills';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-agent',
        mixins: [editComponentMixin],
        components: {
            openedAgentGeneral,
            openedAgentTeams,
            openedAgentQueues,
            openedAgentSkills
        },

        data() {
            return {
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.ccenter.skills.skills', 2),
                        value: 'skills',
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
                        text: this.$tc('objects.permissions.permissions'),
                        value: 'permissions-tab',
                    },
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                user: {
                    required
                }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/agents', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.agents.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('ccenter/agents', {
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
