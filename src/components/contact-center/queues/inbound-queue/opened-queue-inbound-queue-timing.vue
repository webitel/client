<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.timing')}}</h3>
        </header>
        <form class="object-input-grid">
                <form-input
                        v-model="discardAbandonedAfter"
                        :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
                ></form-input>
                <form-input
                        v-model="timeoutWithNoAgents"
                        :label="$t('objects.ccenter.queues.timeoutWithNoAgents')"
                ></form-input>

                <dropdown-select
                        v-model="timeBaseScore"
                        :options="dropdownOptionsScoreList"
                        :label="$t('objects.ccenter.queues.timeBaseScore')"
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
                    this.setItemPayloadProp({ prop: 'discardAbandonedAfter', value: +value });
                },
            },

            timeoutWithNoAgents: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.timeoutWithNoAgents;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'timeoutWithNoAgents', value: +value });
                },
            },

            timeBaseScore: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.timeBaseScore;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'timeBaseScore', value: +value });
                },
            },           

        },

        methods: {
            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
                setItemPayloadProp: 'SET_ITEM_PAYLOAD_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .timepicker {
        margin-bottom: 28px;
    }
</style>
