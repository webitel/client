<template>
    <div class="content-wrap">
        <object-header
                :primary-action="create"
        >
            {{$t('objects.directory')}} | {{$t('objects.usersObject.users')}}
        </object-header>

        <upload-popup v-if="isPopupOpened" @close="closeCSVpopup"></upload-popup>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">
                    {{$t('objects.usersObject.allUsers')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.usersObject.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                    </div>
                    <div class="table-action__actions">
                        <i class="icon-icon_delete" :class="{'hidden': anySelected}"></i>
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
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filtered"
            >

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': filtered[props.rowIndex].state}"
                            :text=computeOnlineText(filtered[props.rowIndex].state)
                    >
                    </status>
                </template>


                <template slot="DnD" slot-scope="props">
                    <switcher
                            :value="filtered[props.rowIndex].DnD"
                            @toggleSwitch="toggleSwitch($event, props.rowIndex)"
                    ></switcher>
                </template>


                <template slot="status" slot-scope="props">
                    <dropdown-select
                            class="inline-dropdown"
                        :placeholder="filtered[props.rowIndex].status"
                        :options="statusOptions"
                        @input="filtered[props.rowIndex].status = $event"
                    ></dropdown-select>
                </template>


                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="action('edit')"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="action('delete')"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '../../object-header';
    import tableFilter from '../../utils/table-filter';
    import switcher from '../../../utils/switcher';
    import uploadPopup from '../../utils/upload-popup';
    import status from '../../../utils/status';
    import dropdownSelect from '../../../utils/dropdown-select';

    export default {
        name: "the-users",
        components: {
            'object-header': objectHeader,
            'upload-popup': uploadPopup,
            'table-filter': tableFilter,
            'dropdown-select': dropdownSelect,
            vuetable,
            switcher,
            status
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {
                        name: '__table-checkbox',
                        titleClass: 'vuetable-td-checkbox',
                        dataClass: 'vuetable-td-checkbox',
                        width: '55px'
                    },
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'login', title: this.$t('objects.usersObject.login')},
                    {name: 'extensions', title: this.$t('objects.usersObject.extentions')},
                    {name: 'state', title: this.$t('objects.usersObject.state')},
                    {name: 'DnD', title: this.$t('objects.usersObject.DnD')},
                    {name: 'status', title: this.$t('objects.usersObject.status')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
                test: [],
                filtered: [],
                search: '',
                propertiesToSearch: ['head', 'login', 'extensions', 'status'],
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
                isPopupOpened: false,

                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
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

            // collect presence states for filter
            this.test.forEach((item) => {
                // if statement is emulating Set for an array
                // Set is unable to use because v-for props doesn't update on set values change
                if (!this.filterObjects.roles.fields.some(element => element.name === item.role)) {
                    this.filterObjects.roles.fields.push({
                        name: item.role,
                        value: true
                    });
                }
            });

            this.filterData();
        },
        methods: {
            create() {
                this.$router.push('/directory/users/new');
            },
            action(action) {
                if (action === 'edit') {
                    this.$router.push({path: '/directory/users/new', query: {edit: 'true'}});
                }
            },
            selectRow(newValue, id) {
                if (newValue && id) {
                    this.filtered[id].isSelected = newValue;
                }
            },
            toggleSwitch(newVal, id) {
                this.test[id].DnD = newVal;
            },
            processCSV(event) {
                const file = event.target.files[0];
                if (file) {
                    this.isPopupOpened = true;
                }
            },

            // now it just searches
            filterData() {
                this.filtered = [];
                if (!this.search) {
                    this.filtered = [...this.test];
                } else {
                    this.test.filter((item) => {
                        for (let i = 0; i < this.propertiesToSearch.length; i++) {
                            const key = this.propertiesToSearch[i];
                            if (item[key].includes(this.search)) {
                                this.filtered.push(item);
                                break;
                            }
                        }
                    });
                }
            },

            computeOnlineText(state) {
                console.log(state);
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            closeCSVpopup() {
                this.isPopupOpened = false;
            }
        },
        computed: {
            // shows delete table action if some items are selected
            anySelected() {
                return !this.filtered.some((item) => item.isSelected);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>