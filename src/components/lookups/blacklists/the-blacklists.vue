<template>
    <div class="content-wrap">
      <object-header
        :hide-primary="!isCreateAccess"
        :primary-action="create"
      >
          <headline-nav :path="path"></headline-nav>
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.blacklist.allBlacklists')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            v-if="isDeleteAccess"
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                </div>
            </header>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="name" slot-scope="props">
                    <div>
                        <span class="nameLink" @click="edit(props.rowIndex)">
                          {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="numbers" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].count || '0'}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_download"
                       :title="$t('iconHints.download')"
                       @click="download(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       :title="$t('iconHints.edit')"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       v-if="isDeleteAccess"
                       :title="$t('iconHints.delete')"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_3 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import { downloadAsCSV } from '../../../utils/download';
    import { getBlacklistCommunicationList } from '../../../api/lookups/blacklists/blacklistNumbers';
    import RouteNames from '../../../router/_internals/RouteNames.enum';

    export default {
        name: 'the-blacklists',
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'numbers', title: this.$t('objects.lookups.blacklist.numbersCount') },
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('lookups/blacklists', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.blacklists.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.lookups.blacklists.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
          path() {
            return [
              { name: this.$t('objects.lookups.lookups') },
              { name: this.$tc('objects.lookups.blacklist.blacklist', 2), route: '/lookups/blacklist' },
            ];
          },
        },

        methods: {
            create() {
                this.$router.push({ name: `${RouteNames.BLACKLIST}-new` });
            },

            edit(rowId) {
                this.$router.push({
                    name: `${RouteNames.BLACKLIST}-edit`,
                    params: { id: this.dataList[rowId].id },
                });
            },

            async download(rowId) {
                const list = this.dataList[rowId];
                const listNumbers = await getBlacklistCommunicationList(list.id, 0, 100);

                let dataStr = 'data:text/csv;charset=utf-8,';
                dataStr += 'number,description\n';
                listNumbers.forEach((item) => {
                    dataStr += encodeURIComponent(
                        `${item.number},${item.description || 'aa'}\n`,
                    );
                });
                downloadAsCSV(dataStr, `${list.name}-numbers.csv`);
            },

            ...mapActions('lookups/blacklists', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
