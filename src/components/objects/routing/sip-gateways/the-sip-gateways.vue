<template>
    <div class="gateways">
        <object-header
                :primaryAction="openPopup"
        >
            {{$t('objects.routing.routing')}} |
            {{$tc('objects.routing.gateways.gateways', 2)}}
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
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
                    no-data-template="Empty data message"
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
                            @input="toggleDataProperty('enable', props.rowIndex)"
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
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="remove(props.rowIndex)"
                        ></i>
                </template>
            </vuetable>

            <pagination/>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import createGatewayPopup from './create-gateway-popup';
    import {getGatewayList, deleteGateway} from "../../../../api/objects/routing/gateways";
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";


    export default {
        name: "the-sip-gateways",
        mixins: [tableComponentMixin],
        components: {
            'gateway-popup': createGatewayPopup,
        },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'proxy', title: this.$t('objects.routing.gateways.proxy')},
                    {name: 'enabled', title: this.$t('objects.enabled')},
                    {name: 'status', title: this.$t('objects.status')},
                    _actionsTableField_2,
                ],
                filterProperties: ['name', 'proxy'],
            };
        },

        methods: {
            edit(rowId) {
                let name;
                if (this.dataList[rowId].register) {
                    name = 'reg-gateway-edit';
                } else {
                    name = 'trunk-gateway-edit';
                }

                this.$router.push({
                    name: name,
                    params: {id: this.dataList[rowId].id},
                });
            },


            async remove(rowId) {
                // remove item
                const deletedItem = this.dataList.splice(rowId, 1)[0];
                this.filterData();

                try {
                    await deleteGateway(deletedItem.id);
                } catch (err) {
                    // if request fails, restore
                    this.dataList.splice(rowId, 0, deletedItem);
                    this.filterData();
                }
            },

            computeStatusText(rowIndex) {
                const stateCode = this.filteredDataList[rowIndex].r_state;
                if (stateCode === 3) {
                    return 'Success';
                } else if (stateCode > 3 && stateCode < 8) {
                    return 'Failed';
                } else if (stateCode > 7 && stateCode < 2) {
                    return 'In progress';
                } else {
                    return 'Not registered'
                }
            },

            computeStatusClass(rowIndex) {
                const stateCode = this.filteredDataList[rowIndex].r_state;
                if (stateCode === 3) {
                    return 'status__true';
                } else if (stateCode > 3 && stateCode < 8) {
                    return 'status__false';
                } else if (stateCode > 7 && stateCode < 2) {
                    return 'status__info';
                } else {
                    return 'not-registered'
                }
            },

            async toggleDataProperty(property, id) {
                // first, change UI, then send request
                this.filteredDataList[id][property] = !this.filteredDataList[id][property];

                try {
                    // await updateObject(this.dataList[id].id, this.dataList[id]);
                } catch (err) {
                    // if request throws error, move changes back
                    this.filteredDataList[id][property] = !this.filteredDataList[id][property];
                }
            },

            async loadDataList() {
                const response = await getGatewayList(this.rowsPerPage);

                this.dataList = [...response];
                this.filterData();
            }
        },

    }
</script>