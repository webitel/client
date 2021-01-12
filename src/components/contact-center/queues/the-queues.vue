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
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                </div>
            </header>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >

                <template slot="name" slot-scope="props">
                    <div>
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

                <template slot="activeCalls" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].active}}
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

                <template slot="state" slot-scope="props">
                    <switcher
                            :value="dataList[props.rowIndex].enabled"
                            @input="patchProperty({index: props.rowIndex, prop: 'enabled', value: $event})"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_nav-directory"
                       :title="$t('iconHints.members')"
                       @click="openMembers(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       :title="$t('iconHints.edit')"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       :title="$t('iconHints.delete')"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_3, _switcherWidth } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import queuePopup from './create-queue-popup';

    export default {
        name: 'the-queues',
        mixins: [tableComponentMixin],
        components: { queuePopup },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'type', title: this.$t('objects.ccenter.queues.type') },
                    { name: 'activeCalls', title: this.$t('objects.ccenter.queues.activeCalls') },
                    { name: 'waiting', title: this.$t('objects.ccenter.queues.waiting') },
                    { name: 'priority', title: this.$t('objects.ccenter.queues.priority') },
                    { name: 'state', title: this.$t('objects.ccenter.queues.state'), _switcherWidth },
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/queues', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.ccenter.queues.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.ccenter.queues.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {
            openMembers(rowId) {
                this.$router.push({
                    name: 'cc-queue-members',
                    params: { queueId: this.dataList[rowId].id },
                });
            },

            computeQueueType(type) {
                switch (type) {
                    case 0:
                        return 'Offline Queue';
                    case 1:
                        return 'Inbound Queue';
                    case 2:
                        return 'Outbound IVR Queue';
                    case 3:
                        return 'Preview Dialer';
                    case 4:
                        return 'Progressive Dialer';
                    case 5:
                        return 'Predictive Dialer';
                    default:
                        return 'Unknown';
                }
            },

            computeOnlineText(state) {
                return state ? this.$t('objects.ccenter.queues.active')
                    : this.$t('objects.ccenter.queues.notActive');
            },

            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                let type;
                switch (this.dataList[rowId].type) {
                    case 0:
                        type = 'offline-queue';
                        break;
                    case 1:
                        type = 'inbound-queue';
                        break;
                    case 2:
                        type = 'outbound-ivr';
                        break;
                    case 3:
                        type = 'preview-dialer';
                        break;
                    case 4:
                        type = 'progressive-dialer';
                        break;
                    case 5:
                        type = 'predictive-dialer';
                        break;
                    default:
                        return 'Unknown';
                }
                this.$router.push({
                    name: `cc-queue-${type}-edit`,
                    params: { id: this.dataList[rowId].id },
                });
            },

            ...mapActions('ccenter/queues', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                patchProperty: 'PATCH_ITEM_PROPERTY',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    };
</script>
