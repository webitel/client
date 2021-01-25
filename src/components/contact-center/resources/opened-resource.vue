<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
                @close="resetState"
        >
          <headline-nav :path="path"></headline-nav>
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { requiredArrayValue } from '@/utils/validators';
    import { mapActions, mapState } from 'vuex';
    import openedResourceGeneral from './opened-resource-general';
    import openedResourceNumbers from './opened-resource-numbers';
    import openedResourceFailure from './opened-resource-failure';
    import openedResourcePermissions from './opened-resource-permissions';

    export default {
        name: 'opened-resource',
        mixins: [editComponentMixin],
        components: {
            openedResourceGeneral,
            openedResourceNumbers,
            openedResourceFailure,
            openedResourcePermissions,
        },

        data() {
            return {};
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required,
                },
                gateway: {
                    required,
                },
                cps: {
                    required,
                },
                limit: {
                    required,
                },
                maxErrors: {
                    required,
                },
                // numberList: {
                //     requiredArrayValue
                // }
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/res', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.ccenter.res.itemId;
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
                    text: this.$tc('objects.ccenter.res.numbers', 2),
                    value: 'numbers',
                }, {
                    text: this.$t('objects.ccenter.res.failure'),
                    value: 'failure',
                }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },

          path() {
            const baseUrl = '/contact-center/resources';
            return [
              { name: this.$t('objects.ccenter.ccenter') },
              { name: this.$tc('objects.ccenter.res.res', 2), route: baseUrl },
              {
                name: this.id ? this.itemInstance.name : this.$t('objects.new'),
                route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
              },
            ];
          },
        },

        methods: {
            ...mapActions('ccenter/res', {
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
