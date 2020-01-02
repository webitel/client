<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.lookups.communications.communications', 2)}}</h3>
            <i
                    class="icon-icon_delete icon-action"
                    :class="{'hidden': anySelected}"
                    @click="deleteSelected"
            ></i>
            <i class="icon-action icon-icon_plus" @click="addItem"></i>
        </header>

        <vuetable
                class="popup-table"
                ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="destination" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].destination}}
                </div>
            </template>

            <template slot="type" slot-scope="props">
                <dropdown-select
                        class="inline-dropdown inline-dropdown__options-left"
                        v-model="dataList[props.rowIndex].type"
                        :placeholder="$t('objects.ccenter.queues.type')"
                        :options="[]"
                ></dropdown-select>
            </template>

            <template slot="priority" slot-scope="props">
                <dropdown-select
                        class="inline-dropdown inline-dropdown__options-left"
                        v-model="dataList[props.rowIndex].priority"
                        :placeholder="$t('objects.ccenter.queues.priority')"
                        :options="[]"
                ></dropdown-select>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_delete"
                   @click="remove(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
        <pagination></pagination>
    </section>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_actionsTableField_1} from "@/utils/tableFieldPresets";

    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-member-popup-communication",
        mixins: [tableComponentMixin, openedTabComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'destination', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.ccenter.queues.type')},
                    {name: 'priority', title: this.$t('objects.ccenter.queues.priority')},
                    _actionsTableField_1,
                ],
            };
        },

        methods: {
            moveRowTop(rowIndex) {
                const tmp = this.dataList[rowIndex];
                this.dataList[rowIndex] = this.dataList[rowIndex - 1];
                this.dataList[rowIndex - 1] = tmp;
                this.filterData();
            },

            addItem() {
                this.dataList.unshift({
                    destination: '7 800 555 3535',
                    type: {name: 'type'},
                    priority: {
                        name: 'High'
                    }
                });
            },

            remove(rowIndex) {
                this.dataList.splice(rowIndex, 1);
            },

            loadDataList() {
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        id: i,
                        destination: '8 800 555 3535',
                        type: {name: 'type', id: i},
                        priority: {
                            name: 'High'
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .popup-table .vuetable {
        min-width: auto;
    }
</style>