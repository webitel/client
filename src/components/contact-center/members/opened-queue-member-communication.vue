<template>
    <section>
        <communication-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></communication-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.lookups.communications.communications', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <i
                        class="icon-icon_delete icon-action"
                        :class="{'hidden': anySelected}"
                        @click="deleteSelected"
                ></i>
                <i class="icon-action icon-icon_plus" @click="create"></i>
            </div>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="destination" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].destination}}
                </div>
            </template>

            <template slot="state" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].state}}
                </div>
            </template>

            <template slot="attempts" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].attempts}}
                </div>
            </template>

            <template slot="type" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].type}}
                </div>
            </template>

            <template slot="priority" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].priority}}
                </div>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_edit"
                   @click="edit(props.rowIndex)"
                ></i>
                <i class="vuetable-action icon-icon_delete"
                   @click="remove(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
    </section>
</template>

<script>
    import communicationPopup from './opened-queue-member-communication-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import eventBus from "../../../utils/eventBus";
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-queue-member-communication",
        mixins: [tableComponentMixin, openedTabComponentMixin],
        components: {communicationPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'destination', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                    _actionsTableField_2,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                dataList: state => state.itemInstance.communications,
            }),
        },

        methods: {
            async create() {
                if (!this.checkValidations()) {
                    this.popupTriggerIf = true;
                } else {
                    eventBus.$emit('notificationError', 'Check your validations!');
                }
            },

            closePopup() {
                this.setEditedIndex(0);
                this.popupTriggerIf = false;
            },

            edit(rowIndex) {
                this.setEditedIndex(rowIndex);
                this.popupTriggerIf = true;
            },

            ...mapActions('ccenter/queues/members', {
                setEditedIndex: 'SET_EDITED_COMMUNICATION_INDEX',
                removeItem: 'REMOVE_COMMUNICATION_ITEM',
            }),

            loadDataList() {},
        }
    }
</script>

<style lang="scss" scoped>

</style>