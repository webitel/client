<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.res.failure')}}</h3>
        </header>

        <form class="object-input-grid grid-w50">
            <form-input
                    v-model.trim="itemInstance.res.maxErrors"
                    :label="$t('objects.ccenter.res.maxErrors')"
                    :placeholder="$t('objects.ccenter.res.maxErrors')"
            ></form-input>

            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.res.errorCodes')}}
                </div>

                <tags-input
                        v-model="errorCodeTag"
                        :tags="itemInstance.res.errorIds"
                        :autocomplete-items="errorCodeTags"
                        :autocomplete-min-length="0"
                        :placeholder="$tc('objects.ccenter.res.errorCodes')"
                        @tags-changed="newTags => this.itemInstance.res.errorIds = newTags"
                        autocomplete-filter-duplicates
                >
                </tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import TagsInput from "@johmun/vue-tags-input";

    export default {
        name: "opened-resource-failure",
        mixins: [openedTabComponentMixin],
        components: {
            TagsInput,
        },

        data() {
            return {
                errorCodeTag: '',
                errorCodeTags: [
                    {text: '1xx'},
                    {text: '2xx'},
                    {text: '3xx'},
                    {text: '4xx'},
                    {text: '5xx'}
                ],
            }
        },
    }
</script>