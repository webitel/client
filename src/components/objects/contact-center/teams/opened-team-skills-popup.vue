<template>
    <popup
            :title="$tc('objects.ccenter.skills.skills', 1)"
            :primaryBtnAction="addItem"
            @close="$emit('close')">
        <form>
            <dropdown-select
                    v-model="itemInstance.skill"
                    :v="$v.itemInstance.skill"
                    :options="[]"
                    :label="$tc('objects.ccenter.skills.skills', 1)"
                    :placeholder="$tc('objects.ccenter.skills.skills', 1)"
                    required
            ></dropdown-select>

            <div class="label">{{$t('objects.ccenter.skills.capacity')}}*</div>
            <div class="input-row-wrap">
                <form-input
                        v-model.trim="itemInstance.capacity[0]"
                        :label="$t('objects.from')"
                        :placeholder="$t('objects.from')"
                ></form-input>
                <form-input
                        v-model.trim="itemInstance.capacity[1]"
                        :label="$t('objects.to')"
                        :placeholder="$t('objects.to')"
                ></form-input>
            </div>

            <form-input
                    v-model.trim="$v.itemInstance.level"
                    :label="$t('objects.ccenter.teams.level')"
                    :placeholder="$t('objects.ccenter.teams.level')"
                    :v="$v.itemInstance.level"
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
        name: "opened-team-skills-popup",
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
                    level: 10,
                    capacity: [0, 10],
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