<template>
    <section>
        <number-popup
                v-if="popupTriggerIf"
                @close="closePopup"
        ></number-popup>

        <upload-popup
                v-if="uploadPopupTriggerIf"
                :file="csvFile"
                @close="closeCSVPopup"
        ></upload-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.lookups.blacklist.number', 2)}}</h3>
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
                <div
                        class="upload-csv"
                        :title="$t('iconHints.upload')"
                >
                    <i
                            class="icon-icon_upload icon-action"
                    ></i>
                    <input
                            ref="file-input"
                            class="upload-csv__input"
                            type="file"
                            @change="processCSV($event)"
                            accept=".csv"
                    >
                </div>
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
                :page="page"
        ></pagination>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_3 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import numberPopup from './opened-blacklist-number-popup';
    import uploadPopup from './upload-blacklist-numbers-popup';
    import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

    export default {
        name: 'opened-blacklist-numbers',
        mixins: [openedTabComponentMixin, tableComponentMixin],
        components: { numberPopup, uploadPopup },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'number', title: this.$tc('objects.lookups.blacklist.number', 1) },
                    { name: 'description', title: this.$t('objects.description') },
                    _actionsTableField_3,
                ],
                uploadPopupTriggerIf: false,
                csvFile: null,
            };
        },

        watch: {
            parentId(value) {
                this.setParentId(value);
            },
        },

        computed: {
            ...mapState('lookups/blacklists', {
                parentId: (state) => state.itemId,
            }),
            ...mapState('lookups/blacklists/numbers', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.blacklists.numbers.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.lookups.blacklists.numbers.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
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

            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.csvFile = file;
                    this.uploadPopupTriggerIf = true;
                }
            },

            closeCSVPopup() {
                this.loadDataList();
                this.uploadPopupTriggerIf = false;
                this.$refs['file-input'].value = null;
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
        },
    };
</script>

<style lang="scss" scoped>

</style>
