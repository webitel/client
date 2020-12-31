<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.integrations.integrations')}} |
            {{$tc('objects.integrations.tokens.tokens', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.integrations.tokens.allTokens')}}</h3>
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

                <template slot="role" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].role.name}}
                    </div>
                </template>

                <template slot="expires" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].expires}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
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
    import { _checkboxTableField, _actionsTableField_1 } from '@/utils/tableFieldPresets';

    export default {
        name: 'the-tokens',
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'role', title: this.$tc('objects.permissions.permissionsRole', 1) },
                    { name: 'expires', title: this.$t('objects.integrations.tokens.expires') },
                    _actionsTableField_1,
                ],
            };
        },

        methods: {
            create() {
                this.$router.push('/integrations/tokens/new');
            },

            async deleteItem(item) {
                // await deleteCommunication(item.id);
            },

            async loadDataList() {
                // this.dataList = await getCommunicationsList();
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        name: `Token name ${i}`,
                        role: { name: 'Role name' },
                        expires: Date.now().toLocaleString(),
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
