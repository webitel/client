<template>
    <popup
            :title="$tc('objects.ccenter.agents.agents', 1)"
            :primaryBtnAction="addItem"
            @close="$emit('close')">
        <form>
            <dropdown-select
                    v-model="itemInstance.agent"
                    :v="$v.itemInstance.agent"
                    :options="[]"
                    :label="$tc('objects.ccenter.agents.agents', 1)"
                    :placeholder="$tc('objects.ccenter.agents.agents', 1)"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="$v.itemInstance.level"
                    :label="$t('objects.ccenter.teams.level')"
                    :placeholder="$t('objects.ccenter.teams.level')"
                    :v="$v.itemInstance.capacity"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.bucket"
                    :options="[]"
                    :label="$tc('objects.ccenter.buckets.buckets', 1)"
                    :placeholder="$tc('objects.ccenter.buckets.buckets', 1)"
            ></dropdown-select>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators';

    export default {
        name: "opened-team-agents-popup",
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
                    agent: {
                        name: 'agent name'
                    },
                    level: 10,
                    bucket: {
                        name: 'Bucket name'
                    }
                }
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
            if (this.value) this.itemInstance = this.value;
        },

        methods: {
            addItem() {
                this.$emit('addItem', this.itemInstance);
            }
        }
    }
</script>

<style scoped>

</style>