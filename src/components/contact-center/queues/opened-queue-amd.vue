<template>
    <section>        
        <form class="object-input-grid">

            <div>
                <div class="label">{{$t('objects.ccenter.queues.enabled')}}</div>
                <switcher
                        v-model="enabled"
                ></switcher>
            </div>

            <form-input
                    v-model="maxWordLength"
                    :label="$t('objects.ccenter.queues.maxWordLength')"                    
            ></form-input>

            <form-input
                    v-model="maxNumberOfWords"
                    :label="$t('objects.ccenter.queues.maxNumberOfWords')"                    
            ></form-input>

            <form-input
                    v-model="betweenWordsSilence"
                    :label="$t('objects.ccenter.queues.betweenWordsSilence')"                    
            ></form-input>

            <form-input
                    v-model="minWordLength"
                    :label="$t('objects.ccenter.queues.minWordLength')"                    
            ></form-input>

            <form-input
                    v-model="totalAnalysisTime"
                    :label="$t('objects.ccenter.queues.totalAnalysisTime')"                    
            ></form-input>

            <form-input
                    v-model="silenceThreshold"
                    :label="$t('objects.ccenter.queues.silenceThreshold')"                    
            ></form-input>

            <form-input
                    v-model="afterGreetingSilence"
                    :label="$t('objects.ccenter.queues.afterGreetingSilence')"                    
            ></form-input>

            <form-input
                    v-model="greeting"
                    :label="$t('objects.ccenter.queues.greeting')"                    
            ></form-input>

            <form-input
                    v-model="initialSilence"
                    :label="$t('objects.ccenter.queues.initialSilence')"                    
            ></form-input>

            <div>
                <div class="label">{{$t('objects.ccenter.queues.allowNotSure')}}</div>
                <switcher
                        v-model="allowNotSure"
                ></switcher>
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
