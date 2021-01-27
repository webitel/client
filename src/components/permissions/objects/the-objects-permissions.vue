<template>
    <wt-page-wrapper class="devices" :actions-panel="false">
        <template slot="header">
            <wt-headline>
                <template slot="title">
                    {{$t('objects.permissions.permissions')}} |
                    {{$t('objects.permissions.object.object')}}
                </template>            
            </wt-headline>
        </template>

        <template slot="main">
            <section class="main-section__wrapper">
                <header class="content-header">
                    <h3 class="content-title">
                        {{$t('objects.permissions.object.allObjects')}}
                    </h3>
                    <div class="content-header__actions-wrap">
                        <wt-search-bar
                            :value="search"
                            debounce
                            @input="setSearch"
                            @search="loadList"
                            @enter="loadList"
                        ></wt-search-bar>
                        <wt-table-actions
                            :icons="['refresh']"
                            @input="tableActionsHandler"
                        ></wt-table-actions>
                    </div>
                </header>

                <wt-loader v-show="!isLoaded"></wt-loader>
                
                <div class="table-wrapper" v-show="isLoaded">
                    <wt-table
                        :headers="headers"
                        :data="dataList"
                    >
                        <template slot="name"  slot-scope="{ item }">
                            <span class="nameLink" @click="edit(item)">
                                {{ item.class }}
                            </span>
                        </template>

                        <template slot="obac" slot-scope="{ item }">
                            <wt-switcher
                                :value="item.obac"
                                @change="toggleItemProperty({prop: 'obac', item: item, value: $event})"
                            ></wt-switcher>                            
                        </template>

                        <template slot="rbac" slot-scope="{ item }">
                            <wt-switcher
                                :value="item.rbac"
                                @change="toggleItemProperty({prop: 'rbac', item: item, value: $event})"
                            ></wt-switcher>    
                        </template>
                        <template slot="actions" slot-scope="{ item }">
                        <wt-icon-btn
                            class="table-action"
                            icon="edit"
                            @click="edit(item)"
                        ></wt-icon-btn>
                        </template>
                    </wt-table>
                    <wt-pagination
                        :size="size"
                        :next="isNext"
                        :prev="page > 1"
                        debounce
                        @next="nextPage"
                        @prev="prevPage"
                        @input="setSize"
                        @change="loadList"
                    ></wt-pagination>
                </div>
            </section>
        </template>
    </wt-page-wrapper>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';

    export default {
        name: 'the-objects-permissions',
        mixins: [tableComponentMixin, tableActionsHandlerMixin],

        data() {
            return {
                headers: [
                    { value: 'name', text: this.$t('objects.name') },
                    { value: 'obac', text: this.$t('objects.permissions.object.ObAC') },
                    { value: 'rbac', text: this.$t('objects.permissions.object.RbAC') },                    
                ],
            };
        },

        computed: {
            ...mapState('permissions/objects', {
                dataList: (state) => state.dataList,
                page: (state) => state.itemPage,
                size: (state) => state.itemSize,
                search: (state) => state.itemSearch,
                isNext: (state) => state.isItemNextPage,
            }),
        },

        methods: {
            edit(item) {
                this.$router.push({
                    name: 'permissions-objects-edit',
                    params: { id: item.id },
                });
            },

            ...mapActions('permissions/objects', {
                loadDataList: 'LOAD_DATA_LIST',
                setSearch: 'SET_SEARCH',
                setSize: 'SET_SIZE',
                toggleItemProperty: 'TOGGLE_ITEM_PROPERTY',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/objects/table-page';
</style>
