<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.res.res', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.res.allRes')}}
                </h3>
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

                <template slot="gateway" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].gateway.name}}
                    </div>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            class="test__resources__enable-switcher"
                            :value="dataList[props.rowIndex].enabled"
                            @input="toggleDataProperty({index: props.rowIndex, prop: 'enabled'})"
                    >
                    </switcher>
                </template>

                <template slot="reserve" slot-scope="props">
                    <switcher
                            class="test__resources__reserve-switcher"
                            :value="dataList[props.rowIndex].reserve"
                            @input="toggleDataProperty({index: props.rowIndex, prop: 'reserve'})"
                    >
                    </switcher>
                </template>

                <template slot="actions" slot-scope="props">
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
    import {_checkboxTableField, _actionsTableField_2, _switcherWidth} from "../../../utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-resources",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'gateway', title: this.$tc('objects.routing.gateways.gateways', 1)},
                    {name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth},
                    {name: 'reserve', title: this.$t('objects.ccenter.res.reserve'), width: _switcherWidth},
                    _actionsTableField_2,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/res', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.res.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.res.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            create() {
                this.$router.push('/contact-center/resource/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-resource-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('ccenter/res', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                toggleDataProperty: 'TOGGLE_ITEM_PROPERTY',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    }
</script>