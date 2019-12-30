<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.ccenter.ccenter')}} |
            {{$tc('objects.ccenter.buckets.buckets', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.ccenter.buckets.allBuckets')}}</h3>
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

                <template slot="description" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
                    </div>
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
            ></pagination>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_actionsTableField_2} from "../../../../utils/tableFieldPresets";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-agent-buckets",
        mixins: [tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_2
                ],
            };
        },

        computed: {
            ...mapState('ccenter/buckets', {
                dataList: state => state.dataList,
            }),

            size: {
                get() {return this.$store.state.ccenter.buckets.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.buckets.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            create() {
                this.$router.push('/contact-center/buckets/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'cc-bucket-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            ...mapActions('ccenter/buckets', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: '',
                prevPage: '',
                removeItem: 'REMOVE_ITEM',
            }),
        }
    }
</script>

<style scoped>

</style>