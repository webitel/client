<template>
    <section class="object-content module-new">
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <div>
                <form-input
                        v-model.trim="v.itemInstance.name.$model"
                        :v="v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <dropdown-select
                        v-model="itemInstance.schema"
                        :label="$t('objects.routing.schema')"
                ></dropdown-select>

                <form-input
                        v-model.trim="itemInstance.description"
                        :label="$t('objects.description')"
                        textarea
                ></form-input>
            </div>
            <dropdown-select
                    v-model="itemInstance.event"
                    :label="$t('objects.integrations.triggers.event')"
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: 'opened-trigger-on-event-general',
        mixins: [openedTabComponentMixin],
    };
</script>

<style scoped>

</style>
