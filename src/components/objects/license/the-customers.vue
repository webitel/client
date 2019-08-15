<template>
    <license v-if="$route.query.id"></license>

    <div class="content-wrap" v-else>
        <object-header>
            Customers
        </object-header>

        <section class="object-content">

            <header class="content-header page-header">
                <h3 class="content-title">
                    All customers
                </h3>
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

                <template slot="competitive" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="test[props.rowIndex].competitive"
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

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="openLicense"
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
    import license from './license';

    export default {
        name: "the-customers",
        components: {
            'object-header': objectHeader,
            'edit-field': editField,
            vuetable,
            license
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'serial', title: 'Serial'},
                    {name: 'valid-from', title: 'Valid from'},
                    {name: 'valid-till', title: 'Valid till'},
                    {name: 'competitive', title: 'Competitive'},
                    {name: 'used', title: 'Used'},
                    {name: 'limit', title: 'Limit'},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '60px'
                    },
                ],
                test: [],
                isUploadPopupOpened: false,
                csvFile: null
            };
        },
        created() {
            this.$router.push({path: '/license', query: {id: '0'}})
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
                    serial: '' + i + i + i,
                    validFrom: new Date(2018, 10, Math.random()*30).toLocaleDateString(),
                    validTill:new Date(2019, 7, Math.random()*30).toLocaleDateString(),
                    competitive: 'On',
                    used: '444',
                    limit: '444',
                    id: i,
                });
            }
        },
        methods: {
            openLicense() {
                this.$router.push({path: '/license', query: {id: '0'}});
            }
        }
    }
</script>

<style scoped>

</style>