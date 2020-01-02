<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="">
            <form-input
                    v-model="itemInstance.name"
                    :label="$t('objects.name')"
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.priority"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.priority')"
            ></dropdown-select>

            <datepicker
                    v-model="itemInstance.expire"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.expire')"
            ></datepicker>

            <dropdown-select
                    v-model="itemInstance.bucket"
                    :options="[]"
                    :label="$tc('objects.ccenter.buckets.buckets', 1)"
            ></dropdown-select>

            <dropdown-select
                    v-model="itemInstance.timezone"
                    :options="[]"
                    :label="$t('objects.ccenter.queues.timezone')"
            ></dropdown-select>

            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.skills.skills', 2)}}
                </div>
            <tags-input
                    v-model="tagModel"
                    :tags="itemInstance.skills"
                    :autocomplete-items="[]"
                    :autocomplete-min-length="0"
                    :placeholder="$tc('objects.ccenter.skills.skills', 1)"
                    @tags-changed="newTags => this.itemInstance.skills = newTags"
                    add-only-from-autocomplete
                    autocomplete-filter-duplicates
            >
            </tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import datepicker from '@/components/utils/datepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-member-popup-general",
        mixins: [openedTabComponentMixin],
        components: {datepicker},
        data() {
            return {
                tagModel: '',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>