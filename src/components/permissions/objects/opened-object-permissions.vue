<template>
    <wt-page-wrapper :actions-panel="false">
        <template slot="header">
            <wt-headline>
                <template slot="title">
                {{$t('objects.permissions.object.operations')}} |
                {{ computeTitle }}
                </template>
                <template slot="actions">
                    <wt-button color="secondary" @click="close">
                        {{ $t('objects.close') }}
                    </wt-button>
                </template>
            </wt-headline>
        </template>

        <template slot="main">
        <div class="main-container">
            <wt-tabs
                v-model="currentTab"

                :tabs="tabs"
            >
            </wt-tabs>
            <component
                :is="$options.name + '-' + currentTab.value"
            ></component>
        </div>
        </template>
    </wt-page-wrapper>
</template>

<script>
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import openedObjectPermissionsGeneral from './opened-object-permissions-general.vue';
    import openedObjectPermissionsDefaults from './opened-object-permissions-defaults.vue';
    import headlineNavMixin from '../../../mixins/baseMixins/headlineNavMixin/headlineNavMixin';

    export default {
        name: 'opened-object-permissions',
        components: {
            openedObjectPermissionsGeneral,
            openedObjectPermissionsDefaults,
        },
        mixins: [editComponentMixin, headlineNavMixin],
        data() {
            return {
                currentTab: {
                    value: 'general',
                },
            };
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
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

          path() {
              const baseUrl = '/permissions/objects';
            return [
              { name: this.$t('objects.permissions.permissions') },
              { name: this.$t('objects.permissions.object.object'), route: baseUrl },
              {
                name: this.pathName,
                route: `${baseUrl}/${this.id}`,
              },
            ];
          },
    },

        methods: {
            ...mapActions('permissions/objects', {
                setId: 'SET_ITEM_ID',
                setItemProp: 'SET_ITEM_PROPERTY',
                loadDataList: 'LOAD_ITEM_PERMISSIONS_DATA_lIST',
                loadItem: 'LOAD_ITEM',
                patchItem: 'PATCH_ITEM_PERMISSIONS',
                setSize: 'SET_ITEM_PERMISSIONS_SIZE',
                setSearch: 'SET_ITEM_PERMISSIONS_SEARCH',
                nextPage: 'NEXT_ITEM_PERMISSIONS_PAGE',
                prevPage: 'PREV_ITEM_PERMISSIONS_PAGE',
            }),
        },
      // override headlineNavMixin
      setPathName() {
          this.pathName = this.itemInstance.class;
      },
    };
</script>

<style lang="scss" scoped>

</style>
