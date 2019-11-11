<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$t('objects.routing.dialplan.dialplan')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.dialplan.dialplanRules')}}</h3>
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
                    class="permissions-table"
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

                <template slot="pattern" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].pattern}}
                    </div>
                </template>

                <template slot="schema" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].schema.name || 'schema IS EMPTY'}}
                    </div>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                        v-model="filteredDataList[props.rowIndex].enabled"
                    >

                    </switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_check"
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

    export default {
        name: "the-dialplan",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'pattern', title: this.$t('objects.routing.dialplan.pattern')},
                    {name: 'schema', title: this.$tc('objects.routing.schema', 1)},
                    {name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth},
                    _actionsTableField_3,
                ],
            };
        },

        methods: {
            create() {
                this.$router.push('/routing/dialplan/new');
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
                for(let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: 'dialplan '+i,
                        pattern: '^\\+?(7|8)?(\\d{10,11})$',
                        schema: {name: 'schema name'},
                        enabled: !!Math.round(Math.random()),
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