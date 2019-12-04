<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.calendar"
                    :v="v.itemInstance.calendar"
                    :options="[]"
                    :label="$tc('objects.lookups.calendars.calendars', 1)"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.strategy"
                    :v="v.itemInstance.strategy"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.strategy')"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.timezone"
                    :v="v.itemInstance.timezone"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.timezone')"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.priority"
                    :v="v.itemInstance.priority"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.priority')"
                    required
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.blacklist"
                    :options="[]"
                    :label="$tc('objects.lookups.blacklist.blacklist', 1)"
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.schema"
                    :v="v.itemInstance.schema"
                    :options="[]"
                    :label="$t('objects.routing.schema')"
                    required
            ></dropdown-select>

            <form-input
                    v-model="itemInstance.callLimit"
                    :label="$t('objects.ccenter.queues.callLimit')"
            ></form-input>

            <form-input
                    v-model="itemInstance.description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-inbound-queue-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>