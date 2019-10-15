<template>
    <div class="gateways">
        <object-header
                :primaryAction="openPopup"
        >
            {{$t('objects.routing.routing')}} |
            {{$t('objectsrouting.gateways.gateways', 2)}}
        </object-header>

        <gateway-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        >
        </gateway-popup>

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
                    :data="filteredDataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="proxy" slot-scope="props">
                    <span>
                        {{filteredDataList[props.rowIndex].proxy}}
                    </span>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            :value="filteredDataList[props.rowIndex].enable"
                            @toggleSwitch="toggleDataProperty('enable', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="status" slot-scope="props">
                    <status
                            class="status"
                            :class="computeStatusClass(props.rowIndex)"
                            :text="computeStatusText(props.rowIndex)"
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
    import createGatewayPopup from './create-gateway-popup';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';
    import switcher from '@/components/utils/switcher';
    import status from '@/components/utils/status';
    import {getGatewayList} from "../../../../api/objects/routing/gateways";


    export default {
        name: "the-sip-gateways",
        components: {
            'gateway-popup': createGatewayPopup,
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
                popupTriggerIf: false,
            };
        },
        mounted() {
            this.loadDataList();
        },
        methods: {
            openPopup() {
                this.popupTriggerIf = true;
            },

            filterData() {
                this.filteredDataList = this.dataList.filter(dataItem => {
                    return dataItem.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
                        || dataItem.proxy.trim().toLowerCase().includes(this.search.trim().toLowerCase());
                });
            },

            edit(rowId) {
                let name;
                if (this.dataList[rowId].register) {
                    name = 'reg-gateway-edit';
                } else {
                    name = 'trunk-gateway-edit';
                }

                this.$router.push({
                    name:  name,
                    params: {id: this.dataList[rowId].id},
                });
            },

            computeStatusText(rowIndex) {
                const stateCode = this.dataList[rowIndex].r_state || -1;
                if (stateCode === 0) {
                    return 'Not registered'
                } else if (stateCode === 3) {
                    return 'Success';
                } else if (stateCode > 3 && stateCode < 8) {
                    return 'Failed';
                } else if (stateCode > 7 && stateCode < 2) {
                    return 'In progress';
                } else {
                    return 'unknown'
                }
            },

            computeStatusClass(rowIndex) {
                const stateCode = this.dataList[rowIndex].r_state || -1;
                if (stateCode === 0) {
                    return 'not-registered'
                } else if (stateCode === 3) {
                    return 'status__true';
                } else if (stateCode > 3 && stateCode < 8) {
                    return 'status__false';
                } else if (stateCode > 7 && stateCode < 2) {
                    return 'status__info';
                } else {
                    return 'unknown'
                }
            },

            // toggle object permissions
            async toggleDataProperty(property, id) {
                // first, change UI, then send request
                this.dataList[id][property] = !this.dataList[id][property];

                try {
                    // await updateObject(this.dataList[id].id, this.dataList[id]);
                } catch (err) {
                    // if request throws error, move changes back
                    this.dataList[id][property] = !this.dataList[id][property];
                }
            },

            async loadDataList() {
                const response = await getGatewayList();

                this.dataList = [...response];
                this.filterData();
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>