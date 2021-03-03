<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :hide-primary="!hasSaveActionAccess"
                :primaryDisabled="computeDisabled"
                close
                @close="resetState"
        >
          <headline-nav :path="path"></headline-nav>
        </object-header>
        <tabs-component
                :tabs="tabs"
                root=""
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                        :namespace="namespace"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import General from './opened-blacklist-general.vue';
    import Numbers from './opened-blacklist-numbers.vue';
    import headlineNavMixin from '../../../mixins/baseMixins/headlineNavMixin/headlineNavMixin';

    export default {
        name: 'opened-blacklist',
        components: {
            General,
            Numbers,
        },
        mixins: [editComponentMixin, headlineNavMixin],

        data() {
            return {
              namespace: 'lookups/blacklists',
            };
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/blacklists', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.lookups.blacklists.itemId;
                },
                set(value) {
                    this.setId(value);
                },
            },

            tabs() {
                const tabs = [{
                        text: this.$t('objects.general'),
                        value: 'general',
                    }, {
                        text: this.$tc('objects.lookups.blacklist.number', 2),
                        value: 'numbers',
                    }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },

          path() {
              const baseUrl = '/lookups/blacklist';
            return [
              { name: this.$t('objects.lookups.lookups') },
              { name: this.$tc('objects.lookups.blacklist.blacklist', 2), route: baseUrl },
              {
                name: this.id ? this.pathName : this.$t('objects.new'),
                route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
              },
            ];
          },
        },

        methods: {
            ...mapActions('lookups/blacklists', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                resetState: 'RESET_ITEM_STATE',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
