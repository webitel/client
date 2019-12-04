<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.res.res', 2)}}</h3>
            <div class="content-header__actions-wrap">
                <i
                        class="icon-icon_delete icon-action"
                        :class="{'hidden': anySelected}"
                        @click="deleteSelected"
                ></i>
                <i class="icon-action icon-icon_plus" @click="addItem"></i>
            </div>
        </header>

        <vuetable
                ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="name" slot-scope="props">
                <div v-if="dataList[props.rowIndex].resource.id ||
                 dataList[props.rowIndex].resource.id === 0">
                    {{dataList[props.rowIndex].resource.name}}
                </div>

                <dropdown-select
                        v-else
                        class="inline-dropdown inline-dropdown__options-left"
                        v-model="dataList[props.rowIndex].resource"
                        :placeholder="$tc('objects.ccenter.resorces.resorces', 1)"
                        :options="[]"
                ></dropdown-select>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_check"
                   @click="moveRowTop(props.rowIndex)"
                ></i>
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
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-resources",
        mixins: [tableComponentMixin, openedTabComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    _actionsTableField_2,
                ],
            };
        },

        methods: {
            moveRowTop(rowIndex) {
                if(rowIndex !== 0) {
                    const tmp = this.dataList[rowIndex];
                    this.dataList[rowIndex] = this.dataList[rowIndex - 1];
                    this.dataList[rowIndex - 1] = tmp;
                   this.dataList = [...this.dataList] // updates view
                    // this.filterData();
                }
            },

            addItem() {
                this.dataList.unshift({
                    resource: {
                        name: 'empty',
                    },
                    isSelected: false,
                });
            },

            remove(rowIndex) {
                this.dataList.splice(rowIndex, 1);
            },

            loadDataList() {
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        resource: {
                            id: i,
                            name: 'resource ' + i,
                        },
                        isSelected: false,
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>