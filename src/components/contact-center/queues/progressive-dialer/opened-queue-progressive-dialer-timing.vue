<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.timing')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="timings">
                <timepicker
                        v-model="originateTimeout"
                        :label="$t('objects.ccenter.queues.originateTimeout')"
                ></timepicker>
                <timepicker
                        v-model="waitBetweenRetries"
                        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
                ></timepicker>
            </div>
            <div>
                <form-input
                        v-model="maxAttempts"
                        :label="$t('objects.ccenter.queues.maxNumberOfRetry')"
                ></form-input>
                <form-input
                        v-model="minDuration"
                        :label="$t('objects.ccenter.queues.minCallDuration')"
                ></form-input>
            </div>
        </form>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-queue-progressive-dialer-timing',
        mixins: [openedTabComponentMixin],
        components: { timepicker },
        data() {
            return {};
        },

        computed: {
            originateTimeout: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.originateTimeout;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'originateTimeout', value });
                },
            },

            waitBetweenRetries: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.waitBetweenRetries;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'waitBetweenRetries', value: +value });
                },
            },

            maxAttempts: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.maxAttempts;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'maxAttempts', value: +value });
                },
            },

            minDuration: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.minDuration || 0;
                },
                set(value) {
                    this.setItemPayloadProp({ prop: 'minDuration', value: +value });
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
