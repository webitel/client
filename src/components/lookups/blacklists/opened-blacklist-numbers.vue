<template>
    <section>
        <number-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
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
        components: {
            numberPopup
        },
        data() {
            return {
                editedIndex: null,
                fields: [
                    _checkboxTableField,
                    {name: 'number', title: this.$tc('objects.lookups.blacklist.number', 1)},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_3,
                ],
            }
        },

        computed: {
            ...mapState('lookups/blacklists', {
                dataList: state => state.numberDataList,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.blacklists.numberSize
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.lookups.blacklists.numberSearch
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
                setId: 'SET_NUMBER_ITEM_ID',
                loadDataList: 'LOAD_NUMBER_DATA_LIST',
                setSize: 'SET_NUMBER_SIZE',
                setSearch: 'SET_NUMBER_SEARCH',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_NUMBER_ITEM',
                addParentItem: 'ADD_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>