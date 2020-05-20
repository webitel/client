<template>
    <div class="opened-object-permissions">
        <object-header
                hide-primary-action
                close
        >
            <span class="tt-capitalize">{{headerTitle}}</span>
            | {{$t('objects.edit')}}
        </object-header>

        <role-popup
                v-if="popupTriggerIf"
                @close="popupTriggerIf = false"
        ></role-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.permissions.object.operations')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                    <i
                            class="icon-icon_plus icon-action"
                            :title="$t('iconHints.add')"
                            @click="popupTriggerIf = true"
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

                <template slot="grantee" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].grantee.name}}
                    </div>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__c"
                            :value="dataList[props.rowIndex].access.c"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'c', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__r"
                            :value="dataList[props.rowIndex].access.r"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'r', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__u"
                            :value="dataList[props.rowIndex].access.u"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'u', index: props.rowIndex})"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__d"
                            :value="dataList[props.rowIndex].access.d"
                            :label="$t('objects.allow')"
                            @input="patchItem({prop: 'd', index: props.rowIndex})"
                    ></checkbox>
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
    import rolePopup from './opened-object-permissions-role-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {mapActions, mapState} from "vuex";
    import {getObject} from "../../../api/permissions/objects/objects";

    export default {
        name: "opened-object-permissions",
        mixins: [tableComponentMixin, editComponentMixin],
        components: {rolePopup},
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'grantee', title: this.$t('objects.name')},
                    {name: 'create', title: this.$t('objects.create')},
                    {name: 'read', title: this.$t('objects.read')},
                    {name: 'edit', title: this.$t('objects.edit')},
                    {name: 'delete', title: this.$t('objects.delete')},
                ],
                headerTitle: '', // header title. retieves from object GET request

            };
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadList();
            // get object title to show on page header
            this.loadHeaderTitle(this.id);
        },

        computed: {
            ...mapState('permissions/objects', {
                dataList: state => state.itemPermissionsDataList,
                page: state => state.itemPage, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isItemNextPage,
            }),
            id: {
                get() {
                    return this.$store.state.permissions.objects.itemId
                },
                set(value) {
                    this.setId(value)
                }
            },

            size: {
                get() {return this.$store.state.permissions.objects.itemSize},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.permissions.objects.itemSearch},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            ...mapActions('permissions/objects', {
                setId: 'SET_ITEM_ID',
                setItemProp: 'SET_ITEM_PROPERTY',
                loadDataList: 'LOAD_ITEM_PERMISSIONS_DATA_lIST',
                patchItem: 'PATCH_ITEM_PERMISSIONS',
                setSize: 'SET_ITEM_PERMISSIONS_SIZE',
                setSearch: 'SET_ITEM_PERMISSIONS_SEARCH',
                nextPage: 'NEXT_ITEM_PERMISSIONS_PAGE',
                prevPage: 'PREV_ITEM_PERMISSIONS_PAGE',
            }),

            // get object title to show on page header
            async loadHeaderTitle(id) {
                this.headerTitle = await getObject(id);
            },
        },
    }
</script>

<style lang="scss" scoped>

</style> 