<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.teams.teams', 2)}}
        </object-header>

        <history-popup
                v-if="historyPopupTriggerIf"
                :itemId="1"
                @close="historyPopupTriggerIf = false"
        ></history-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.teams.allTeams')}}
                </h3>

                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_approve icon-action"
                    ></i>
                    <i
                            class="icon-icon_approve icon-action"
                            @click="historyPopupTriggerIf = true"
                    ></i>
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

                <template slot="strategy" slot-scope="props">
                    <span>
                        {{filteredDataList[props.rowIndex].strategy}}
                    </span>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="historyPopupTriggerIf = true"
                    ></i>
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
    import historyPopup from './team-history-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";


    export default {
        name: "the-teams",
        mixins: [tableComponentMixin],
        components: {historyPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'strategy', title: this.$t('objects.ccenter.teams.strategy')},
                    _actionsTableField_3,
                ],
                historyPopupTriggerIf: false
            };
        },

        methods: {
            create() {
                this.$router.push('/contact-center/teams/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-team-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async loadDataList() {
                // const response = await getResourceList(this.rowsPerPage);
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: 'name ' + i,
                        strategy: 'str ' + i,
                        isSelected: false,
                    });
                }
                this.filterData();
            }
        },

    }
</script>