<template>
    <license v-if="$route.query.id"></license>

    <div class="content-wrap" v-else>
        <object-header>
            {{this.$t('objects.license.customers')}}
        </object-header>

        <section class="object-content">

            <header class="content-header page-header">
                <h3 class="content-title">
                    {{this.$t('objects.license.allCustomers')}}
                </h3>
            </header>


            <vuetable
                    class="devices-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="test"
            >

                <template slot="valid-from" slot-scope="props">
                    <div>{{test[props.rowIndex].validFrom.toLocaleDateString('ru-RU')}}</div>
                </template>

                <template slot="valid-till" slot-scope="props">
                    <div>{{test[props.rowIndex].validTill.toLocaleDateString('ru-RU')}}</div>
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
    import license from './license';

    export default {
        name: "the-customers",
        components: {
            'object-header': objectHeader,
            vuetable,
            license
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'serial', title: this.$t('objects.license.serial')},
                    {name: 'valid-from', title: this.$t('objects.license.validFrom')},
                    {name: 'valid-till', title: this.$t('objects.license.validTill')},
                    {name: 'competitive', title: this.$t('objects.license.competitive')},
                    {name: 'used', title: this.$t('objects.license.used')},
                    {name: 'limit', title: this.$t('objects.license.limit')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '60px'
                    },
                ],
                test: [],
                isPopupOpened: false,
                csvFile: null
            };
        },
        created() {
            // this.$router.push({path: '/license', query: {id: '0'}})
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 4; i++) {
                this.test.push({
                    serial: '' + i + i + i,
                    validFrom: new Date(2018, 10, Math.random()*30),
                    validTill: new Date(2019, 7, Math.random()*30),
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