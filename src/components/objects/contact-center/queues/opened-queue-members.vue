<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.queues.members', 2)}}</h3>
            <i
                    class="icon-icon_delete icon-action"
                    :class="{'hidden': anySelected}"
                    @click="deleteSelected"
            ></i>
            <i class="icon-action icon-icon_plus" @click="() => {this.popupTriggerIf = true}"></i>
        </header>

        <destinations-popup
                v-show="destinationsPopupData"
                :destinations="destinationsPopupData"
                @close="closeDestinationsPopup"
        >
        </destinations-popup>

        <member-popup
                v-if="popupTriggerIf"
                @addItem="addItem"
                @close="popupTriggerIf = false"
        ></member-popup>

        <vuetable
                ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="createdAt" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].createdAt}}
                </div>
            </template>
            <template slot="name" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].name}}
                </div>
            </template>
            <template slot="priority" slot-scope="props">
                <div>
                    {{computePriority(dataList[props.rowIndex].priority)}}
                </div>
            </template>
            <template slot="endCause" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].endCause}}
                </div>
            </template>
            <template slot="destination" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].destination}}
                    <span class="hidden-num" @click="openDestinationsPopup(props.rowIndex)">+11</span>
                </div>
            </template>
            <template slot="type" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].type}}
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
        <pagination></pagination>
    </section>
</template>

<script>
    import destinationsPopup from './opened-queue-destinations-popup';
    import memberPopup from './opened-queue-member-popup/opened-queue-member-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-members",
        mixins: [tableComponentMixin, openedTabComponentMixin],
        components: {destinationsPopup, memberPopup},
        data() {
            return {
                destinationsPopupData: null,
                fields: [
                    _checkboxTableField,
                    {name: 'createdAt', title: this.$t('objects.createdAt')},
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                    {name: 'endCause', title: this.$t('objects.ccenter.queues.endCause')},
                    {name: 'destination', title: this.$tc('objects.ccenter.queues.destination', 1)},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    _actionsTableField_2,
                ],
            };
        },

        methods: {
            openDestinationsPopup(rowIndex) {
                this.destinationsPopupData = this.dataList[rowIndex].destination;
            },
            closeDestinationsPopup(rowIndex) {
                this.destinationsPopupData = null;
            },

            computePriority(priority) {
                return 'High'
            },

            addItem(item) {
                this.popupTriggerIf = false;
                this.dataList.push({
                    createdAt: (new Date(Date.now())+'').slice(0, 15),
                    name: 'Member',
                    priority: 0,
                    endCause: 'End cause',
                    destination: '8 800 555 3434',
                    type: 'Type',
                    isSelected: false
                });
            },

            remove(rowIndex) {
                this.dataList.splice(rowIndex, 1);
            },

            loadDataList() {
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        id: i,
                        createdAt: (new Date(Date.now())+'').slice(0, 15),
                        name: 'Member',
                        priority: 0,
                        endCause: 'End cause',
                        destination: '8 800 555 3434',
                        type: 'Type ' + i,
                        isSelected: false
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hidden-num {
        @extend .typo-body-md;

        margin-left: 33px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>