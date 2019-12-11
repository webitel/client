<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.directory.directory')}} | {{$tc('objects.directory.devices.devices', 2)}}
        </object-header>

        <history-popup
                v-if="historyId"
                :itemId="historyId"
                @close="historyId = null"
        ></history-popup>

        <upload-popup v-if="popupTriggerIf" @close="popupTriggerIf = false"></upload-popup>

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
    import {getDeviceList} from "../../../../api/objects/directory/devices";

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
                    {name: 'account', title: this.$t('objects.directory.devices.authId')},
                    {name: 'user', title: this.$t('objects.user')},
                    {name: 'state', title: this.$t('objects.directory.devices.presence')},
                    _actionsTableField_3,
                ],

                filterObjects: {
                    state: {
                        name: 'Presence',
                        fields: []
                    }
                },

                historyId: null,
                historyPopupTriggerIf: false,
                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },

        mounted() {

        },

        methods: {
            create() {
                this.$router.push('/directory/devices/new');
            },

            read(rowIndex) {
                this.historyId = this.dataList[rowIndex].id;
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
                    this.popupTriggerIf = true;
                }
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

            async loadDataList() {
                this.dataList = await getDeviceList(this.size, this.search);
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
