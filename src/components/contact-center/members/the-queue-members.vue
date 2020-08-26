<template>
    <div>
        <object-header
                :primaryAction="create"
                close
        >
            {{$tc('objects.ccenter.queues.queues', 1)}} |
            {{$tc('objects.ccenter.members.members', 2)}}
        </object-header>

        <destinations-popup
                v-if="destinationsPopupTriggerIf"
                @close="closePopup"
        ></destinations-popup>

        <upload-popup
                v-if="popupTriggerIf"
                :file="csvFile"
                @close="closeCSVPopup"
        ></upload-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.members.allMembers')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadDataList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <div
                            class="upload-csv"
                            :title="$t('iconHints.upload')"
                    >
                        <i
                                class="icon-icon_upload icon-action"
                        ></i>
                        <input
                                ref="file-input"
                                class="upload-csv__input"
                                type="file"
                                @change="processCSV($event)"
                                accept=".csv"
                        >
                    </div>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadDataList"
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
                <template slot="createdAt" slot-scope="props">
                    <div>
                        {{computeCreatedDate(dataList[props.rowIndex].createdAt)}}
                    </div>
                </template>
                <template slot="name" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].name}}
                    </div>
                </template>
                <template slot="priority" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].priority}}
                    </div>
                </template>
                <template slot="endCause" slot-scope="props">
                    <div>
                        {{computeStopCause(dataList[props.rowIndex].stopCause)}}
                    </div>
                </template>
                <template slot="destination" slot-scope="props">
                    <div class="d-flex justify-content-between">
                        {{dataList[props.rowIndex].communications[0].destination}}
                        <span class="hidden-num"
                              v-if="dataList[props.rowIndex].communications.length > 1"
                              @click="readDestinations(props.rowIndex)"
                        >+{{dataList[props.rowIndex].communications.length-1}}</span>
                    </div>
                </template>
                <template slot="type" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].type}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
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
                    @loadDataList="loadDataList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="!!isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import destinationsPopup from './opened-queue-member-destinations-popup';
    import uploadPopup from './upload-members-popup';

    export default {
        name: 'the-queue-members',
        mixins: [tableComponentMixin],
        components: { uploadPopup, destinationsPopup },
        data() {
            return {
                destinationsPopupTriggerIf: null,
                fields: [
                    _checkboxTableField,
                    { name: 'createdAt', title: this.$t('objects.createdAt') },
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'priority', title: this.$t('objects.ccenter.queues.priority') },
                    { name: 'endCause', title: this.$t('objects.ccenter.queues.endCause') },
                    { name: 'destination', title: this.$tc('objects.ccenter.queues.destination', 1), width: '160px' },
                    _actionsTableField_2,
                ],
                csvFile: null,
            };
        },

        mounted() {
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                parentId: (state) => state.parentId,
                dataList: (state) => state.dataList,
                page: (state) => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.ccenter.queues.members.size || '10'; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.ccenter.queues.members.search || ''; },
                set(value) { this.setSearch(value); },
            },

            parentId() { return this.$route.params.queueId; },
        },

        methods: {
            computeStopCause(cause) {
                switch (cause) {
                    case 'SYSTEM_SHUTDOWN': return this.$t('objects.ccenter.members.endCause.sysShutdown');
                    case 'DATABASE_ERROR': return this.$t('objects.ccenter.members.endCause.dbError');
                    case 'ABANDONED': return this.$t('objects.ccenter.members.endCause.abandoned');
                    case 'TIMEOUT': return this.$t('objects.ccenter.members.endCause.timeout');
                    case 'CANCEL': return this.$t('objects.ccenter.members.endCause.cancel');
                    case 'SUCCESSFUL': return this.$t('objects.ccenter.members.endCause.successful');
                    case 'QUEUE_NOT_IMPLEMENT': return this.$t('objects.ccenter.members.endCause.queueNotImplement');
                    default: return this.$t('objects.ccenter.members.endCause.unknown');
                }
            },

            computeCreatedDate(createdAt) {
                return new Date(+createdAt).toLocaleDateString();
            },

            readDestinations(rowIndex) {
                this.setDestinationId(this.dataList[rowIndex].id);
                this.destinationsPopupTriggerIf = true;
            },

            closePopup() {
                this.destinationsPopupTriggerIf = false;
            },

            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.csvFile = file;
                    this.popupTriggerIf = true;
                }
            },

            closeCSVPopup() {
                this.loadList();
                this.popupTriggerIf = false;
                this.$refs['file-input'].value = null;
            },

            create() {
                this.$router.push({
                    name: 'cc-queue-member-new',
                    params: { queueId: this.parentId },
                });
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-queue-member-edit',
                    params: { queueId: this.parentId, id: this.dataList[rowId].id },
                });
            },

            async remove(rowIndex, items) {
                if (items) {
                    let indexs = [];
                    let ids = []
                    for (const item of items) {
                        indexs.push(this.dataList.indexOf(item));
                        ids.push(item.id);
                    }
                    await this.removeItems({indexs, ids}); 
                } else {    
                    await this.removeItem(rowIndex);               
                }
                this.loadList();
            },

            ...mapActions('ccenter/queues/members', {
                setDestinationId: 'SET_DESTINATION_ID',
                setParentId: 'SET_PARENT_ITEM_ID',
                setId: 'SET_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
                removeItems: 'REMOVE_ITEMS',
            }),

        },
    };
</script>

<style lang="scss" scoped>
    .hidden-num {
        @extend .typo-body-md;

        margin-left: 33px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
