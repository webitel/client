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
                    v-model="itemInstance.blacklist"
                    :options="[]"
                    :label="$tc('objects.lookups.blacklist.blacklist', 1)"
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.priority"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.priority')"
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.schema"
                    :v="v.itemInstance.schema"
                    :options="[]"
                    :label="$t('objects.routing.schema')"
                    required
            ></dropdown-select>

            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.res.res', 2)}}
                </div>
                <tags-input
                        v-model="resTagModel"
                        :tags="itemInstance.resources"
                        :autocomplete-items="[]"
                        :autocomplete-min-length="0"
                        :placeholder="$tc('objects.ccenter.res.res', 1)"
                        @tags-changed="newTags => this.itemInstance.resources = newTags"
                        add-only-from-autocomplete
                        autocomplete-filter-duplicates
                >
                </tags-input>
            </div>

            <form-input
                    v-model="itemInstance.description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>

            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.teams.teams', 2)}}
                </div>
                <tags-input
                        v-model="teamsTagModel"
                        :tags="itemInstance.teams"
                        :autocomplete-items="[]"
                        :autocomplete-min-length="0"
                        :placeholder="$tc('objects.ccenter.teams.teams', 1)"
                        @tags-changed="newTags => this.itemInstance.teams = newTags"
                        add-only-from-autocomplete
                        autocomplete-filter-duplicates
                >
                </tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-preview-dialer-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                resTagModel: '',
                teamsTagModel: ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>