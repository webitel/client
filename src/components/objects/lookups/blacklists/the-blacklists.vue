<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.blacklist.blacklist', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.blacklist.allBlacklists')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadDataList"
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
                    :data="dataList"
            >
                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                          {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="numbers" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].numbers || 'number count is undefined'}}
                    </div>
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
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import {deleteBlacklist, getBlacklistList} from "../../../../api/objects/lookups/blacklists";

    export default {
        name: "the-blacklists",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'numbers', title: this.$t('objects.lookups.blacklist.numbersCount')},
                    _actionsTableField_3,
                ],
            };
        },

        methods: {
            create() {
                this.$router.push('/lookups/blacklist/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'blacklist-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            async deleteItem(item) {
                await deleteBlacklist(item.id);
            },

            async loadDataList() {
                this.dataList = await getBlacklistList(this.size, this.search);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>