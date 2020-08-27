<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.timing')}}</h3>
        </header>
        <form class="object-input-grid">
            <wt-input
                    v-model="originateTimeout"
                    :label="$t('objects.ccenter.queues.originateTimeout')"
            ></wt-input>

            <wt-input
                    v-model="maxOfRetry"
                    :label="$t('objects.ccenter.queues.maxNumberOfRetry')"
            ></wt-input>

            <wt-input
                    v-model="secBetweenRetries"
                    :label="$t('objects.ccenter.queues.waitBetweenRetries')"
            ></wt-input>           
            
            <wt-input
                    v-model="minCallDuration"
                    :label="$t('objects.ccenter.queues.minCallDuration')"
            ></wt-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-queue-outbound-ivr-timing',
        mixins: [openedTabComponentMixin],
        components: {},
        data() {
            return {};
        },

        computed: {
            originateTimeout: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.originateTimeout || 0;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'originateTimeout', value: +value });
                },
            },

            secBetweenRetries: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.secBetweenRetries || 0;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'secBetweenRetries', value: +value });
                },
            },

            maxOfRetry: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.maxOfRetry || 0;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'maxOfRetry', value: +value });
                },
            },

            minCallDuration: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.minCallDuration || 0;
                },
                set(value) {
                    this.setPayloadItemProp({ prop: 'minCallDuration', value: +value });
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
</style>
