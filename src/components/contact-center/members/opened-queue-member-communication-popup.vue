<template>
    <popup
            :title="$t('objects.lookups.communications.addCommunication')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form class="object-input-grid">
            <form-input
                    v-model="destination"
                    :v="$v.itemInstance.destination"
                    :label="$t('objects.ccenter.members.destination')"
                    required
            ></form-input>

            <form-input
                    v-model="display"
                    :label="$t('objects.ccenter.members.display')"
            ></form-input>

            <form-input
                    v-model="priority"
                    :label="$t('objects.ccenter.members.priority')"
            ></form-input>

            <dropdown-select
                    v-model.trim="type"
                    :v="$v.itemInstance.type"
                    :options="dropdownOptionsTypeList"
                    :label="$tc('objects.lookups.communications.communications', 1)"
                    @search="loadDropdownOptionsTypeList"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model.trim="resource"
                    :options="dropdownOptionsResList"
                    :label="$tc('objects.ccenter.res.res', 1)"
                    @search="loadDropdownOptionsResList"
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
                dropdownOptionsTypeList: [],
                dropdownOptionsResList: [],
            }
        },

        validations: {
            itemInstance: {
                destination: {
                    required
                },
                type: {
                    required
                },
            }
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsTypeList();
            this.loadDropdownOptionsResList();
        },

        computed: {
            ...mapState('ccenter/queues/members/communications', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            destination: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.destination
                },
                set(value) {
                    this.setItemProp({prop: 'destination', value})
                }
            },
            display: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.display
                },
                set(value) {
                    this.setItemProp({prop: 'display', value})
                }
            },
            priority: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.priority
                },
                set(value) {
                    this.setItemProp({prop: 'priority', value})
                }
            },
            type: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.type
                },
                set(value) {
                    this.setItemProp({prop: 'type', value})
                }
            },
            resource: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.resource
                },
                set(value) {
                    this.setItemProp({prop: 'resource', value})
                }
            },
            description: {
                get() {
                    return this.$store.state.ccenter.queues.members.communications.itemInstance.description
                },
                set(value) {
                    this.setItemProp({prop: 'description', value})
                }
            },

                computePrimaryText() {
                    // if it's a new item
                    // OR any fields have changed
                    return !(typeof this.id === 'number') || this.itemInstance._dirty ?
                        this.$t('objects.save') : this.$t('objects.saved');
                },

                computeDisabled() {
                    // if there's a validation problem
                    // OR it's edit and any fields haven't changed
                    return this.checkValidations() ||
                        (!this.itemInstance._dirty && (typeof this.id === 'number'));
                },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                // console.log(!invalid, !(typeof this.id === 'number'));
                if (!invalid) {
                    try {
                        !(typeof this.id === 'number') ? await this.addItem() : await this.updateItem();
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

            ...mapActions('ccenter/queues/members/communications', {
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