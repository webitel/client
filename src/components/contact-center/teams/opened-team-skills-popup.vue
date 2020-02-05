<template>
    <popup
            :title="$tc('objects.ccenter.skills.skills', 1)"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <dropdown-select
                    v-model="skill"
                    :v="$v.itemInstance.skill"
                    :options="dropdownSkillsList"
                    :label="$tc('objects.ccenter.skills.skills', 1)"
                    @search="loadSkillsOptions"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="lvl"
                    :v="$v.itemInstance.lvl"
                    :label="$t('objects.ccenter.teams.lvl')"
                    required
            ></form-input>

            <div class="label">{{$t('objects.ccenter.skills.capacity')}}*</div>
            <div class="input-row-wrap">
                <form-input
                        v-model.trim="minCapacity"
                        :label="$t('objects.from')"
                ></form-input>
                <form-input
                        v-model.trim="maxCapacity"
                        :label="$t('objects.to')"
                ></form-input>
            </div>

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
    import {getBucketsList} from "../../../api/contact-center/buckets/buckets";
    import {getSkillsList} from "../../../api/contact-center/agentSkills/agentSkills";

    export default {
        name: "opened-team-skills-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },

        data() {
            return {
                dropdownSkillsList: [],
                dropdownBucketsList: [],
            }
        },

        validations: {
            itemInstance: {
                skill: {
                    required,
                },
                lvl: {
                    required,
                },
            }
        },

        mounted() {
            this.loadItem();
            this.loadSkillsOptions();
            this.loadBucketsOptions();
        },

        computed: {
            ...mapState('ccenter/teams/skills', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            skill: {
                get() {
                    return this.$store.state.ccenter.teams.skills.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            lvl: {
                get() {
                    return this.$store.state.ccenter.teams.skills.itemInstance.lvl
                },
                set(value) {
                    this.setItemProp({prop: 'lvl', value})
                }
            },
            minCapacity: {
                get() {
                    return this.$store.state.ccenter.teams.skills.itemInstance.minCapacity
                },
                set(value) {
                    this.setItemProp({prop: 'minCapacity', value})
                }
            },
            maxCapacity: {
                get() {
                    return this.$store.state.ccenter.teams.skills.itemInstance.maxCapacity
                },
                set(value) {
                    this.setItemProp({prop: 'maxCapacity', value})
                }
            },
            bucket: {
                get() {
                    return this.$store.state.ccenter.teams.skills.itemInstance.bucket
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
                        console.log('closing?');
                        this.$emit('close');
                    } catch {}
                }
            },

            async loadSkillsOptions(search) {
                const response = await getSkillsList(0, 10, search);
                this.dropdownSkillsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            async loadBucketsOptions(search) {
                const response = await getBucketsList(0, 10, search);
                this.dropdownBucketsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/teams/skills', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
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