<template>
    <div>
        <object-header>
            {{$t('objects.routing.routing')}} |
            {{$t('objects.routing.gateways.gateways')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.routing.gateways.allGateways')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.routing.gateways.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                    </div>
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

                <template slot="proxy" slot-scope="props">
                    <span>
                        {{dataList[props.rowIndex].proxy}}
                    </span>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            :value="dataList[props.rowIndex].enabled"
                            @toggleSwitch="toggleDataProperty('enabled', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="status" slot-scope="props">
                    <status
                            class="status"
                            :class="computeStatusClass(props.rowIndex)"
                            :text="dataList[props.rowIndex].status"
                    ></status>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions__wrap">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="remove(props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';
    import switcher from '@/components/utils/switcher';
    import status from '@/components/utils/status';


    export default {
        name: "the-sip-gateways",
        components: {
            'object-header': objectHeader,
            switcher,
            vuetable,
            status,
        },
        data() {
            return {
                dataList: [], // list of all objects to show
                filteredDataList: [],

                // vuetable prop
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'proxy', title: this.$t('objects.routing.gateways.proxy')},
                    {name: 'enabled', title: this.$t('objects.enabled')},
                    {name: 'status', title: this.$t('objects.status')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
                search: '',
            };
        },
        mounted() {
            this.loadDataList();
        },
        methods: {
            filterData() {

            },

            edit(rowId) {
                this.$router.push({
                    name: 'gateway-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            computeStatusClass(rowIndex) {
                return ''
            },

            // toggle object permissions
            async toggleDataProperty(property, id) {
                // first, change UI, then send request
                this.dataList[id][property] = !this.dataList[id][property];

                try {
                    // await updateObject(this.dataList[id].id, this.dataList[id]);
                } catch (err) {
                    // if request throws error, move changes back
                    // this.dataList[id][property] = !this.dataList[id][property];
                }
            },

            async loadDataList() {
                const response = [
                    {
                        name: 'sip gateway name',
                        proxy: 'sip-proxy@sip.proxy:1010',
                        enabled: true,
                        status: true
                    },
                    {
                        name: 'sip gateway name2',
                        proxy: 'sip-proxy@sip.proxy:2020',
                        enabled: false,
                        status: false
                    },
                ];
                // const response = await getObjects();
                this.dataList = [...response];
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>