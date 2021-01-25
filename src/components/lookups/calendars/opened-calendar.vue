<template>
    <div>
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
    import openedCalendarGeneral from './opened-calendar-general';
    import openedCalendarWorkWeek from './opened-calendar-work-week';
    import openedCalendarHolidays from './opened-calendar-holidays';
    import openedCalendarPermissions from './opened-calendar-permissions';
    import { timerangeNotIntersect, timerangeStartLessThanEnd } from '../../../utils/validators';
    import headlineNavMixin from '../../../mixins/headlineNavMixin/headlineNavMixin';

    export default {
        name: 'opened-calendar',
        mixins: [editComponentMixin, headlineNavMixin],
        components: {
            openedCalendarWorkWeek,
            openedCalendarHolidays,
            openedCalendarGeneral,
            openedCalendarPermissions,
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
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
