<template><section>
    <header class="content-header">
        <h3 class="content-title">{{$tc('objects.ccenter.teams.supervisors', 2)}}</h3>
        <i class="icon-action icon-icon_plus" @click="addItem"></i>
    </header>

    <vuetable
            :api-mode="false"
            :fields="fields"
            :data="dataList"
    >
        <template slot="name" slot-scope="props">
            <div v-if="dataList[props.rowIndex].supervisor.id ||
                 dataList[props.rowIndex].supervisor.id === 0">
                {{dataList[props.rowIndex].supervisor.name}}
            </div>

            <dropdown-select
                    v-else
                    class="inline-dropdown inline-dropdown__options-left"
                    v-model="dataList[props.rowIndex].supervisor"
                    :placeholder="$tc('objects.ccenter.teams.supervisors', 1)"
                    :options="[]"
            ></dropdown-select>
        </template>

        <template slot="actions" slot-scope="props">
            <i class="vuetable-action icon-icon_delete"
               @click="remove(props.rowIndex)"
            ></i>
        </template>
    </vuetable>
    <pagination/>
</section>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_1} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-team-supervisors",
        mixins: [openedTabComponentMixin, tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$tc('objects.ccenter.teams.supervisors', 2)},
                    _actionsTableField_1,
                ],
            }
        },

        mounted() {

        },

        methods: {
            addItem() {
                this.dataList.unshift({
                    supervisor: {
                        name: 'empty'
                    }
                });
            },

            remove(rowIndex) {
                this.dataList.splice(rowIndex, 1);
            },

            loadDataList() {
                for(let i = 0; i < 10; i++) {
                    this.dataList.push({
                        supervisor: {
                            id: i,
                            name: 'team name '+i
                        }
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .inline-dropdown {
        width: 226px;
    }
</style>