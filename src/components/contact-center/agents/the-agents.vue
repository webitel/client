<template>
    <div>
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.agents.agents', 2)}}
        </object-header>

        <history-popup
                v-if="historyId"
                @close="historyId = null"
        ></history-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.ccenter.agents.allAgents')}}
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
                <template slot="user" slot-scope="props">
                    <div>
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{dataList[props.rowIndex].user.name}}
                        </span>
                    </div>
                </template>

                <template slot="state" slot-scope="props">
                    <status
                            :class="{'status__true': dataList[props.rowIndex].status === 'online',
                            'status__info': dataList[props.rowIndex].status === 'pause'}"
                            :text=computeOnlineText(dataList[props.rowIndex].status)
                    >
                    </status>
                </template>

                <template slot="time" slot-scope="props">
                    <div>
                        {{prettySeconds(dataList[props.rowIndex].statusDuration)}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_read"
                       :title="$t('iconHints.history')"
                       @click="read(dataList[props.rowIndex].id)"
                    ></i>
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
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_3 } from '@/utils/tableFieldPresets';
    import { mapActions, mapState } from 'vuex';
    import historyPopup from './agent-history-popup';

    export default {
        name: 'the-agents',
        mixins: [tableComponentMixin],
        components: { historyPopup },
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    { name: 'user', title: this.$tc('objects.directory.users.users', 1) },
                    { name: 'state', title: this.$t('objects.ccenter.agents.state') },
                    { name: 'time', title: this.$t('objects.ccenter.agents.stateTime') },
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('ccenter/agents', {
                dataList: (state) => state.dataList,
                page: (state) => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() { return this.$store.state.ccenter.agents.size; },
                set(value) { this.setSize(value); },
            },

            search: {
                get() { return this.$store.state.ccenter.agents.search; },
                set(value) { this.setSearch(value); },
            },

            historyId: {
                get() { return this.$store.state.ccenter.agents.history.itemId; },
                set(value) { this.read(value); },
            },
        },

        methods: {
            prettySeconds(seconds) {
                const date = new Date(seconds * 1000);
                let hh = date.getUTCHours();
                let mm = date.getUTCMinutes();
                let ss = date.getSeconds();
                if (hh < 10) { hh = `0${hh}`; }
                if (mm < 10) { mm = `0${mm}`; }
                if (ss < 10) { ss = `0${ss}`; }

                return `${hh}:${mm}:${ss}`;
            },

            computeOnlineText(state) {
                switch (state) {
                    case 'online':
                        return 'Online';
                    case 'pause':
                        return 'Pause';
                    default:
                        return 'Offline';
                }
            },

            create() {
                this.$router.push('/contact-center/agents/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-agent-edit',
                    params: { id: this.dataList[rowId].id },
                });
            },

            ...mapActions('ccenter/agents', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                read: 'SET_HISTORY_ITEM_ID',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    };
</script>
