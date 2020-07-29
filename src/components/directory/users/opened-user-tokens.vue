<template>
    <section>


    <header class="content-header">
        <h3 class="content-title">{{$tc('objects.directory.users.token', 2)}}</h3>
        <div class="content-header__actions-wrap">
           <i
                    class="icon-icon_reload icon-action"
                    :title="$t('iconHints.reload')"
                    @click="loadList"
            ></i>
            <i
                    class="icon-action icon-icon_plus"
                    :title="$t('iconHints.add')"
                    @click="create"
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
        <template slot="usage" slot-scope="props">
            <div>
                {{dataList[props.rowIndex].usage}}
            </div>
        </template>

        <template slot="createdBy" slot-scope="props">
            <div>
                {{dataList[props.rowIndex].createdBy.name}}
            </div>
        </template>

        <template slot="createdAt" slot-scope="props">
            <div>
                {{convertTimeHHMMSS(dataList[props.rowIndex].createdAt)}}
            </div>
        </template>

        <template slot="actions" slot-scope="props">
            <i class="vuetable-action icon-icon_delete"
               @click="remove(props.rowIndex)"
            ></i>
        </template>

    </vuetable>
    </section>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import openedTabComponentMixin from "../../../mixins/openedTabComponentMixin";
    import tableComponentMixin from "../../../mixins/tableComponentMixin";
    import eventBus from '../../../utils/eventBus';

    export default {
        name: "opened-user-tokens",
        mixins: [openedTabComponentMixin, tableComponentMixin],

        data() {
            return {
                fields: [
                    { name: 'usage', title: 'Usage' },
                    { name: 'createdAt', title: 'Created at' },
                    { name: 'createdBy', title: 'Created by' },
                ],
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
            }),
        },

        methods: {
            async create() {
                if (!this.checkValidations()) {
                    if (!this.id) await this.addParentItem();
                    this.popupTriggerIf = true;
                } else {
                    eventBus.$emit('notificationError', 'Check your validations!');
                }
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
            }),
        },
    }
</script>

<style scoped>

</style>