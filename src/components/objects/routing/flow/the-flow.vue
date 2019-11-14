<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$tc('objects.routing.flow.flow', 2)}}
        </object-header>

        <flow-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        >
        </flow-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.flow.allFlowSchemas')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

            <vuetable
                    ref="vuetable"
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

                <template slot="type" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].type}}
                    </div>
                </template>

                <template slot="debug" slot-scope="props">
                    <switcher
                            v-model="filteredDataList[props.rowIndex].debug"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_notification"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3, _switcherWidth} from "@/utils/tableFieldPresets";
    import flowPopup from './create-flow-popup';

    export default {
        name: "the-dialplan",
        mixins: [tableComponentMixin],
        components: {
            flowPopup
        },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.routing.flow.type')},
                    {name: 'debug', title: this.$t('objects.routing.flow.debug'), width: _switcherWidth},
                    _actionsTableField_3,
                ],
            };
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                this.$router.push({
                    name: 'rounting-dialplan-edit',
                    params: {id: this.filteredDataList[rowId].id},
                });
            },

            async deleteItem(item) {
                // await deleteCommunication(item.id);
            },

            async loadDataList() {
                // this.dataList = await getCommunicationsList();
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: 'flow ' + i,
                        type: 'Schema type',
                        debug: !!Math.round(Math.random()),
                        isSelected: false,
                    });
                }

                this.filterData();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>