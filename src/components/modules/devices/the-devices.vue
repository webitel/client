<template>
    <div class="content-wrap">

        <module-header
                :primaryAction="create"
        >
            Devices
        </module-header>

        <upload-popup></upload-popup>

        <section class="module-content">
            <header class="content-header page-header">
                <h3 class="content-title">All devices</h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <input
                                class="search-input"
                                type="text"
                                placeholder="Name, user, auth ID & desk ID"
                                v-model="search"
                                @keyup="filterData"
                        >
                        <i class="icon-icon_deny icon-icon_search"></i>
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
                        <div class="filter">
                            <i
                                    class="icon-icon_approve icon-icon_filter"
                                    @click.stop="toggleFilter"
                                    :class="{'active': isFilterOpenedClassTrigger}"
                            ></i>
                            <ul
                                    class="filter__list"
                                    v-if="isFilterOpenedClassTrigger"
                                    v-clickaway="toggleFilter"
                            >
                                <li class="filter__list-item"
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
                    class="devices-table"
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

                <template slot="authId" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].authId"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="user" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].user"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="presence" slot-scope="props">
                    <div class="presence">
                        <div
                                class="presence-icon"
                                :class="computePresenceClass(props.rowIndex)"
                        ></div>
                        <div class="presence-text">{{filtered[props.rowIndex].presence}}</div>
                    </div>
                </template>


                <template slot="image" slot-scope="props">
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
    import moduleHeader from '../module-header';
    import editField from '../utils/edit-field';
    import checkbox from '../utils/checkbox';
    import uploadPopup from '../utils/upload-popup';

    import clickaway from '../../../directives/clickaway';

    export default {
        name: 'the-devices',
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            'upload-popup': uploadPopup,
            vuetable,
            checkbox,
        },

        directives: {
            clickaway
        },

        data() {
            return {
                // vuetable prop
                fields: [
                    // TODO: UNITED 'NAME' TRANSLATION
                    {
                        name: '__table-checkbox',
                        titleClass: 'vuetable-td-checkbox',
                        dataClass: 'vuetable-td-checkbox',
                        width: '55px'
                    },
                    {name: 'name', title: this.$t('modules.permissions.name')},
                    {name: 'authId', title: 'Auth ID'},
                    {name: 'user', title: 'User'},
                    {name: 'presence', title: 'Presence'},
                    {
                        name: 'image',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
                test: [],
                filtered: [],
                search: '',
                propertiesToSearch: ['head', 'authId', 'user'],
                filterPresence: [],
                isUploadPopupOpened: false,

                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },
        mounted() {

            // FIXME: delete test data
            this.test.push({
                isSelected: true,
                head: 'head0',
                authId: 0 + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Offline',
                id: 0,
            });

            this.test.push({
                isSelected: false,
                head: 'head1',
                authId: (Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Available',
                id: 1,
            });

            this.test.push({
                isSelected: false,
                head: 'head2',
                authId: (2 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Ringing',
                id: 2,
            });

            this.test.push({
                isSelected: false,
                head: 'head3',
                authId: (3 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On a call',
                id: 3,
            });

            this.test.push({
                isSelected: false,
                head: 'head4',
                authId: (4 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On hold',
                id: 4,
            });

            this.test.push({
                isSelected: false,
                head: 'head4',
                authId: (4 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On hold',
                id: 4,
            });


            this.test.forEach((item) => {
                // if statement is emulating Set for an array
                // Set is unable to use because v-for props doesn't update on set values change
                if(!this.filterPresence.some(element => element.name === item.presence)) {
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
                this.$router.push('/devices/new');
            },
            action(action) {
                if (action === 'edit') {
                    this.$router.push({path: '/devices/new', query: {edit: 'true'}});
                }
            },
            selectRow(newValue, id) {
                if (newValue && id) {
                    this.filtered[id].isSelected = newValue;
                } else {

                }
            },
            togglePresenceFilterProperty(newVal, property) {
                // console.log(newVal, property);
                for (let item of this.filterPresence) {
                    if (item.name === property) {
                        // console.log(item.name);
                        item.value = newVal;
                        // console.log(item.value);
                        break;
                    }
                }
                // console.log(this.filterPresence)
            },
            processCSV(event) {
                const file = event.target.files[0];
                if(file) {

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
            computePresenceClass(id) {
                return this.filtered[id].presence.toLowerCase().split(' ').join('-');
            }
        },
        computed: {
            // shows delete table action if some items are selected
            anySelected() {
                return !this.filtered.some((item) => item.isSelected);
            }
        }
    }
    ;
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/main';


    .presence {
        display: flex;

        .presence-icon {
            width: 10px;
            height: 10px;
            margin-right: 14px;
            background: $icon-color;
            border-radius: 50%;

            &.available {
                background: $true-color;
            }

            &.ringing {
                background: #FF9C07;
            }

            &.on-a-call {
                background: $false-color;
            }

            &.on-hold {
                background: #FFEA00;
            }
        }
    }
</style>
