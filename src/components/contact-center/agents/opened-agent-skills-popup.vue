<template>
    <popup
            :title="$t('objects.ccenter.agents.addSkill')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
    >
        <form>
            <dropdown-select
                    v-model="skill"
                    :v="$v.itemInstance.skill"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.ccenter.skills.skills', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="capacity"
                    :label="$t('objects.ccenter.skills.capacity')"
                    :v="$v.itemInstance.capacity"
                    required
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";
    import {getSkillsList} from "../../../api/contact-center/agentSkills/agentSkills";
    import {getUsersList} from "../../../api/directory/users/users";

    export default {
        name: "opened-agent-skills-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },
        data() {
            return {}
        },

        validations: {
            itemInstance: {
                skill: {
                    required,
                },
                capacity: {
                    numeric,
                    minValue: minValue(0),
                    maxValue: maxValue(100),
                    required
                }
            }
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('ccenter/agents/skills', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            skill: {
                get() {
                    return this.$store.state.ccenter.agents.skills.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            capacity: {
                get() {
                    return this.$store.state.ccenter.agents.skills.itemInstance.capacity
                },
                set(value) {
                    this.setItemProp({prop: 'capacity', value})
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
                    } catch {
                    }
                }
            },

            async loadDropdownOptionsList(search) {
                const response = await getSkillsList(0, 10, search);
                this.dropdownOptionsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/agents/skills', {
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