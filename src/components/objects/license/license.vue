<template>
    <div class="content-wrap">
        <object-header>
            License
        </object-header>

        <license-popup
            v-if="isUploadPopupOpened"
            @close="closeCertPopup"
        ></license-popup>

        <section class="object-content">

            <header class="content-header page-header">
                <h3 class="content-title">
                    All licenses
                </h3>
                <div class="content-header__actions-wrap">
                    <div class="table-action__actions">
                            <i
                                    class="icon-icon_plus"
                                    :class="{'active': isUploadPopupOpened}"
                                    @click="openCertPopup"
                            ></i>
                    </div>
                </div>
            </header>


            <vuetable
                    class="devices-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
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
                            :text="test[props.rowIndex].validFrom"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="valid-till" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].validTill"
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
    import licensePopup from './license-popup';

    export default {
        name: "license",
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            'license-popup': licensePopup,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'serial', title: 'Serial'},
                    {name: 'product', title: 'Product'},
                    {name: 'valid-from', title: 'Valid from'},
                    {name: 'valid-till', title: 'Valid till'},
                    {name: 'used', title: 'Used'},
                    {name: 'limit', title: 'Limit'},
                    {name: 'status', title: 'Status'},

                ],
                test: [],
                isUploadPopupOpened: false,
                csvFile: null
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
                    serial: '' + i + i + i,
                    product: 'Kibana',
                    validFrom: new Date(2018, 10, Math.random()*30).toLocaleDateString(),
                    validTill:new Date(2019, 7, Math.random()*30).toLocaleDateString(),
                    used: '444',
                    limit: '444',
                    status: 'status',
                    id: i,
                });
            }

        },
        methods: {
            openCertPopup() {
                this.isUploadPopupOpened = true;
            },
            closeCertPopup() {
                this.isUploadPopupOpened = false;
            },
            computeStatusText(endDate) {
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));
                return  daysLeft +' days left';
            },
            computeStatusClass(endDate) {
                console.log(endDate);
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));

                console.log(daysLeft);
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