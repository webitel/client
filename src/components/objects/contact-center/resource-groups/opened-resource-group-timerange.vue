<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="range">
                <dropdown-select
                        :value="8"
                        :label="'label'"
                        taggable
                ></dropdown-select>
                <dropdown-select
                        :value="30"
                        :label="''"
                        taggable
                ></dropdown-select>
                <dropdown-select
                        :value="9"
                        :label="'label'"
                        taggable
                ></dropdown-select>
                <dropdown-select
                        :value="30"
                        :label="''"
                        taggable
                ></dropdown-select>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-resource-group-timerange",
        mixins: [openedTabComponentMixin],
    }
</script>

<style lang="scss" scoped>
    .range {
        display: flex;

        .dropdown-select {
            width: 75px;
            /*flex-grow: 1;*/
            margin: 9px;
        }
    }
</style>