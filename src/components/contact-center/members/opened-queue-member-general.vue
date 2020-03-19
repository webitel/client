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
                    v-model="priority"
                    :options="dropdownOptionsPriorityList"
                    :label="$t('objects.ccenter.queues.priority')"
            ></dropdown-select>

            <datetime-picker
                    v-model="expireAt"
                    :label="$t('objects.ccenter.queues.expire')"
            ></datetime-picker>

            <dropdown-select
                    v-model="bucket"
                    :options="dropdownOptionsBucketsList"
                    :label="$tc('objects.ccenter.buckets.buckets', 1)"
            ></dropdown-select>

            <dropdown-select
                    v-model="timezone"
                    :options="dropdownOptionsTimezoneList"
                    :label="$t('objects.ccenter.queues.timezone')"
                    @search="loadDropdownOptionsTimezoneList"
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import datepicker from '@/components/utils/datepicker';
    import datetimePicker from '../../utils/datetimepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";
    import {getBucketsList} from "../../../api/contact-center/buckets/buckets";
    import {getCalendarTimezones} from "../../../api/lookups/calendars/calendars";

    export default {
        name: "opened-queue-member-general",
        mixins: [openedTabComponentMixin],
        components: {datetimePicker},

        data() {
            return {
                dropdownOptionsPriorityList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                dropdownOptionsBucketsList: [],
                dropdownOptionsTimezoneList: [],
            }
        },

        mounted() {
            this.loadDropdownOptionsBucketsList();
            this.loadDropdownOptionsTimezoneList();
        },

        computed: {
            name: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            priority: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.priority},
                set(value) {this.setItemProp({prop: 'priority', value})}
            },
            expireAt: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.expireAt},
                set(value) {this.setItemProp({prop: 'expireAt', value})}
            },
            bucket: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.bucket},
                set(value) {this.setItemProp({prop: 'bucket', value})}
            },
            timezone: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.timezone},
                set(value) {this.setItemProp({prop: 'timezone', value})}
            },
            description: {
                get() {return this.$store.state.ccenter.queues.members.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            async loadDropdownOptionsBucketsList(search) {
                const response = await getBucketsList(0, 10, search);
                this.dropdownOptionsBucketsList = response.list.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },
            async loadDropdownOptionsTimezoneList(search) {
                const response = await getCalendarTimezones(0, 10, search);
                this.dropdownOptionsTimezoneList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/queues/members', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>