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
                    {{dataList[props.rowIndex].minCapacity}} - {{dataList[props.rowIndex].maxCapacity}}
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
                :isNext="isNextPage"
                :isPrev="!!page"
        ></pagination>
    </section>
</template>

<script>
    import skillPopup from './opened-team-skills-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";
    import eventBus from '@/utils/eventBus';

    export default {
        name: "opened-team-skills",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {skillPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'capacity', title: this.$t('objects.ccenter.skills.capacity')},
                    {name: 'bucket', title: this.$tc('objects.ccenter.buckets.buckets', 1)},
                    _actionsTableField_2,
                ],
            }
        },

        watch: {
            parentId: function (value) {
                this.setParentId(value);
            }
        },

        mounted() {
            this.setParentId(this.parentId);
            this.loadDataList();
        },

        computed: {
            ...mapState('ccenter/teams', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/teams/skills', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.skills.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.skills.search},
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
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/teams/skills', {
                setParentId: 'SET_PARENT_ITEM_ID',
                setId: 'SET_ITEM_ID',
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

<style lang="scss" scoped>

</style>