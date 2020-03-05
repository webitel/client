<template>
    <popup
            :title="$tc('objects.ccenter.teams.supervisors', 1)"
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
            }
        },

        validations: {
            itemInstance: {
                agent: {
                    required,
                },
            }
        },

        mounted() {
            this.loadItem();
            this.loadAgentsOptions();
        },

        computed: {
            ...mapState('ccenter/teams/supervisors', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            agent: {
                get() {
                    return this.$store.state.ccenter.teams.supervisors.itemInstance.agent
                },
                set(value) {
                    this.setItemProp({prop: 'agent', value})
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
                const response = await getAgentsList(0, 10, search);
                this.dropdownAgentsList = response.list.map(item => {
                    return {
                        name: item.user.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/teams/supervisors', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
            }),
        }
    }
</script>

<style scoped>

</style>