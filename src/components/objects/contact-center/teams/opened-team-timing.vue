<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.teams.timing')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.maxNoAnswer.$model"
                    :v="v.itemInstance.maxNoAnswer"
                    :label="$t('objects.ccenter.teams.maxNoAnswer')"
                    :placeholder="$t('objects.ccenter.teams.maxNoAnswer')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.callTimeout.$model"
                    :v="v.itemInstance.callTimeout"
                    :label="$t('objects.ccenter.teams.callTimeout')"
                    :placeholder="$t('objects.ccenter.teams.callTimeout')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.wrapUpTime.$model"
                    :v="v.itemInstance.wrapUpTime"
                    :label="$t('objects.ccenter.teams.wrapUpTime')"
                    :placeholder="$t('objects.ccenter.teams.wrapUpTime')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.busyDelayTime.$model"
                    :v="v.itemInstance.busyDelayTime"
                    :label="$t('objects.ccenter.teams.busyDelayTime')"
                    :placeholder="$t('objects.ccenter.teams.busyDelayTime')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.rejectDelayTime.$model"
                    :v="v.itemInstance.rejectDelayTime"
                    :label="$t('objects.ccenter.teams.rejectDelayTime')"
                    :placeholder="$t('objects.ccenter.teams.rejectDelayTime')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.noAnswerDelayTime.$model"
                    :v="v.itemInstance.noAnswerDelayTime"
                    :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
                    :placeholder="$t('objects.ccenter.teams.noAnswerDelayTime')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-team-timing",
        mixins: [openedTabComponentMixin],
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>