<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.permissions.permissions')}} |
            {{$tc('objects.permissions.permissionsRole', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.permissions.allRoles')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
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

                <template slot="description" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].description}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i
                            class="vuetable-action icon-icon_edit"
                            :title="$t('iconHints.edit')"
                            @click="edit(props.rowIndex)"
                    ></i>
                    <i
                            class="vuetable-action icon-icon_delete"
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
    import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'the-roles',
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'description', title: this.$t('objects.description') },
                    _actionsTableField_2,
                ],
            };
        },

        computed: {
            ...mapState('permissions/roles', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.permissions.roles.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.permissions.roles.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {
            create() {
                this.$router.push('/permissions/roles/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'permissions-roles-edit',
                    params: { id: this.dataList[rowId].id },
                });
            },

            ...mapActions('permissions/roles', {
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
