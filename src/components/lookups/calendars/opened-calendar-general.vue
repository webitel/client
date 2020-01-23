<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="timezone"
                    :options="dropdownOptionsList"
                    :label="$t('objects.lookups.calendars.timezone')"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="calendars__dates">
                <div class="switcher-label-wrap">
                    <div class="label">{{$t('objects.lookups.calendars.fulltime')}}</div>
                    <switcher
                            v-model="expires"
                    ></switcher>
                </div>
                <div class="calendars__date-wrap">
                    <datepicker
                            v-model="startAt"
                            :label="$t('objects.lookups.calendars.start')"
                            :disabled="!expires"
                    ></datepicker>
                    <datepicker
                            v-model="endAt"
                            :label="$t('objects.lookups.calendars.end')"
                            :disabled="!expires"
                    ></datepicker>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import datepicker from '@/components/utils/datepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getCalendarTimezones} from "../../../api/lookups/calendars/calendars";
    import {mapActions} from "vuex";

    export default {
        name: "opened-calendar-general",
        mixins: [openedTabComponentMixin],
        components: {
            datepicker,
        },

        data() {
            return {
                dropdownOptionsList: [],
            }
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            name: {
                get() {return this.$store.state.lookups.calendars.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            timezone: {
                get() {return this.$store.state.lookups.calendars.itemInstance.timezone},
                set(value) {this.setItemProp({prop: 'timezone', value})}
            },
            description: {
                get() {return this.$store.state.lookups.calendars.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
            expires: {
                get() {return this.$store.state.lookups.calendars.itemInstance.expires},
                set(value) {this.setItemProp({prop: 'expires', value})}
            },
            startAt: {
                get() {return this.$store.state.lookups.calendars.itemInstance.startAt},
                set(value) {this.setItemProp({prop: 'startAt', value})}
            },
            endAt: {
                get() {return this.$store.state.lookups.calendars.itemInstance.endAt},
                set(value) {this.setItemProp({prop: 'endAt', value})}
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                this.dropdownOptionsList = await getCalendarTimezones(0, 10, search);
            },

            ...mapActions('lookups/calendars', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .switcher-label-wrap {
        margin: 0 0 28px;

        .switcher {
            margin-top: 7px;
        }
    }

    .calendars__date-wrap {
        display: flex;
        align-items: center;

        .datepicker:first-child {
            margin-right: 28px;
        }
    }
</style>