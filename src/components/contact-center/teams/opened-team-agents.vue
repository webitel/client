<template>
    <section>

        <agent-buckets-popup
                v-if="destinationsPopupTriggerIf"
                @close="closePopup"
        ></agent-buckets-popup>

        <agent-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></agent-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.agents.agents', 2)}}</h3>
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
                <i
                        class="icon-action icon-icon_plus"
                        :title="$t('iconHints.add')"
                        @click="create"
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
                    {{dataList[props.rowIndex].agent.name}}
                </div>
            </template>

            <template slot="lvl" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].lvl}}
                </div>
            </template>

            <template slot="buckets" slot-scope="props">
                <div>
                    <span class="hidden-num"
                          @click="readBuckets(props.rowIndex)"
                    >+{{dataList[props.rowIndex].buckets.length}}</span>
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
                @loadDataList="loadList"
                @next="nextPage"
                @prev="prevPage"
                :isNext="isNextPage"
                :isPrev="!!page"
        ></pagination>
    </section>
</template>

<script>
    import agentPopup from './opened-team-agents-popup';
    import agentBucketsPopup from './opened-team-agents-buckets-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";
    import eventBus from '@/utils/eventBus';

    export default {
        name: "opened-team-agents",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {agentPopup, agentBucketsPopup},
        data() {
            return {
                destinationsPopupTriggerIf: null,
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'lvl', title: this.$t('objects.ccenter.teams.lvl')},
                    {name: 'buckets', title: this.$tc('objects.ccenter.buckets.buckets', 1), width: '160px'},
                    _actionsTableField_2,
                ],
            }
        },

        watch: {
            parentId: function (value) {
                this.setParentId(value);
            }
        },

        computed: {
            ...mapState('ccenter/teams', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/teams/agents', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.agents.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.agents.search},
                set(value) {this.setSearch(value)}
            }
        },

        methods: {
            async create() {
                if (!this.checkValidations()) {
                    if (!this.id) await this.addParentItem();
                    this.popupTriggerIf = true;
                } else {
                    eventBus.$emit('notificationError', 'Check your validations!');
                }
            },

            edit(rowIndex) {
                this.setId(this.dataList[rowIndex].id);
                this.popupTriggerIf = true;
            },


            readBuckets(rowIndex) {
                this.setBucketsId(this.dataList[rowIndex].id);
                this.destinationsPopupTriggerIf = true;
            },

            closePopup() {
                this.destinationsPopupTriggerIf = false;
                this.popupTriggerIf = false;
            },

            ...mapActions('ccenter/teams', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/teams/agents', {
                setBucketsId: 'SET_BUCKETS_ID',
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