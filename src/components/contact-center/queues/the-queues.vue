<template>
    <div>
        <object-header
                :primaryAction="() => {this.popupTriggerIf = true}"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.queues.queues', 2)}}
        </object-header>

        <queue-popup v-if="popupTriggerIf" @close="popupTriggerIf = false"></queue-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.queues.allQueues')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="type" slot-scope="props">
                    <div>
                        {{computeQueueType(filteredDataList[props.rowIndex].type)}}
                    </div>
                </template>

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': filteredDataList[props.rowIndex].state}"
                            :text=computeOnlineText(filteredDataList[props.rowIndex].state)
                    >
                    </status>
                </template>

                <template slot="activeCalls" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].activeCalls}}
                    </div>
                </template>

                <template slot="waiting" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].waiting}}
                    </div>
                </template>

                <template slot="priority" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].priority}}
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

            <pagination/>
        </section>
    </div>
</template>

<script>
    import queuePopup from './create-queue-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "the-queues",
        mixins: [tableComponentMixin],
        components: {queuePopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    {name: 'state', title: this.$t('objects.ccenter.queues.state')},
                    {name: 'activeCalls', title: this.$t('objects.ccenter.queues.activeCalls')},
                    {name: 'waiting', title: this.$t('objects.ccenter.queues.waiting')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                    _actionsTableField_2,
                ],
            };
        },

        methods: {
            computeQueueType(type) {
                return 'Outbound IVR'
            },

            computeOnlineText(state) {
                return state ? this.$t('objects.ccenter.queues.active') :
                    this.$t('objects.ccenter.queues.notActive');
            },

            create() {
                this.$router.push('/contact-center/queues/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-queue-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async deleteItem(deletedItem) {

            },

            async loadDataList() {
                // const response = await getResourceList(this.rowsPerPage);
                // this.dataList = [...response];
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: 'queue name',
                        type: 0,
                        state: !!(i % 2),
                        activeCalls: i * 3,
                        waiting: i*33,
                        priority: 'High',
                        isSelected: false,
                    });
                }
                this.filterData();
            }
        },

    }
</script>