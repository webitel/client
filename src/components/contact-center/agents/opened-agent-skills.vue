<template>
    <section>
        <skill-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></skill-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.skills.skills', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <search
                        v-model="search"
                        @filterData="loadList"
                ></search>
                <i
                        class="icon-icon_delete icon-action"
                        :class="{'hidden': anySelected}"
                        @click="deleteSelected"
                ></i>
                <i
                        class="icon-icon_reload icon-action"
                        @click="loadList"
                ></i>
                <i class="icon-action icon-icon_plus" @click="create"></i>
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
                    {{dataList[props.rowIndex].skill.name}}
                </div>
            </template>

            <template slot="capacity" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].capacity}}
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
    import openedAgentSkillsPopup from './opened-agent-skills-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";
    import eventBus from "../../../utils/eventBus";

    export default {
        name: "opened-agent-skills",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {
            'skill-popup': openedAgentSkillsPopup
        },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$tc('objects.ccenter.skills.skills', 2)},
                    {name: 'capacity', title: this.$t('objects.ccenter.skills.capacity')},
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
            ...mapState('ccenter/agents', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/agents/skills', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.agents.skills.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.agents.skills.search},
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

            ...mapActions('ccenter/agents', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/agents/skills', {
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

</style>