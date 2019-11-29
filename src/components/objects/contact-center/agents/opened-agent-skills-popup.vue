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
                    v-model.trim="$v.itemInstance.capacity.from.$model"
                    :label="$t('objects.ccenter.skills.capacity')"
                    :placeholder="$t('objects.ccenter.skills.capacity')"
                    :v="$v.itemInstance.capacity.from"
                    required
            ></form-input>

            <form-input
                    v-model.trim="$v.itemInstance.capacity.to.$model"
                    :label="$t('objects.ccenter.skills.capacity')"
                    :placeholder="$t('objects.ccenter.skills.capacity')"
                    :v="$v.itemInstance.capacity.to"
                    required
            ></form-input>

            <form-input
                    v-model.trim="$v.itemInstance.level.$model"
                    :label="$t('objects.ccenter.skills.capacity')"
                    :placeholder="$t('objects.ccenter.skills.capacity')"
                    :v="$v.itemInstance.level"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.bucket"
                    :v="$v.itemInstance.bucket"
                    :options="[]"
                    :label="$t('objects.ccenter.teams.bucket')"
                    :placeholder="$t('objects.ccenter.teams.bucket')"
                    required
            ></dropdown-select>
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
                    capacity: {
                        from: 10,
                        to: 12,
                    },
                    bucket: {
                        name: 'Bucket name'
                    }
                }
            }
        },

        validations: {
            itemInstance: {
                skill: {
                    required,
                },
                capacity: {
                    from: {
                        numeric,
                        minValue: minValue(0),
                        maxValue: maxValue(100),
                        required
                    },
                    to: {
                        numeric,
                        minValue: minValue(0),
                        maxValue: maxValue(100),
                        required
                    },
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