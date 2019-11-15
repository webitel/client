<template>
    <div class="content-wrap">
        <object-header
                :primary-action="create"
        >
            {{$t('objects.directory.directory')}} | {{$tc('objects.directory.users.users', 2)}}
        </object-header>

        <upload-popup v-if="popupTriggerIf" @close="popupTriggerIf = false"></upload-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.directory.users.allUsers')}}</h3>
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

                <template slot="login" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].login}}
                    </div>
                </template>

                <template slot="extensions" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].extensions}}
                    </div>
                </template>

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': filteredDataList[props.rowIndex].state}"
                            :text=computeOnlineText(filteredDataList[props.rowIndex].state)
                    >
                    </status>
                </template>


                <template slot="DnD" slot-scope="props">
                    <switcher
                            v-model="filteredDataList[props.rowIndex].DnD"
                    ></switcher>
                </template>


                <template slot="status" slot-scope="props">
                    <dropdown-select
                            class="inline-dropdown inline-dropdown__options-right"
                            v-model="filteredDataList[props.rowIndex].status"
                            :placeholder="$t('objects.directory.users.status')"
                            :options="statusOptions"
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
        </section>
    </div>
</template>

<script>
    import tableFilter from '../../utils/table-filter';
    import dropdownSelect from '../../../utils/dropdown-select';
    import uploadPopup from '../../utils/upload-popup';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import tableComponentMixin from '@/mixins/tableComponentMixin';

    export default {
        name: "opened-user",
        components: {
            uploadPopup,
            tableFilter,
            dropdownSelect,
        },
        mixins: [tableComponentMixin],
        data() {
            return {
                // vuetable prop
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'login', title: this.$t('objects.directory.users.login')},
                    {name: 'extensions', title: this.$t('objects.directory.users.extensions')},
                    {name: 'state', title: this.$t('objects.directory.users.state')},
                    {name: 'DnD', title: this.$t('objects.directory.users.DnD')},
                    {name: 'status', title: this.$t('objects.directory.users.status')},
                    _actionsTableField_2,
                ],
                propertiesToSearch: ['head', 'login', 'extensions', 'status'],
                statusOptions: [{text: 'On break'}, {text: 'Available'}, {text: 'Chatting'}],
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

        methods: {
            create() {
                this.$router.push('/directory/users/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'directory-users-edit',
                    params: {id: this.filteredDataList[rowId].id},
                });
            },

            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.popupTriggerIf = true;
                }
            },

            computeOnlineText(state) {
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            loadDataList() {
                for (let i = 0; i < 4; i++) {
                    this.dataList.push({
                        isSelected: false,
                        name: `head${i}`,
                        login: 'login' + (10 - i),
                        extensions: '' + i + i + i,
                        state: true,
                        DnD: true,
                        status: 'status',
                        role: 'Admin',
                        id: i,
                    });
                }
                this.filterData();
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>