<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.integrations.integrations')}} |
            {{$t('objects.integrations.storage.storage')}}
        </object-header>

        <storage-popup
            v-if="popupTriggerIf"
            @close="popupTriggerIf = false"
        ></storage-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.integrations.storage.allStorages')}}</h3>
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
                            class="icon-icon_reload icon-action"
                            @click="loadDataList"
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

                <template slot="space" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].space}}
                    </div>
                </template>

                <template slot="lifetime" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].lifetime}}
                    </div>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            :value="dataList[props.rowIndex].enabled"
                            @input="toggleItemProperty"
                    ></switcher>
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
    import storagePopup from './create-storage-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2, _switcherWidth} from "../../../utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-storage",
        mixins: [tableComponentMixin],
        components: {storagePopup},
        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'type', title: this.$t('objects.integrations.storage.type')},
                    {name: 'space', title: this.$t('objects.integrations.storage.space')},
                    {name: 'lifetime', title: this.$t('objects.integrations.storage.lifetime')},
                    {name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth},
                    _actionsTableField_2
                ],
            };
        },

        computed: {
            ...mapState('integrations/storage', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.integrations.storage.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.integrations.storage.search
                },
                set(value) {
                    this.setSearch(value)
                }
            },
        },

        methods: {
            create() {
                this.popupTriggerIf = true;
            },

            edit(rowId) {
                this.$router.push({
                    name: 'storage-edit',
                    params: {
                        type: this.dataList[rowId].type,
                        id: this.dataList[rowId].id
                    },
                });
            },

            ...mapActions('integrations/storage', {
                loadDataList: 'LOAD_DATA_LIST',
                toggleItemProperty: '',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>