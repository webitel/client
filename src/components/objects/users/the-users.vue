<template>
    <div class="content-wrap">
        <object-header
                :primary-action="create"
        >
            Users
        </object-header>

        <upload-popup v-if="isUploadPopupOpened" @close="closeCSVpopup"></upload-popup>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">All users</h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="'Name, login, extension, status..'"
                                v-model="search"
                                @keyup="filterData"
                        >
                        <i class="icon-icon_search"></i>
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

                <template slot="name" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="login" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].login"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="extensions" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].extensions"
                            :disabled="true"
                    ></edit-field>
                </template>


                <template slot="state" slot-scope="props">
                    <div class="online-status">
                        <span class="online-icon" :class="{'online': filtered[props.rowIndex].state}"></span>
                        <div class="online-text">{{computeOnlineText(props.rowIndex)}}</div>
                    </div>
                </template>


                <template slot="DnD" slot-scope="props">
                    <switcher
                            :value="filtered[props.rowIndex].DnD"
                            @toggleSwitch="toggleSwitch($event, props.rowIndex)"
                    ></switcher>
                </template>


                <template slot="status" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].status"
                            :disabled="true"
                    ></edit-field>
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
    import objectHeader from '../object-header';
    import editField from '../../utils/edit-field';
    import tableFilter from '../utils/table-filter';
    import switcher from '../../utils/switcher';
    import uploadPopup from '../utils/upload-popup';

    export default {
        name: "the-users",
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            'upload-popup': uploadPopup,
            vuetable,
            'table-filter': tableFilter,
            switcher
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
                    {name: 'login', title: 'Login'},
                    {name: 'extensions', title: 'Extensions'},
                    {name: 'state', title: 'State'},
                    {name: 'DnD', title: 'DnD'},
                    {name: 'status', title: 'Status'},
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
                isUploadPopupOpened: false,

                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
                    isSelected: false,
                    head: `head${i}`,
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
                this.$router.push('/users/new');
            },
            action(action) {
                if (action === 'edit') {
                    this.$router.push({path: '/users/new', query: {edit: 'true'}});
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
                    this.isUploadPopupOpened = true;
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

            // computes dynamic class name for presence icon colorizing
            computeOnlineText(id) {
                return this.filtered[id].online ? 'Online' : 'Offline';
            },

            closeCSVpopup() {
                this.isUploadPopupOpened = false;
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
    .online-status {
        display: flex;
        align-items: baseline;
        padding: 15px 16px 11px 0;

        .online-icon {
            @extend .status-icon;

            &.online {
                background: $true-color;
            }
        }
    }
</style>