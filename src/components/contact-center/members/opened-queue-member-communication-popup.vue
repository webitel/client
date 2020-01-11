<template>
    <popup
            :title="$t('objects.ccenter.communications.addCommunication')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <form-input
                    v-model="destination"
                    :v="$v.itemInstance.destination"
                    :label="$t('objects.ccenter.members.destination')"
                    required
            ></form-input>

            <form-input
                    v-model="display"
                    :label="$t('objects.ccenter.members.display')"
                    required
            ></form-input>

            <form-input
                    v-model="priority"
                    :label="$t('objects.ccenter.members.priority')"
                    required
            ></form-input>

            <dropdown-select
                    v-model.trim="type"
                    :options="dropdownOptionsTypeList"
                    :label="$t('objects.ccenter.skills.capacity')"
                    @search="loadDropdownOptionsTypeList"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model.trim="resource"
                    :options="dropdownOptionsResList"
                    :label="$t('objects.ccenter.skills.capacity')"
                    @search="loadDropdownOptionsResList"
                    required
            ></dropdown-select>

            <form-input
                    v-model="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";
    import {getResourceList} from "../../../api/contact-center/resources/resources";
    import {getCommunicationsList} from "../../../api/lookups/communications/communications";

    export default {
        name: "opened-agent-skills-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },
        data() {
            return {
                itemInstance: {
                    destination: '8 800 555 3535',
                    display: '5656',
                    priority: 0,
                    type: {},
                    resource: {},
                    description: '',
                },

                dropdownOptionsTypeList: [],
                dropdownOptionsResList: [],
            }
        },

        validations: {
            itemInstance: {}
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsTypeList();
            this.loadDropdownOptionsResList();
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                editedIndex: state => state.editedIndex,
                itemInstance: state => state.itemInstance.communications[this.editedIndex]
            }),
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
                }
            },
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.itemInstance.skill
                },
                set(value) {
                    this.setItemProp({prop: 'skill', value})
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

            async loadDropdownOptionsTypeList(search) {
                const response = await getCommunicationsList(0, 10, search);
                this.dropdownOptionsTypeList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            async loadDropdownOptionsResList(search) {
                const response = await getResourceList(0, 10, search);
                this.dropdownOptionsResList = response.map(item => {
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