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
                                type="text"
                                @change="processCSV($event)"
                                accept=".csv"
                        >
                    </div>
                    <div class="filter">
                        <i
                                class="icon-icon_filter"
                                :class="{'active': isFilterOpenedClassTrigger}"
                                @click.stop="toggleFilter"
                        ></i>
                        <ul
                                class="filter__list"
                                v-if="isFilterOpenedClassTrigger"
                                v-clickaway="toggleFilter"
                        >
                            <li
                                class="filter__list-item"
                                v-for="(item, key) in filterPresence"
                            >
                                <checkbox
                                        :value="item.value"
                                        :label="item.name"
                                        :key="key"
                                        @toggleCheckbox="togglePresenceFilterProperty($event, item.name)"
                                ></checkbox>
                            </li>
                        </ul>
                    </div>
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


                <template slot="online" slot-scope="props">
                    <div class="online-status">
                        <span class="online-icon" :class="{'online': filtered[props.rowIndex].online}"></span>
                        <div class="online-text">{{computeOnlineText(props.rowIndex)}}</div>
                    </div>
                </template>


                <template slot="DnD" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].DnD"
                            :disabled="true"
                    ></edit-field>
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
    import checkbox from '../../utils/checkbox';
    import uploadPopup from '../utils/upload-popup';
    import clickaway from '../../../directives/clickaway';

    export default {
        name: "the-users",
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            'upload-popup': uploadPopup,
            vuetable,
            checkbox
        },
        directives: {
            clickaway
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
                    {name: 'online', title: 'Online'},
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
                filterPresence: [],
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
                    login: 'login' + (10-i),
                    extensions: ''+i+i+i,
                    online: true,
                    DnD: 'false',
                    status: 'status',
                    id: i,
                });
            }

            // collect presence states for filter
            this.test.forEach((item) => {
                // if statement is emulating Set for an array
                // Set is unable to use because v-for props doesn't update on set values change
                if (!this.filterPresence.some(element => element.name === item.presence)) {
                    this.filterPresence.push({
                        name: item.presence,
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
            togglePresenceFilterProperty(newVal, property) {
                for (let item of this.filterPresence) {
                    if (item.name === property) {
                        item.value = newVal;
                        break;
                    }
                }
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

            // toggles filter list appearance
            toggleFilter() {
                this.isFilterOpenedClassTrigger = !this.isFilterOpenedClassTrigger;
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

        .online-icon {
            @extend .status-icon;

            &.online {
                background: $true-color;
            }
        }
    }
</style>