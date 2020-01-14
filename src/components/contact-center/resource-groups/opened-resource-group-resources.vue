<template>
    <section>
        <res-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></res-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.res.res', 2)}}</h3>
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
                    {{dataList[props.rowIndex].resource.name}}
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
    import resPopup from './opened-resource-group-resource-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import eventBus from "../../../utils/eventBus";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-resource-group-resources",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {resPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$tc('objects.ccenter.res.numbers', 2)},
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
            ...mapState('ccenter/resGroups', {
                parentId: state => state.itemId,
            }),
            ...mapState('ccenter/resGroups/res', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.ccenter.resGroups.res.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.ccenter.resGroups.res.search
                },
                set(value) {
                    this.setSearch(value)
                }
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

            ...mapActions('ccenter/resGroups', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('ccenter/resGroups/res', {
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