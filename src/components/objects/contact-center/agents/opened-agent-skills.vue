<template>
    <section>
        <skill-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></skill-popup>

        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
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
                v-model="size"
                @loadDataList="loadDataList"
                @next="nextPage"
                @prev="prevPage"
        ></pagination>
    </section>
</template>

<script>
    import openedAgentSkillsPopup from './opened-agent-skills-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";
    import eventBus from "../../../../utils/eventBus";

    export default {
        name: "opened-agent-skills",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {
            'skill-popup': openedAgentSkillsPopup
        },
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$tc('objects.ccenter.skills.skills', 2)},
                    {name: 'capacity', title: this.$t('objects.ccenter.skills.capacity')},
                    _actionsTableField_2,
                ],
            }
        },

        computed: {
            ...mapState('ccenter/agents', {
                dataList: state => state.skillDataList,
            }),

            size: {
                get() {return this.$store.state.ccenter.agents.skillSize},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.agents.skillSearch},
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
                setId: 'SET_SKILL_ITEM_ID',
                loadDataList: 'LOAD_SKILL_DATA_LIST',
                setSize: 'SET_SKILL_SIZE',
                setSearch: 'SET_SKILL_SEARCH',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_SKILL_ITEM',
                addParentItem: 'ADD_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>