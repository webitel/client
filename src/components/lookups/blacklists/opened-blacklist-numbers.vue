<template>
    <section>
        <number-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></number-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.lookups.blacklist.number', 2)}}</h3>
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
                <i class="icon-action icon-icon_upload"></i>
                <i
                        class="icon-icon_nav-integrations icon-action"
                        @click="loadDataList"
                ></i>
                <i class="icon-action icon-icon_plus" @click="create"></i>
            </div>
        </header>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="number" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].number}}
                </div>
            </template>

            <template slot="description" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].description}}
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
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import numberPopup from './opened-blacklist-number-popup';
    import {mapActions, mapState} from "vuex";
    import eventBus from "../../../utils/eventBus";

    export default {
        name: "opened-blacklist-numbers",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: {numberPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'number', title: this.$tc('objects.lookups.blacklist.number', 1)},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_3,
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
            ...mapState('lookups/blacklists', {
                parentId: state => state.itemId,
            }),
            ...mapState('lookups/blacklists/numbers', {
                dataList: state => state.dataList,
                page: state => state.page,
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.blacklists.numbers.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.lookups.blacklists.numbers.search
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

            ...mapActions('lookups/blacklists', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('lookups/blacklists/numbers', {
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