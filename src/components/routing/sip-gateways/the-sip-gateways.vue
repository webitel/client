<template>
    <div class="gateways">
        <object-header
                :primaryAction="create"
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
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                </div>
            </header>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
                    no-data-template="Empty data message"
            >

                <template slot="name" slot-scope="props">
                    <div>
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
                            :value="dataList[props.rowIndex].enable"
                            @input="patchProperty({index: props.rowIndex, prop: 'enable', value: $event})"
                    ></switcher>
                </template>

                <template slot="status" slot-scope="props">
                    <status
                            class="status"
                            :class="computeStatusClass(dataList[props.rowIndex].rState)"
                            :text="computeStatusText(dataList[props.rowIndex].rState)"
                    ></status>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       :title="$t('iconHints.edit')"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       :title="$t('iconHints.delete')"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_2, _switcherWidth } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import gatewayPopup from './create-gateway-popup';

    export default {
        name: 'the-sip-gateways',
        mixins: [tableComponentMixin],
        components: { gatewayPopup },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'proxy', title: this.$t('objects.routing.gateways.proxy') },
                    { name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth },
                    { name: 'status', title: this.$t('objects.status') },
                    _actionsTableField_2,
                ],
            };
        },

        computed: {
            ...mapState('routing/gateways', {
                dataList: (state) => state.dataList,
                page: (state) => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.routing.gateways.size; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.routing.gateways.search; },
                set(value) { this.setSearch(value); },
            },
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                const name = this.dataList[rowId].register
                    ? 'reg-gateway-edit' : 'trunk-gateway-edit';

                this.$router.push({
                    name,
                    params: { id: this.dataList[rowId].id },
                });
            },

            computeStatusText(stateCode) {
                if (stateCode === 3) {
                    return this.$t('objects.routing.gateways.stateSuccess');
                } if (stateCode > 3 && stateCode < 8) {
                    return this.$t('objects.routing.gateways.stateFailed');
                } if (stateCode > 7 && stateCode < 2) {
                    return this.$t('objects.routing.gateways.stateProgress');
                }
                    return this.$t('objects.routing.gateways.stateNonreg');
            },

            computeStatusClass(stateCode) {
                if (stateCode === 3) {
                    return 'status__true';
                } if (stateCode > 3 && stateCode < 8) {
                    return 'status__false';
                } if (stateCode > 7 && stateCode < 2) {
                    return 'status__info';
                }
                    return 'not-registered';
            },

            ...mapActions('routing/gateways', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                patchProperty: 'PATCH_ITEM_PROPERTY',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    };
</script>
