<template>
    <div class="opened-object-permissions">
        <object-header
            :primaryText="computePrimaryText"
            :primaryAction="save"
            close
        >
        {{$t('objects.permissions.object.operations')}} | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
             <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                ></component>
             </template>
         </tabs-component>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import openedObjectPermissionsGeneral from './opened-object-permissions-general.vue';
    import openedObjectPermissionsDefaults from './opened-object-permissions-defaults.vue';

    export default {
        name: 'opened-object-permissions',
        components: {
            openedObjectPermissionsGeneral,
            openedObjectPermissionsDefaults,
        },
        mixins: [editComponentMixin],
        data() {
            return {};
        },

        mounted() {
            this.id = this.$route.params.id;
        },

        computed: {
            ...mapState('permissions/objects', {
                itemInstance: (state) => state.itemInstance,
                dataList: (state) => state.dataList,
                page: (state) => state.page,
                isNextPage: (state) => state.isNextPage,
            }),
            id: {
                get() {
                    return this.$store.state.permissions.objects.itemId;
                },
                set(value) {
                    this.setId(value);
                },
            },
            tabs() {
                const tabs = [{
                        text: this.$t('objects.permissions.object.ObAC'),
                        value: 'general',
                    }, {
                        text: this.$t('objects.permissions.object.RbAC'),
                        value: 'defaults',
                    }];
                return tabs;
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
        },
    };
</script>

<style lang="scss" scoped>

</style>
