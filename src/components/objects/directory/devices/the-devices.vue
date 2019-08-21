<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.devices.devices')}}
        </object-header>

        <upload-popup v-if="isPopupOpened" @close="closeCSVpopup"></upload-popup>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">
                    {{$t('objects.devices.allDevices')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.devices.searchPlaceholder')"
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
                    class="devices-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="filtered"
            >

                <template slot="presence" slot-scope="props">

<!--                    presence classes are specified in table-status component-->
                    <status
                            class="presence"
                            :class="computePresenceClass(props.rowIndex)"
                            :text="filtered[props.rowIndex].presence"
                    >

                    </status>
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
    import uploadPopup from '../../utils/upload-popup';
    import status from '../../../utils/status';

    import clickaway from '../../../../directives/clickaway';

    export default {
        name: 'the-devices',
        components: {
            'object-header': objectHeader,
            'upload-popup': uploadPopup,
            vuetable,
            'table-filter': tableFilter,
            status,
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
                    {name: 'authId', title: this.$t('objects.devices.authId')},
                    {name: 'user', title: this.$t('objects.user')},
                    {name: 'presence', title: this.$t('objects.devices.presence')},
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
                propertiesToSearch: ['head', 'authId', 'user'],
                filterObjects: {
                    presence: {
                        name: 'Presence',
                        fields: []
                    }
                },
                isPopupOpened: false,

                isFilterOpenedClassTrigger: false,
                csvFile: null
            };
        },
        mounted() {

            // FIXME: delete test data
            this.test.push({
                isSelected: true,
                name: 'head0',
                authId: 0 + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Offline',
                id: 0,
            });

            this.test.push({
                isSelected: false,
                name: 'head1',
                authId: (Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Available',
                id: 1,
            });

            this.test.push({
                isSelected: false,
                name: 'head2',
                authId: (2 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'Ringing',
                id: 2,
            });

            this.test.push({
                isSelected: false,
                name: 'head3',
                authId: (3 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On a call',
                id: 3,
            });

            this.test.push({
                isSelected: false,
                name: 'head4',
                authId: (4 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On hold',
                id: 4,
            });

            this.test.push({
                isSelected: false,
                name: 'head4',
                authId: (4 * Math.round(Math.random() * 10)) + '',
                user: 'user ' + Math.round(Math.random() * 10),
                presence: 'On hold',
                id: 4,
            });


            this.test.forEach((item) => {
                // if statement is emulating Set for an array
                // Set is unable to use because v-for props doesn't update on set values change
                if (!this.filterObjects.presence.fields.some(element => element.name === item.presence)) {
                    this.filterObjects.presence.fields.push({
                        name: item.presence,
                        value: true
                    });
                }
            });

            this.filterData();
        },
        methods: {
            create() {
                this.$router.push('/directory/devices/new');
            },
            action(action) {
                if (action === 'edit') {
                    this.$router.push({path: '/directory/devices/new', query: {edit: 'true'}});
                }
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
                            if (item[key].toLowerCase().includes(this.search.toLowerCase())) {
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
    };
</script>

<style lang="scss" scoped>

</style>
