<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.directory.directory')}} | {{$tc('objects.directory.devices.devices', 2)}}
        </object-header>

        <history-popup v-if="historyPopupTriggerIf" @close="historyPopupTriggerIf = false"></history-popup>
        <upload-popup v-if="popupTriggerIf" @close="popupTriggerIf = false"></upload-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.directory.devices.allDevices')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                    <div class="upload-csv">
                        <i class="icon-icon_upload"></i>
                        <input
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
                    class="devices-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="authId" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].authId}}
                    </div>
                </template>

                <template slot="user" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].user}}
                    </div>
                </template>

                <!--presence classes are specified in table-status component-->
                <template slot="presence" slot-scope="props">
                    <status
                            class="presence"
                            :class="computePresenceClass(props.rowIndex)"
                            :text="filteredDataList[props.rowIndex].presence"
                    >

                    </status>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_generate"
                       @click="read(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import historyPopup from './device-history-popup';
    import tableFilter from '../../utils/table-filter';
    import uploadPopup from '../../utils/upload-popup';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import tableComponentMixin from '@/mixins/tableComponentMixin';

    export default {
        name: 'the-devices',
        components: {
            historyPopup,
            uploadPopup,
            tableFilter,
        },
        mixins: [tableComponentMixin],

        data() {
            return {
                // vuetable prop
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'authId', title: this.$t('objects.directory.devices.authId')},
                    {name: 'user', title: this.$t('objects.user')},
                    {name: 'presence', title: this.$t('objects.directory.devices.presence')},
                    _actionsTableField_3,
                ],

                propertiesToSearch: ['head', 'authId', 'user'],
                filterObjects: {
                    presence: {
                        name: 'Presence',
                        fields: []
                    }
                },

                historyPopupTriggerIf: false,
                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },

        mounted() {
            this.handleHistoryPopup();
        },

        methods: {
            create() {
                this.$router.push('/directory/devices/new');
            },

            read(rowIndex) {
                this.$router.push({
                    name: 'directory-devices',
                    query: {history: this.filteredDataList[rowIndex].id},
                });
            },

            edit(rowId) {
                this.$router.push({
                    name: 'directory-devices-edit',
                    params: {id: this.filteredDataList[rowId].id},
                });
            },

            handleHistoryPopup() {
                if(this.$route.query.history) {
                    this.historyPopupTriggerIf = true;
                }
            },

            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.popupTriggerIf = true;
                }
            },

            // computes dynamic class name for presence icon colorizing
            computePresenceClass(rowIndex) {
                return this.filteredDataList[rowIndex].presence.toLowerCase().split(' ').join('-');
            },

            loadDataList() {
                this.dataList.push({
                    isSelected: true,
                    name: 'head0',
                    authId: 0 + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'Offline',
                    id: 0,
                });

                this.dataList.push({
                    isSelected: false,
                    name: 'head1',
                    authId: (Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'Available',
                    id: 1,
                });

                this.dataList.push({
                    isSelected: false,
                    name: 'head2',
                    authId: (2 * Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'Ringing',
                    id: 2,
                });

                this.dataList.push({
                    isSelected: false,
                    name: 'head3',
                    authId: (3 * Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'On a call',
                    id: 3,
                });

                this.dataList.push({
                    isSelected: false,
                    name: 'head4',
                    authId: (4 * Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'On hold',
                    id: 4,
                });

                this.dataList.push({
                    isSelected: false,
                    name: 'head4',
                    authId: (4 * Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'On hold',
                    id: 4,
                });


                this.dataList.forEach((item) => {
                    // if statement is emulating Set for an array
                    if (!this.filterObjects.presence.fields.some(element => element.name === item.presence)) {
                        this.filterObjects.presence.fields.push({
                            name: item.presence,
                            value: true
                        });
                    }
                });

                this.filterData();
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
