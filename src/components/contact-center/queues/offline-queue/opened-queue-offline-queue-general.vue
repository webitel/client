<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="calendar"
                    :v="v.itemInstance.calendar"
                    :options="dropdownOptionsCalendarList"
                    :label="$tc('objects.lookups.calendars.calendars', 1)"
                    @search="loadDropdownOptionsCalendarList"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="strategy"
                    :v="v.itemInstance.strategy"
                    :options="dropdownOptionsStrategyList"
                    :label="$t('objects.ccenter.queues.strategy')"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="dncList"
                    :options="dropdownOptionsBlacklistList"
                    :label="$tc('objects.lookups.blacklist.blacklist', 1)"
                    @search="loadDropdownOptionsBlacklistList"
            ></dropdown-select>

            <dropdown-select
                    v-model="priority"
                    :options="dropdownOptionsPriorityList"
                    :label="$t('objects.ccenter.queues.priority')"
            ></dropdown-select>

            <dropdown-select
                    v-model="team"
                    :v="v.itemInstance.team"
                    :options="dropdownOptionsTeamList"
                    :label="$tc('objects.ccenter.teams.teams', 1)"
                    @search="loadDropdownOptionsTeamList"
                    required
            ></dropdown-select>

            <form-input
                    v-model="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="switcher-label-wrap">
                <div class="label">{{$t('objects.ccenter.queues.recordings')}}</div>
                <switcher
                        v-model="recordings"
                ></switcher>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getTeamsList } from '../../../../api/contact-center/teams/teams';
    import { getCalendarList } from '../../../../api/lookups/calendars/calendars';
    import { getBlacklistList } from '../../../../api/lookups/blacklists/blacklists';

    export default {
        name: 'opened-queue-offline-queue-general',
        mixins: [openedTabComponentMixin],

        data() {
            return {
                dropdownOptionsCalendarList: [],
                dropdownOptionsBlacklistList: [],
                dropdownOptionsStrategyList: [
                    { name: 'FIFO', id: 1, value: 'fifo' },
                    { name: 'LIFO', id: 2, value: 'lifo' }
                ],
                dropdownOptionsPriorityList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                dropdownOptionsTeamList: [],
            };
        },

        mounted() {
            this.loadDropdownOptionsCalendarList();
            this.loadDropdownOptionsBlacklistList();
            this.loadDropdownOptionsTeamList();
        },

        computed: {
            name: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.name;
                },
                set(value) {
                    this.setItemProp({ prop: 'name', value });
                },
            },

            calendar: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.calendar;
                },
                set(value) {
                    this.setItemProp({ prop: 'calendar', value });
                },
            },

            strategy: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.strategy;
                },
                set(value) {
                    this.setItemProp({ prop: 'strategy', value });
                },
            },

            dncList: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.dncList;
                },
                set(value) {
                    this.setItemProp({ prop: 'dncList', value });
                },
            },

            priority: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.priority;
                },
                set(value) {
                    this.setItemProp({ prop: 'priority', value });
                },
            },

            team: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.team;
                },
                set(value) {
                    this.setItemProp({ prop: 'team', value });
                },
            },

            description: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.description;
                },
                set(value) {
                    this.setItemProp({ prop: 'description', value });
                },
            },

            recordings: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.recordings || false;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'recordings', value });
                },
            },
        },

        methods: {
            async loadDropdownOptionsCalendarList(search) {
                const response = await getCalendarList(0, 10, search);
                if(response && response.list) { 
                    this.dropdownOptionsCalendarList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
                }
            },

            async loadDropdownOptionsBlacklistList(search) {
                const response = await getBlacklistList(0, 10, search);
                this.dropdownOptionsBlacklistList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            async loadDropdownOptionsTeamList(search) {
                const response = await getTeamsList(0, 10, search);
                this.dropdownOptionsTeamList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
                setPayloadItemProp: 'SET_PAYLOAD_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
