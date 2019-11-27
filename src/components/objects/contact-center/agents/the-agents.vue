<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.agents.agents', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.agents.allAgents')}}
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
                    <i class="icon-action icon-icon_upload"></i>
                    <i class="icon-action icon-icon_upload"></i>
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >

                <template slot="user" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].user.name}}
                        </span>
                    </div>
                </template>

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': filteredDataList[props.rowIndex].state}"
                            :text=computeOnlineText(filteredDataList[props.rowIndex].state)
                    >
                    </status>
                </template>

                <template slot="time" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].stateTime}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
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
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";


    export default {
        name: "the-agents",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'user', title: this.$tc('objects.directory.users.users', 1)},
                    {name: 'state', title: this.$t('objects.ccenter.agents.state')},
                    {name: 'time', title: this.$t('objects.ccenter.agents.stateTime')},
                    _actionsTableField_3,
                ],
                filterProperties: [],
            };
        },

        methods: {
            computeOnlineText(state) {
                return state ? this.$t('objects.online') : this.$t('objects.offline');
            },

            create() {
                this.$router.push('/contact-center/agents/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-agent-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async deleteItem(deletedItem) {

            },

            async loadDataList() {
                // const response = await getResourceList(this.rowsPerPage);
                // this.dataList = [...response];
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        user: {name: 'userr'},
                        state: !!(i % 2),
                        stateTime: i * 60 + 'h ' + i + 'm',
                        isSelected: false,
                    });
                }
                this.filterData();
            }
        },

    }
</script>