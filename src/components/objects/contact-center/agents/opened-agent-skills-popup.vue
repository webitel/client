<template>
    <popup
            :title="$t('objects.ccenter.agents.addSkill')"
            :primaryBtnAction="addSkill"
            @close="$emit('close')">
        <form>
            <dropdown-select
                    v-model="itemInstance.skill.name"
                    :v="$v.itemInstance.skill.name"
                    :options="[]"
                    :label="$tc('objects.ccenter.skills.skills', 1)"
                    :placeholder="$tc('objects.ccenter.skills.skills', 1)"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="$v.itemInstance.capacity.$model"
                    :label="$t('objects.ccenter.agents.skillCapacity')"
                    :placeholder="$t('objects.ccenter.agents.skillCapacity')"
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

    export default {
        name: "opened-agent-skills-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },
        props: {
            value: {
                type: Object,
            },
        },
        data() {
            return {
                itemInstance: {
                    skill: {
                        name: 'Skillname'
                    },
                    capacity: 10
                }
            }
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
            if (this.value) this.itemInstance = this.value;
        },

        methods: {
            addSkill() {
                this.$emit('addItem', this.itemInstance);
            }
        }
    }
</script>

<style scoped>

</style>