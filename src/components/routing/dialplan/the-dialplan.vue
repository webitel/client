<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$t('objects.routing.dialplan.dialplan')}}
        </object-header>

        <section class="object-content dialplan">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.dialplan.dialplanRules')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            @click="loadList"
                    ></i>
                </div>
            </header>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
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
                            :value="!dataList[props.rowIndex].disabled"
                            @input="toggleSwitchProperty(props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <div
                            class="vuetable-action dialplan-arrow-wrap"
                            v-show="props.rowIndex !== 0"
                            @click="moveRowTop(props.rowIndex)"
                    >
                        <i class="dialplan-arrow icon-icon_dialplan-arrow-up"></i>
                    </div>
                    <div
                            class="vuetable-action dialplan-arrow-wrap"
                            v-show="props.rowIndex !== dataList.length-1"
                            @click="moveRowBottom(props.rowIndex)"
                    >
                        <i class="dialplan-arrow icon-icon_dialplan-arrow-down"></i>
                    </div>
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
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
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '../../../mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_4, _switcherWidth} from "../../../utils/tableFieldPresets";
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
                    _actionsTableField_4,
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
                get() {
                    return this.$store.state.routing.dialplan.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.routing.dialplan.search
                },
                set(value) {
                    this.setSearch(value)
                }
            }
        },

        methods: {
            moveRowTop(rowIndex) {
                const tmp = this.dataList[rowIndex];
                this.dataList[rowIndex] = this.dataList[rowIndex - 1];
                this.dataList[rowIndex - 1] = tmp;
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
                moveRowBottom: 'MOVE_ROW_BOTTOM',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .dialplan .vuetable .vuetable-action.dialplan-arrow-wrap {
        width: 24px;
        height: 24px;
        background: transparent;
        border-radius: 50%;
        transition: $transition;
        margin-right: 0;


        &:hover {
            background: $accent-color;

            i:before {
                color: #fff;
            }
        }
    }

    .icon-icon_edit {
        margin-left: 25px;
    }
</style>