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
                            @filterData="loadDataList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            @click="loadDataList"
                    ></i>
                    <div class="upload-csv">
                        <i class="icon-icon_upload"></i>
                        <input
                                ref="file-input"
                                class="upload-csv__input"
                                type="file"
                                @change="processCSV($event)"
                                accept=".csv"
                        >
                    </div>
                    <table-filter
                            :filterObjects="filterObjects"
                    ></table-filter>
                </div>
            </header>

            <vuetable
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

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': dataList[props.rowIndex].state}"
                            :text=computeOnlineText(dataList[props.rowIndex].state)
                    >
                    </status>
                </template>


                <template slot="DnD" slot-scope="props">
                    <switcher
                            :value="dataList[props.rowIndex].dnd"
                            @input="toggleSwitchProperty(props.rowIndex)"
                    ></switcher>
                </template>


                <template slot="status" slot-scope="props">
                    <dropdown-select
                            class="inline-dropdown inline-dropdown__options-right"
                            :value="dataList[props.rowIndex].status"
                            :placeholder="$t('objects.directory.users.status')"
                            :options="statusOptions"
                            @input="changeStatus({value: $event, index: props.rowIndex})"
                    ></dropdown-select>
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
                    {name: 'state', title: this.$t('objects.directory.users.state')},
                    {name: 'DnD', title: this.$t('objects.directory.users.DnD')},
                    {name: 'status', title: this.$t('objects.directory.users.status')},
                    _actionsTableField_2,
                ],
                statusOptions: ['On break', 'Available', 'Chatting'],
                filterObjects: {
                    state: {
                        name: 'State',
                        fields:
                            [
                                {
                                    name: 'Online',
                                    value: true
                                },
                                {
                                    name: 'Offline',
                                    value: true
                                }
                            ]
                    },
                    DnD: {
                        name: 'DnD',
                        fields:
                            [
                                {
                                    name: 'On',
                                    value: true
                                },
                                {
                                    name: 'Off',
                                    value: true
                                }]
                    },
                    roles: {
                        name: 'Roles',
                        fields:
                            []
                    }
                },

                isFilterOpenedClassTrigger: false,
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
                this.loadDataList();
                this.popupTriggerIf = false;
                this.$refs['file-input'].value = null;
            },

            computeOnlineText(state) {
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            ...mapActions('directory/users', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
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