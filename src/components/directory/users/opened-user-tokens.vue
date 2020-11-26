<template>
    <section>
        
        <token-popup
                    v-if="isPopup"
                    @close="closePopup"
        ></token-popup>

        <token-created-popup
                    v-if="isTokenGenerated"
                    @close="closeTokenPopup"
        ></token-created-popup>

        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.directory.users.token', 2)}}</h3>
            
            <div class="content-header__actions-wrap">
            <wt-table-actions
                :icons="['refresh']"
                @input="tableActionsHandler"
            ></wt-table-actions>
                <i
                        class="icon-action icon-icon_plus"
                        :title="$t('iconHints.add')"
                        @click="create"
                ></i>
            </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>

        <wt-table
                v-show="isLoaded"
                :api-mode="false"
                :headers="fields"
                :data="dataList"
        >
            <template slot="usage" slot-scope="{item}">
                <div>
                    {{item.usage}}
                </div>
            </template>

            <template slot="createdBy" slot-scope="{item}">
                <div>
                    {{item.createdBy.name}}
                </div>
            </template>

            <template slot="createdAt" slot-scope="{item}">
                <div>
                    {{convertTimeHHMMSS(item.createdAt)}}
                </div>
            </template>

            <template slot="actions" slot-scope="{item}">
                <i class="vuetable-action icon-icon_delete"
                @click="remove(item)"
                ></i>
            </template>

        </wt-table>
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
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';
    import tableComponentMixin from '../../../mixins/tableComponentMixin';
    import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
    import tokenPopup from './opened-user-tokens-popup.vue';
    import tokenCreatedPopup from './opened-user-tokens-created-popup.vue';
    import tableActionsHandlerMixin from '../../../mixins/tableActionsMixin';

    export default {
        name: 'opened-user-tokens',
        mixins: [openedTabComponentMixin, tableComponentMixin, tableActionsHandlerMixin],
        components: { tokenPopup,  tokenCreatedPopup},

        data() {
            return {
                fields: [
                    { value: 'usage', text: this.$t('objects.directory.users.usage') },
                    { value: 'createdAt', text: this.$t('objects.directory.users.createdAt') },
                    { value: 'createdBy', text: this.$t('objects.directory.users.createdBy') },
                ],
                isPopup: false,
                isTokenGenerated: false,
            };
        },

        watch: {
            parentId(value) {
                this.setParentId(value);
            },
        },

        computed: {
            ...mapState('directory/users', {
                parentId: (state) => state.itemId,
            }),

            ...mapState('directory/users/tokens', {
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),           

            size: {
                get() {
                    return this.$store.state.directory.users.tokens.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.directory.users.tokens.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {
            async create() {
                if (!this.checkValidations()) {
                    if (!this.id) await this.addParentItem();
                    this.isPopup = true;
                } else {
                    eventBus.$emit('notificationError', 'Check your validations!');
                }
            },

            closePopup() {                
                this.isPopup = false;
                if(this.$store.state.directory.users.tokens.itemInstance.token !== '') {
                   this.isTokenGenerated = true; 
                }
            },

            closePopup() {                
                this.isPopup = false;
                if(this.$store.state.directory.users.tokens.itemInstance.token !== '') {
                   this.isTokenGenerated = true; 
                }
            },

            closeTokenPopup() {
                this.isTokenGenerated = false; 
            },

            convertTimeHHMMSS(value) {
                const time = new Date(+value).toISOString().substr(0, 19).replace('T', ' ');
                return time.includes('00:0') ? time.substr(3) : time;
            },

            ...mapActions('directory/users', {
                addParentItem: 'ADD_ITEM',
            }),

            ...mapActions('directory/users/tokens', {
                setParentId: 'SET_PARENT_ITEM_ID',
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
            }),
        },
    };
</script>

<style scoped>
</style>
