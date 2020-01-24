<template>
    <div>
        <object-header
                hide-primary-action
        >
            {{$t('objects.permissions.permissions')}} |
            {{$t('objects.permissions.object.object')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.permissions.object.allObjects')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadDataList"
                    ></search>
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
                            {{dataList[props.rowIndex].class}}
                        </span>
                    </div>
                </template>

                <template slot="obac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__obac"
                            :value="dataList[props.rowIndex].obac"
                            @input="toggleItemProperty({prop: 'obac', index: props.rowIndex})"
                    ></switcher>
                </template>

                <template slot="rbac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__rbac"
                            :value="dataList[props.rowIndex].rbac"
                            @input="toggleItemProperty({prop: 'rbac', index: props.rowIndex})"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_actionsTableField_1} from "@/utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-objects-permissions",
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'obac', title: this.$t('objects.permissions.object.ObAC')},
                    {name: 'rbac', title: this.$t('objects.permissions.object.RbAC')},
                    _actionsTableField_1,
                ],
            };
        },

        computed: {
            ...mapState('permissions/objects', {
                dataList: state => state.dataList,
            }),

            search: {
                get() {return this.$store.state.permissions.objects.search},
                set(value) {this.setSearch(value)}
            }
        },

        methods: {
            edit(rowId) {
                this.$router.push({
                    name: 'permissions-objects-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('permissions/objects', {
                loadDataList: 'LOAD_DATA_LIST',
                setSearch: 'SET_SEARCH',
                toggleItemProperty: 'TOGGLE_ITEM_PROPERTY'
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>