<template>
    <section>
        <agent-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></agent-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.agents.agents', 2)}}</h3>
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
                <i class="icon-action icon-icon_plus" @click="create"></i>
            </div>
        </header>

        <vuetable
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

            <template slot="bucket" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].bucket.name}}
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
        ></pagination>
    </section>
</template>

<script>
    import openedTeamAgentsPopup from './opened-team-agents-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";
    import eventBus from '@/utils/eventBus';

    export default {
        name: "opened-team-agents",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {
            'agent-popup': openedTeamAgentsPopup
        },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'lvl', title: this.$t('objects.ccenter.teams.lvl')},
                    {name: 'bucket', title: this.$tc('objects.ccenter.buckets.buckets', 1)},
                    _actionsTableField_2,
                ],
            }
        },

        computed: {
            ...mapState('ccenter/teams', {
                dataList: state => state.agentDataList,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.agentSize},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.agentSearch},
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

            ...mapActions('ccenter/teams', {
                setId: 'SET_AGENT_ITEM_ID',
                loadDataList: 'LOAD_AGENT_DATA_LIST',
                setSize: 'SET_AGENT_SIZE',
                setSearch: 'SET_AGENT_SEARCH',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_AGENT_ITEM',
                addParentItem: 'ADD_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>
</style>