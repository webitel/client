<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.directory.directory')}} |
            {{$tc('objects.directory.devices.devices', 2)}}
        </object-header>

        <history-popup
                 v-if="historyId"
                @close="historyId = null"
        ></history-popup>

        <upload-popup
                v-if="popupTriggerIf"
                :file="csvFile"
                @close="closeCSVPopup"
        ></upload-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.directory.devices.allDevices')}}
                </h3>
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

                <template slot="account" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].account}}
                    </div>
                </template>

                <template slot="user" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].user.name}}
                    </div>
                </template>

                <!--state classes are specified in table-status component-->
                <template slot="state" slot-scope="props">
                    <status
                            class="device-state"
                            :class="computeStateClass(dataList[props.rowIndex].state)"
                            :text="computeStateText(dataList[props.rowIndex].state)"
                    >
                    </status>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_read"
                       @click="read(dataList[props.rowIndex].id)"
                    ></i>
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
    import historyPopup from './device-history-popup';
    import tableFilter from '../../object-utils/utils/table-filter';
    import uploadPopup from './upload-devices-popup';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'the-devices',
        mixins: [tableComponentMixin],
        components: {
            historyPopup,
            uploadPopup,
            tableFilter,
        },

        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'account', title: this.$t('objects.directory.devices.authId')},
                    {name: 'user', title: this.$t('objects.user')},
                    {name: 'state', title: this.$t('objects.directory.devices.presence')},
                    _actionsTableField_3,
                ],
                csvFile: null
            };
        },

        computed: {
            ...mapState('directory/devices', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.directory.devices.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.directory.devices.search},
                set(value) {this.setSearch(value)}
            },

            historyId: {
                get() {return this.$store.state.directory.devices.history.itemId},
                set(value) {this.read(value)}
            },
        },

        methods: {
            create() {
                this.$router.push('/directory/devices/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'directory-devices-edit',
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

            // computes dynamic class name for state icon colorizing
            computeStateClass(state) {
                switch (state) {
                    case 0:
                        return 'state__nonreg';
                    case 1:
                        return 'state__reged';
                    case 2:
                        return 'state__ringing';
                    case 3:
                        return 'state__dialing';
                    case 4:
                        return 'state__dialog';
                    case 5:
                        return 'state__onhold';
                }
            },

            computeStateText(state) {
                switch (state) {
                    case 0:
                        return this.$t('objects.directory.devices.state.nonreg');
                    case 1:
                        return this.$t('objects.directory.devices.state.reged');
                    case 2:
                        return this.$t('objects.directory.devices.state.ringing');
                    case 3:
                        return this.$t('objects.directory.devices.state.dialing');
                    case 4:
                        return this.$t('objects.directory.devices.state.dialog');
                    case 5:
                        return this.$t('objects.directory.devices.state.onhold');
                }
            },

            ...mapActions('directory/devices', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                read: 'SET_HISTORY_ITEM_ID',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
