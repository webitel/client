<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
          <headline-nav :path="path"></headline-nav>
        </object-header>
        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import openedBucketPermissions from './opened-bucket-permissions';
    import openedBucketGeneral from './opened-bucket-general';
    import headlineNavMixin from '../../../mixins/headlineNavMixin/headlineNavMixin';

    export default {
        name: 'opened-bucket',
        mixins: [editComponentMixin, headlineNavMixin],
        components: { openedBucketGeneral, openedBucketPermissions },

        data() {
            return {};
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
            ...mapState('ccenter/buckets', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() { return this.$store.state.ccenter.buckets.itemId; },
                set(value) { this.setId(value); },
            },

            tabs() {
                const tabs = [{
                    text: this.$t('objects.general'),
                    value: 'general',
                }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },

          path() {
              const baseUrl = '/contact-center/buckets';
            return [
              { name: this.$t('objects.ccenter.ccenter') },
              { name: this.$tc('objects.ccenter.buckets.buckets', 2), route: baseUrl },
              {
                name: this.id ? this.pathName : this.$t('objects.new'),
                route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
              },
            ];
          },
        },

        methods: {
            ...mapActions('ccenter/buckets', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>

<style scoped>

</style>
