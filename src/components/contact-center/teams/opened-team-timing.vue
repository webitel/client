<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.teams.timing')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="maxNoAnswer"
                    :v="v.itemInstance.maxNoAnswer"
                    :label="$t('objects.ccenter.teams.maxNoAnswer')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="callTimeout"
                    :v="v.itemInstance.callTimeout"
                    :label="$t('objects.ccenter.teams.callTimeout')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="wrapUpTime"
                    :v="v.itemInstance.wrapUpTime"
                    :label="$t('objects.ccenter.teams.wrapUpTime')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="noAnswerDelayTime"
                    :v="v.itemInstance.noAnswerDelayTime"
                    :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
                    required
            ></form-input>

            <div class="switcher-label-wrap">
                <div class="label">{{$t('objects.ccenter.teams.postProcessing')}}</div>
                <switcher
                        v-model="postProcessing"
                ></switcher>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-team-timing',
        mixins: [openedTabComponentMixin],

        computed: {
            maxNoAnswer: {
                get() { return this.$store.state.ccenter.teams.itemInstance.maxNoAnswer; },
                set(value) { this.setItemProp({ prop: 'maxNoAnswer', value }); },
            },
            callTimeout: {
                get() { return this.$store.state.ccenter.teams.itemInstance.callTimeout; },
                set(value) { this.setItemProp({ prop: 'callTimeout', value }); },
            },
            wrapUpTime: {
                get() { return this.$store.state.ccenter.teams.itemInstance.wrapUpTime; },
                set(value) { this.setItemProp({ prop: 'wrapUpTime', value }); },
            },
            noAnswerDelayTime: {
                get() { return this.$store.state.ccenter.teams.itemInstance.noAnswerDelayTime; },
                set(value) { this.setItemProp({ prop: 'noAnswerDelayTime', value }); },
            },
            postProcessing: {
                get() { return this.$store.state.ccenter.teams.itemInstance.postProcessing; },
                set(value) { this.setItemProp({ prop: 'postProcessing', value }); },
            },
        },

        methods: {
            ...mapActions('ccenter/teams', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
