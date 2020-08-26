<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.timing')}}</h3>
        </header>
        <form class="object-input-grid">
                <form-input
                        v-model="discardAbandonedAfter"
                        :label="'Discard abandoned after'"
                ></form-input>
                <form-input
                        v-model="timeoutWithNoAgents"
                        :label="'Timeout with no agents'"
                ></form-input>
                <form-input
                        v-model="timeout"
                        :label="'Timeout'"
                ></form-input>

                <dropdown-select
                        v-model="timeBaseScore"
                        :options="dropdownOptionsScoreList"
                        :label="'Time base score'"
                ></dropdown-select>

        </form>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";
    import DropdownSelect from "../../../utils/dropdown-select";

    export default {
        name: 'opened-queue-inbound-queue-timing',
        mixins: [openedTabComponentMixin],
        components: {DropdownSelect, timepicker},
        data() {
            return {
                dropdownOptionsScoreList: ['score', 'system'],
            }
        },

        computed: {
            discardAbandonedAfter: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.discardAbandonedAfter;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'discardAbandonedAfter', value });
                },
            },

            timeoutWithNoAgents: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.timeoutWithNoAgents;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'timeoutWithNoAgents', value });
                },
            },

            timeBaseScore: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.timeBaseScore;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'timeBaseScore', value });
                },
            },

            timeout: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.timeout;
                },
                set(value) {
                    this.setItemProp({ prop: 'timeout', value });
                },
            },

        },

        methods: {
            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
                setPayloadItemProp: 'SET_PAYLOAD_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .timepicker {
        margin-bottom: 28px;
    }
</style>
