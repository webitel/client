<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.queues.queues', 2)}}
        </object-header>

        <queue-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></queue-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.queues.allQueues')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadDataList"
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
                    :data="dataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="type" slot-scope="props">
                    <div>
                        {{computeQueueType(dataList[props.rowIndex].type)}}
                    </div>
                </template>

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': dataList[props.rowIndex].state}"
                            :text=computeOnlineText(dataList[props.rowIndex].state)
                    >
                    </status>
                </template>

                <template slot="activeCalls" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].activeCalls}}
                    </div>
                </template>

                <template slot="waiting" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].waiting}}
                    </div>
                </template>

                <template slot="priority" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].priority}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_nav-directory"
                       @click="openMembers(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-model="size"
                    @loadDataList="loadDataList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import queuePopup from './create-queue-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

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
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/queues', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.queues.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.queues.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            openMembers(rowId) {
                this.$router.push({
                    name: 'cc-queue-members',
                    params: {queueId: this.dataList[rowId].id},
                });
            },

            computeQueueType(type) {
                return 'Outbound IVR'
            },

            computeOnlineText(state) {
                return state ? this.$t('objects.ccenter.queues.active') :
                    this.$t('objects.ccenter.queues.notActive');
            },

            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-queue-outbound-ivr-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('ccenter/queues', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    }
</script>