<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.members.members', 1)}} |
            {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedQueueMemberGeneral from './opened-queue-member-general';
    import openedQueueMemberCommunication from './opened-queue-member-communication';
    import openedQueueMemberVariables from './opened-queue-member-variables';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {mapActions, mapState} from "vuex";
    import {requiredArrayValue} from "../../../utils/validators";
    import required from "vuelidate/src/validators/required";

    export default {
        name: "opened-queue-member",
        mixins: [editComponentMixin],
        components: {
            openedQueueMemberGeneral,
            openedQueueMemberCommunication,
            openedQueueMemberVariables,
        },

        data() {
            return {
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.lookups.communications.communications', 1),
                        value: 'communication',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.variables', 2),
                        value: 'variables',
                    },
                ],
            }
        },

        validations: {
            itemInstance: {
                name: {
                    required
                },
                communications: {
                    requiredArrayValue
                }
            }
        },

        mounted() {
            this.setParentId(this.$route.params.queueId);
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.queues.members.itemId},
                set(value) {this.setId(value)}
            },
        },

        methods: {
            ...mapActions('ccenter/queues/members', {
                setParentId: 'SET_PARENT_ITEM_ID',
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    }
</script>

<style scoped>

</style>