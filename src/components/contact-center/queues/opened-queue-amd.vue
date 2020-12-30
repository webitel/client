<template>
    <section>
        <form class="object-input-grid">

            <div>
                <div class="label">{{$t('objects.ccenter.queues.enabled')}}</div>
                <wt-switcher
                        v-model="enabled"
                ></wt-switcher>
            </div>

            <wt-input
                    v-model="maxWordLength"
                    type="number"
                    :label="$t('objects.ccenter.queues.maxWordLength')"
            ></wt-input>

            <wt-input
                    v-model="maxNumberOfWords"
                    type="number"
                    :label="$t('objects.ccenter.queues.maxNumberOfWords')"
            ></wt-input>

            <wt-input
                    v-model="betweenWordsSilence"
                    type="number"
                    :label="$t('objects.ccenter.queues.betweenWordsSilence')"
            ></wt-input>

            <wt-input
                    v-model="minWordLength"
                    type="number"
                    :label="$t('objects.ccenter.queues.minWordLength')"
            ></wt-input>

            <wt-input
                    v-model="totalAnalysisTime"
                    type="number"
                    :label="$t('objects.ccenter.queues.totalAnalysisTime')"
            ></wt-input>

            <wt-input
                    v-model="silenceThreshold"
                    type="number"
                    :label="$t('objects.ccenter.queues.silenceThreshold')"
            ></wt-input>

            <wt-input
                    v-model="afterGreetingSilence"
                    type="number"
                    :label="$t('objects.ccenter.queues.afterGreetingSilence')"
            ></wt-input>

            <wt-input
                    v-model="greeting"
                    type="number"
                    :label="$t('objects.ccenter.queues.greeting')"
            ></wt-input>

            <wt-input
                    v-model="initialSilence"
                    type="number"
                    :label="$t('objects.ccenter.queues.initialSilence')"
            ></wt-input>

            <div>
                <div class="label">{{$t('objects.ccenter.queues.allowNotSure')}}</div>
                <wt-switcher
                        v-model="allowNotSure"
                ></wt-switcher>
            </div>

        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-queue-outbound-ivr-timing',
        mixins: [openedTabComponentMixin],
        components: { },
        data() {
            return {};
        },

        computed: {
            enabled: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.enabled;
                },
                set(value) {
                    this.setAmdItemProp({ prop: 'enabled', value });
                },
            },

            allowNotSure: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.allowNotSure;
                },
                set(value) {
                    this.setAmdItemProp({ prop: 'allowNotSure', value });
                },
            },

            maxWordLength: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.maxWordLength;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'maxWordLength', value });
                },
            },

            maxNumberOfWords: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.maxNumberOfWords;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'maxNumberOfWords', value });
                },
            },

            betweenWordsSilence: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.betweenWordsSilence;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'betweenWordsSilence', value });
                },
            },

            minWordLength: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.minWordLength;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'minWordLength', value });
                },
            },

            totalAnalysisTime: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.totalAnalysisTime;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'totalAnalysisTime', value });
                },
            },

            silenceThreshold: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.silenceThreshold;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'silenceThreshold', value });
                },
            },

            afterGreetingSilence: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.afterGreetingSilence;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'afterGreetingSilence', value });
                },
            },

            greeting: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.greeting;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'greeting', value });
                },
            },

            initialSilence: {
                get() {
                    return this.$store.state.ccenter.queues.itemInstance.payload.amd.initialSilence;
                },
                set(value) {
                    value = +value;
                    this.setAmdItemProp({ prop: 'initialSilence', value });
                },
            },
        },

        methods: {
            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
                setAmdItemProp: 'SET_AMD_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .timepicker {
        margin-bottom: 28px;
    }
</style>
