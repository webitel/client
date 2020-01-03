<template>
    <section>
        <supervisor-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></supervisor-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.teams.supervisors', 2)}}</h3>
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
    import supervisorPopup from './opened-team-supervisors-popup';
    import eventBus from '@/utils/eventBus';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField,_actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-team-supervisors",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {supervisorPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$tc('objects.ccenter.teams.supervisors', 2)},
                    _actionsTableField_2,
                ],
            }
        },

        computed: {
            ...mapState('ccenter/teams', {
                dataList: state => state.supervisorDataList,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.supervisorSize},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.supervisorSearch},
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
                setId: 'SET_SUPERVISOR_ITEM_ID',
                loadDataList: 'LOAD_SUPERVISOR_DATA_LIST',
                setSize: 'SET_SUPERVISOR_SIZE',
                setSearch: 'SET_SUPERVISOR_SEARCH',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_SUPERVISOR_ITEM',
                addParentItem: 'ADD_ITEM',
            }),
        },
    }
</script>

<style lang="scss" scoped>
    .inline-dropdown {
        width: 226px;
    }
</style>