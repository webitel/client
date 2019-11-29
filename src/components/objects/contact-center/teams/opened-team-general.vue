<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.strategy"
                    :v="v.itemInstance.strategy"
                    :options="[]"
                    :label="$t('objects.ccenter.teams.strategy')"
                    :placeholder="$t('objects.ccenter.teams.strategy')"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="itemInstance.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-team-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>