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
                v-if="popupTriggerIf"
                @close="closePopup"
        ></destinations-popup>

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
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

            <vuetable
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
                        {{dataList[props.rowIndex].priority}}
                    </div>
                </template>
                <template slot="endCause" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].endCause}}
                    </div>
                </template>
                <template slot="destination" slot-scope="props">
                    <div class="d-flex justify-content-between">
                        {{dataList[props.rowIndex].communications[0].destination}}
                        <span class="hidden-num"
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
    import destinationsPopup from './opened-queue-member-destinations-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-queue-members",
        mixins: [tableComponentMixin],
        components: {destinationsPopup},
        data() {
            return {
                destinationsPopupData: null,
                fields: [
                    _checkboxTableField,
                    {name: 'createdAt', title: this.$t('objects.createdAt')},
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                    {name: 'endCause', title: this.$t('objects.ccenter.queues.endCause')},
                    {name: 'destination', title: this.$tc('objects.ccenter.queues.destination', 1), width: '160px'},
                    _actionsTableField_2,
                ],
            };
        },

        mounted() {
            this.setParentId(this.$route.params.queueId);
            this.loadDataList();
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                parentId: state => state.parentId,
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.queues.members.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.queues.members.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            readDestinations(rowIndex) {
                this.setDestinationId(this.dataList[rowIndex].id);
                this.popupTriggerIf = true;
            },

            closePopup() {
                this.popupTriggerIf = false;
            },

            create() {
                this.$router.push({
                    name: 'cc-queue-member-new',
                    params: {queueId: this.parentId},
                });
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-queue-member-edit',
                    params: {queueId: this.parentId, id: this.dataList[rowId].id},
                });
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
            }),

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