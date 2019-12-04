<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.timing')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="timings">
                <timepicker
                        v-model="itemInstance.originateTimeout"
                        :label="$t('objects.ccenter.queues.originateTimeout')"
                ></timepicker>
                <timepicker
                        v-model="itemInstance.waitBetweenRetries"
                        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
                ></timepicker>
                <timepicker
                        v-model="itemInstance.timeout"
                        :label="$t('objects.ccenter.queues.timeout')"
                ></timepicker>
            </div>
            <form-input
                v-model="itemInstance.maxNumberOfRetry"
                :label="$t('objects.ccenter.queues.maxNumberOfRetry')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-outbound-ivr-timing",
        mixins: [openedTabComponentMixin],
        components: {timepicker},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .timepicker {
        margin-bottom: 28px;
    }
</style>