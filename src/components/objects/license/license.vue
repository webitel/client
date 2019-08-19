<template>
    <div class="content-wrap">
        <object-header>
            {{$t('objects.license.licenseTitle')}}
        </object-header>

        <license-popup
            v-if="isUploadPopupOpened"
            @close="closeCertPopup"
        ></license-popup>

        <section class="object-content">

            <header class="content-header page-header">
                <h3 class="content-title">
                    {{$t('objects.license.allLicenses')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.license.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                    </div>
                    <div class="table-action__actions">
                            <i
                                    class="icon-icon_plus"
                                    :class="{'active': isUploadPopupOpened}"
                                    @click="openCertPopup"
                            ></i>
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

                <template slot="serial" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].serial"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="valid-from" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].validFrom.toLocaleDateString('ru-RU')"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="valid-till" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].validTill.toLocaleDateString('ru-RU')"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="used" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].used"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="limit" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].limit"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="status" slot-scope="props">
                    <div
                            class="license-status"
                            :class="computeStatusClass(test[props.rowIndex].validTill)"
                    >
                        {{computeStatusText(test[props.rowIndex].validTill)}}
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
    import licensePopup from './license-popup';

    export default {
        name: "license",
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            'license-popup': licensePopup,
            'table-filter': tableFilter,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'serial', title: this.$t('objects.license.serial')},
                    {name: 'product', title: this.$t('objects.license.product')},
                    {name: 'valid-from', title: this.$t('objects.license.validFrom')},
                    {name: 'valid-till', title: this.$t('objects.license.validTill')},
                    {name: 'used', title: this.$t('objects.license.used')},
                    {name: 'limit', title: this.$t('objects.license.limit')},
                    {name: 'status', title: this.$t('objects.license.status')},

                ],
                test: [],
                filtered: [],
                isPopupOpened: false,
                csvFile: null,

                search: '',
                propertiesToSearch: ['serial', 'product'],
                filterObjects: {
                    product: {
                        name: 'Product',
                        fields: []
                    }
                },
                isFilterOpenedClassTrigger: false,
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
                    serial: '' + i + i + i,
                    product: 'Kibana',
                    validFrom: new Date(2018, 10, Math.random()*30),
                    validTill:new Date(2019, 8, Math.random()*30),
                    used: '444',
                    limit: '444',
                    status: 'status',
                    id: i,
                });
            }

            this.test.forEach((item) => {
                // if statement is emulating Set for an array
                // Set is unable to use because v-for props doesn't update on set values change
                if (!this.filterObjects.product.fields.some(element => element.name === item.product)) {
                    this.filterObjects.product.fields.push({
                        name: item.product,
                        value: true
                    });
                }
            });
            this.filterData();
        },
        methods: {
            // now it just searches
            filterData() {
                this.filtered = [];
                if (!this.search) {
                    console.log('spread');
                    this.filtered = [...this.test];
                } else {
                    console.log('no');
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
            openCertPopup() {
                this.isUploadPopupOpened = true;
            },
            closeCertPopup() {
                this.isUploadPopupOpened = false;
            },
            computeStatusText(endDate) {
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));

                if (daysLeft <= 0) {
                    return this.$t('objects.license.daysToExpire.0');
                } else if(daysLeft < 30) {
                    return this.$t('objects.license.daysToExpire.30');
                } else if(daysLeft < 90) {
                    return this.$t('objects.license.daysToExpire.90');
                }
            },
            computeStatusClass(endDate) {
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));

                if (daysLeft <= 0) {
                    return 'days0';
                } else if(daysLeft < 30) {
                    return 'days30';
                } else if(daysLeft < 90) {
                    return 'days90';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $license-90: rgba(255, 234, 0, 0.3);
    $license-30: rgba(255, 68, 68, 0.3);
    $license-0: rgba(0, 0, 0, 0.1);

    .license-status {
        text-align: center;
        width: 93px;
        padding: 5px 8px 3px;
        border-radius: $border-radius;

        &.days90 {
            background: $license-90;
        }

        &.days30 {
            background: $license-30;
        }

        &.days0 {
            background: $license-0;
        }
    }
</style>