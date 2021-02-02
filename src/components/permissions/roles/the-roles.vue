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
                <h3 class="content-title">{{$t('objects.permissions.allRoles')}}</h3>
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

                <template slot="description" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].description}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i
                            class="vuetable-action icon-icon_edit"
                            v-if="isEditAccess"
                            :title="$t('iconHints.edit')"
                            @click="edit(props.rowIndex)"
                    ></i>
                    <i
                            class="vuetable-action icon-icon_delete"
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
    import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import RouteNames from '../../../router/_internals/RouteNames.enum';

    export default {
        name: 'the-roles',
        mixins: [tableComponentMixin],
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

          fields() {
            let fields = [
              _checkboxTableField,
              { name: 'name', title: this.$t('objects.name') },
              { name: 'description', title: this.$t('objects.description') },
            ];
            if (this.hasTableActions) fields = fields.concat(_actionsTableField_2);
            return fields;
          },
          path() {
            return [
              { name: this.$t('objects.permissions.permissions') },
              { name: this.$tc('objects.permissions.permissionsRole', 2), route: '/permissions/roles' },
           ];
          },
        },

        methods: {
            create() {
                this.$router.push({ name: `${RouteNames.ROLES}-new` });
            },

            edit(rowId) {
                this.$router.push({
                    name: `${RouteNames.ROLES}-edit`,
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
