<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.teams.teams', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.teams.allTeams')}}
                </h3>

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
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="strategy" slot-scope="props">
                    <span>
                        {{computeStrategyDisplay(dataList[props.rowIndex].strategy)}}
                    </span>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       :title="$t('iconHints.edit')"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
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
    import {strategiesList} from "../../../api/contact-center/teams/teams";
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-teams",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'strategy', title: this.$t('objects.ccenter.teams.strategy')},
                    _actionsTableField_2,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/teams', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            create() {
                this.$router.push('/contact-center/teams/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-team-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            computeStrategyDisplay(name) {
                return strategiesList[name] || name;
            },

            ...mapActions('ccenter/teams', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    }
</script>