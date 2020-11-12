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
                        v-model="maxOfRetry"
                        :label="$t('objects.ccenter.queues.maxNumberOfRetry')"
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
        name: 'opened-queue-outbound-ivr-timing',
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
                    this.setPayloadItemProp({ prop: 'name', value });
                },
            },

            waitBetweenRetries: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.waitBetweenRetries;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'waitBetweenRetries', value });
                },
            },

            maxOfRetry: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.maxOfRetry;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'maxOfRetry', value });
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
