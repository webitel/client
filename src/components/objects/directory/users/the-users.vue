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

                <template slot="username" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].username}}
                    </div>
                </template>

                <template slot="extensions" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].extensions}}
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
                            @input="toggleSwitchProperty('dnd', props.rowIndex)"
                    ></switcher>
                </template>


                <template slot="status" slot-scope="props">
                    <dropdown-select
                            class="inline-dropdown inline-dropdown__options-right"
                            :value="dataList[props.rowIndex].status"
                            :placeholder="$t('objects.directory.users.status')"
                            :options="statusOptions"
                            @input="changeStatus($event, props.rowIndex)"
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
    import {deleteUser, getUsersList, patchUser} from "../../../../api/objects/directory/users";

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
                // vuetable prop
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

            async changeStatus(status, rowIndex) {
                this.dataList[rowIndex].status = status;
                let user = {status};

                try {
                    await patchUser(this.dataList[rowIndex].id, user);
                } catch (e) {
                    this.loadDataList();
                }
            },

            async toggleSwitchProperty(prop, rowIndex) {
                this.dataList[rowIndex][prop] = !this.dataList[rowIndex][prop];
                let user = {};
                user[prop] = this.dataList[rowIndex][prop];
                try {
                    await patchUser(this.dataList[rowIndex].id, user);
                } catch (e) {
                    this.loadDataList();
                }
            },

            async deleteItem(item) {
                await deleteUser(item.id);
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

            async loadDataList() {
                this.dataList = await getUsersList(this.size, this.search, this.filter);
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>