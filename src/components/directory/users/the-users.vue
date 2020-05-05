<template>
    <div class="content-wrap">
        <object-header
                :primary-action="create"
        >
            {{$t('objects.directory.directory')}} |
            {{$tc('objects.directory.users.users', 2)}}
        </object-header>

        <upload-popup
                v-if="popupTriggerIf"
                :file="csvFile"
                @close="closeCSVPopup"
        ></upload-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.directory.users.allUsers')}}</h3>
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
                                class="icon-action icon-icon_upload"
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
                            class="icon-action icon-icon_reload"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
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
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="username" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].username}}
                    </div>
                </template>

                <template slot="extensions" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].extension}}
                    </div>
                </template>

                <template slot="DnD" slot-scope="props">
                    <switcher
                            :value="getDND(dataList[props.rowIndex].presence)"
                            @input="toggleSwitchProperty({index: props.rowIndex, prop: 'dnd', value: $event})"
                    ></switcher>
                </template>

                <template slot="status" slot-scope="props">
                    <dropdown-select
                            class="inline-dropdown inline-dropdown__options-right"
                            :value="getStatus(dataList[props.rowIndex].presence)"
                            :placeholder="$t('objects.directory.users.status')"
                            :options="statusOptions"
                            taggable
                            @input="changeStatus({index: props.rowIndex, prop: 'status', value: $event})"
                    ></dropdown-select>
                </template>

                <template slot="actions" slot-scope="props">
                    <i
                            class="vuetable-action icon-icon_edit"
                            :title="$t('iconHints.edit')"
                            @click="edit(props.rowIndex)"
                    ></i>
                    <i
                            class="vuetable-action icon-icon_delete"
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
    </div>
</template>

<script>
    import tableFilter from '../../object-utils/utils/table-filter';
    import dropdownSelect from '../../utils/dropdown-select';
    import uploadPopup from './upload-users-popup';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-users",
        components: {
            uploadPopup,
            tableFilter,
            dropdownSelect,
        },
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'username', title: this.$t('objects.directory.users.login')},
                    {name: 'extensions', title: this.$t('objects.directory.users.extensions')},
                    {name: 'DnD', title: this.$t('objects.directory.users.DnD')},
                    {name: 'status', title: this.$t('objects.directory.users.status')},
                    _actionsTableField_2,
                ],
                statusOptions: ['On break', 'Available', 'Chatting'],
                csvFile: null
            };
        },

        computed: {
            ...mapState('directory/users', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.directory.users.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.directory.users.search
                },
                set(value) {
                    this.setSearch(value)
                }
            }
        },

        methods: {
            create() {
                this.$router.push('/directory/users/new');
            },

            getDND(value) {
                if(value && value.status) {
                    return value.status.includes('dnd');
                }
                return false;
            },

            getStatus(value) {
                if (value && value.note) {
                    return value.note;
                }
                return 'Status undefined';
            },

            edit(rowId) {
                this.$router.push({
                    name: 'directory-users-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.csvFile = file;
                    this.popupTriggerIf = true;
                }
            },

            closeCSVPopup() {
                this.loadList();
                this.popupTriggerIf = false;
                this.$refs['file-input'].value = null;
            },

            ...mapActions('directory/users', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                patchProperty: 'PATCH_ITEM_PROPERTY',
                changeStatus: 'PATCH_ITEM_PEROPERTY',
                toggleSwitchProperty: 'TOGGLE_ITEM_PROPERTY',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>