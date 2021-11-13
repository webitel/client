<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.integrations.integrations')}} |
            {{$tc('objects.integrations.triggers.triggers', 2)}}
        </object-header>

        <trigger-popup
                v-if="true"
                @close="popupTriggerIf = false"
        >
        </trigger-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.integrations.triggers.allTriggers')}}</h3>
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
                    <div>
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

                <template slot="enabled" slot-scope="props">
                    <switcher
                            v-model="filteredDataList[props.rowIndex].enabled"
                    ></switcher>
                </template>

                <template slot="schema" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].schema.name}}
                    </div>
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
            <pagination></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
    import triggerPopup from './create-trigger-popup';

    export default {
        name: 'the-triggers',
        mixins: [tableComponentMixin],
        components: {
            triggerPopup,
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                this.$router.push({
                    name: 'trigger-edit',
                    params: { id: this.filteredDataList[rowId].id },
                });
            },

            async deleteItem(item) {
                // await deleteCommunication(item.id);
            },

            async loadDataList() {
                // this.dataList = await getCommunicationsList();
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: `Trigger name ${i}`,
                        type: i % 2 ? 'On event' : 'At time',
                        enabled: !!Math.round(Math.random()),
                        schema: {
                            name: 'Schema name',
                        },
                        isSelected: false,
                    });
                }

                this.filterData();
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
