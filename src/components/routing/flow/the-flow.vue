<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$tc('objects.routing.flow.flow', 2)}}
        </object-header>

        <flow-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></flow-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.flow.allFlowSchemas')}}</h3>
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

                <template slot="type" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].type}}
                    </div>
                </template>

                <template slot="debug" slot-scope="props">
                    <switcher
                            v-model="dataList[props.rowIndex].debug"
                            disabled
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_notification"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
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
    import flowPopup from './create-flow-popup';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-flow",
        mixins: [tableComponentMixin],
        components: {flowPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.routing.flow.type')},
                    {name: 'debug', title: this.$t('objects.routing.flow.debug'), width: _switcherWidth},
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('routing/flow', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.routing.flow.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.routing.flow.search},
                set(value) {this.setSearch(value)}
            }
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                this.$router.push({
                    name: 'flow-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('routing/flow', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                toggleSwitchProperty: 'TOGGLE_ITEM_PROPERTY',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>