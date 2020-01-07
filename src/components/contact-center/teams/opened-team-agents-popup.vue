<template>
    <popup
            :title="$tc('objects.ccenter.agents.agents', 1)"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <dropdown-select
                    v-model="agent"
                    :v="$v.itemInstance.agent"
                    :options="dropdownAgentsList"
                    :label="$tc('objects.ccenter.agents.agents', 1)"
                    @search="loadAgentsOptions"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="lvl"
                    :v="$v.itemInstance.lvl"
                    :label="$t('objects.ccenter.teams.lvl')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="bucket"
                    :options="dropdownBucketsList"
                    :label="$tc('objects.ccenter.buckets.buckets', 1)"
                    @search="loadBucketsOptions"
            ></dropdown-select>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";
    import {getAgentsList} from "../../../api/contact-center/agents/agents";
    import {getBucketsList} from "../../../api/contact-center/buckets/buckets";

    export default {
        name: "opened-team-agents-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },

        data() {
            return {
                dropdownAgentsList: [],
                dropdownBucketsList: [],
            }
        },

        validations: {
            itemInstance: {
                agent: {
                    required,
                },
                lvl: {
                    required,
                },
            }
        },

        mounted() {
            this.loadItem();
            this.loadAgentsOptions();
            this.loadBucketsOptions();
        },

        computed: {
            ...mapState('ccenter/teams', {
                id: state => state.agentItemId,
                itemInstance: state => state.agentItemInstance
            }),

            agent: {
                get() {
                    return this.$store.state.ccenter.teams.agentItemInstance.agent
                },
                set(value) {
                    this.setItemProp({prop: 'agent', value})
                }
            },
            lvl: {
                get() {
                    return this.$store.state.ccenter.teams.agentItemInstance.lvl
                },
                set(value) {
                    this.setItemProp({prop: 'lvl', value})
                }
            },
            bucket: {
                get() {
                    return this.$store.state.ccenter.teams.agentItemInstance.bucket
                },
                set(value) {
                    this.setItemProp({prop: 'bucket', value})
                }
            },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                if (!invalid) {
                    try {
                        !this.id ? await this.addItem() : await this.updateItem();
                        this.$emit('close');
                    } catch {}
                }
            },

            async loadAgentsOptions(search) {
                const response = await getAgentsList(10, search);
                this.dropdownAgentsList = response.map(item => {
                    return {
                        name: item.user.name,
                        id: item.id,
                    }
                });
            },

            async loadBucketsOptions(search) {
                const response = await getBucketsList(10, search);
                this.dropdownBucketsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/teams', {
                setItemProp: 'SET_AGENT_ITEM_PROPERTY',
                addItem: 'ADD_AGENT_ITEM',
                updateItem: 'UPDATE_AGENT_ITEM',
                loadItem: 'LOAD_AGENT_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

    .input-row-wrap {
        display: flex;

    .form-input {
        width: 50%;

    &:first-child {
         margin-right: 18px;
     }
    }
    }
</style>