<template>
    <div>
        <object-header
                :primary-text="computePrimaryText"
                :primary-action="save"
                :hide-primary="!hasSaveActionAccess"
                :primary-disabled="computeDisabled"
                :secondary-action="close"
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
    import General from './opened-calendar-general.vue';
    import WorkWeek from './opened-calendar-work-week.vue';
    import Holidays from './opened-calendar-holidays.vue';
    import { timerangeNotIntersect, timerangeStartLessThanEnd } from '../../../utils/validators';
    import headlineNavMixin from '../../../mixins/baseMixins/headlineNavMixin/headlineNavMixin';

    export default {
        name: 'opened-calendar',
        mixins: [editComponentMixin, headlineNavMixin],
        components: {
            WorkWeek,
            Holidays,
            General,
        },
        data() {
            return {
              namespace: 'lookups/calendars',
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required,
                },
                timezone: {
                    required,
                },
                accepts: {
                    timerangeNotIntersect,
                    $each: {
                        timerangeStartLessThanEnd,
                    },
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/calendars', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.lookups.calendars.itemId;
                },
                set(value) {
                    this.setId(value);
                },
            },

            tabs() {
                const tabs = [
                    { value: 'general', text: this.$t('objects.general') },
                    { value: 'work-week', text: this.$t('objects.lookups.calendars.workWeek') },
                    { value: 'holidays', text: this.$t('objects.lookups.calendars.holidays') },
                ];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },

          path() {
              const baseUrl = '/lookups/calendars';
            return [
              { name: this.$t('objects.lookups.lookups') },
              { name: this.$tc('objects.lookups.calendars.calendars', 2), route: baseUrl },
              {
                name: this.id ? this.pathName : this.$t('objects.new'),
                route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
              },
            ];
          },
        },

        methods: {
            ...mapActions('lookups/calendars', {
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
