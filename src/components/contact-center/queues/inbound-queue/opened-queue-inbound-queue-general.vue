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

            <dropdown-select
                    v-model="ringtone"
                    :v="v.itemInstance.ringtone"
                    :options="dropdownOptionsMediaList"
                    :label="$t('objects.ccenter.queues.ringtone')"
                    @search="loadDropdownOptionsMediaList"
            ></dropdown-select>

            <form-input
                    v-model="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getCalendarList } from '../../../../api/lookups/calendars/calendars';
    import { getTeamsList } from '../../../../api/contact-center/teams/teams';
    import { getBlacklistList } from '../../../../api/lookups/blacklists/blacklists';
    import { getMediaList } from '../../../../api/lookups/media/media';

    export default {
        name: 'opened-queue-inbound-queue-general',
        mixins: [openedTabComponentMixin],
        data() {
            return {
                dropdownOptionsCalendarList: [],
                dropdownOptionsBlacklistList: [],
                dropdownOptionsPriorityList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                dropdownOptionsTeamList: [],
                dropdownOptionsMediaList: [],
            };
        },

        mounted() {
            this.loadDropdownOptionsCalendarList();
            this.loadDropdownOptionsBlacklistList();
            this.loadDropdownOptionsTeamList();
            this.loadDropdownOptionsMediaList();
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

            ringtone: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.ringtone;
                },
                set(value) {
                    this.setItemProp({ prop: 'ringtone', value });
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
        },

        methods: {
            async loadDropdownOptionsCalendarList(search) {
                const response = await getCalendarList(0, 10, search);
                this.dropdownOptionsCalendarList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
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

            async loadDropdownOptionsMediaList(search) {
                const response = await getMediaList(0, 10, search);
                this.dropdownOptionsMediaList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
