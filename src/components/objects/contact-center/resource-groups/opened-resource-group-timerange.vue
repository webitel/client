<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
        </header>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-resource-group-timerange",
        mixins: [openedTabComponentMixin],
    }
</script>

<style scoped>

</style>