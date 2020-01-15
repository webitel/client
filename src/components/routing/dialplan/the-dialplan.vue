<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$t('objects.routing.dialplan.dialplan')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.dialplan.dialplanRules')}}</h3>
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
                    <i
                            class="icon-icon_nav-integrations icon-action"
                            @click="loadDataList"
                    ></i>
                </div>
            </header>

            <vuetable
                    ref="vuetable"
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

                <template slot="pattern" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].pattern}}
                    </div>
                </template>

                <template slot="schema" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].schema.name || 'schema IS EMPTY'}}
                    </div>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            v-model="dataList[props.rowIndex].enabled"
                            disabled
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_pull"
                       @click="moveRowTop(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-model="size"
                    @loadDataList="loadDataList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3, _switcherWidth} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-dialplan",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'pattern', title: this.$t('objects.routing.dialplan.pattern')},
                    {name: 'schema', title: this.$tc('objects.routing.schema', 1)},
                    {name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth},
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('routing/dialplan', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.routing.dialplan.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.routing.dialplan.search},
                set(value) {this.setSearch(value)}
            }
        },

        methods: {
            moveRowTop(rowIndex) {
                const tmp = this.dataList[rowIndex];
                this.dataList[rowIndex] = this.dataList[rowIndex-1];
                this.dataList[rowIndex-1] = tmp;
            },

            create() {
                this.$router.push('/routing/dialplan/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'dialplan-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('routing/dialplan', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                toggleSwitchProperty: 'TOGGLE_ITEM_PROPERTY',
                moveRowTop: 'MOVE_ROW_TOP',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>