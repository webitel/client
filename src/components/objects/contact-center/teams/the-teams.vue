<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.teams.teams', 2)}}
        </object-header>

        <history-popup
                v-if="historyId"
                @close="historyId = null"
        ></history-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.teams.allTeams')}}
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
                    <i
                            class="icon-icon_approve icon-action"
                    ></i>
                    <i
                            class="icon-icon_approve icon-action"
                            @click="historyPopupTriggerIf = true"
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

                <template slot="strategy" slot-scope="props">
                    <span>
                        {{dataList[props.rowIndex].strategy}}
                    </span>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="read(dataList[props.rowIndex].id)"
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
            ></pagination>
        </section>
    </div>
</template>

<script>
    import historyPopup from './team-history-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";


    export default {
        name: "the-teams",
        mixins: [tableComponentMixin],
        components: {historyPopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'strategy', title: this.$t('objects.ccenter.teams.strategy')},
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/teams', {
                dataList: state => state.dataList,
                historyId: state => state.itemId
            }),

            size: {
                get() {return this.$store.state.ccenter.teams.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.teams.search},
                set(value) {this.setSearch(value)}
            },

            historyId: {
                get() {return this.$store.state.ccenter.teams.itemId},
                set(value) {this.read(value)}
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

            ...mapActions('ccenter/teams', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                read: 'SET_ITEM_ID',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_ITEM',
            }),
        },

    }
</script>