<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.res.failure')}}</h3>
        </header>

        <form class="object-input-grid grid-w50">
            <form-input
                    v-model.trim="itemInstance.maxErrors"
                    :label="$t('objects.ccenter.res.maxErrors')"
                    :placeholder="$t('objects.ccenter.res.maxErrors')"
            ></form-input>

            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.res.errorCodes')}}
                </div>

                <tags-input
                        v-model="errorCodeTag"
                        :tags="itemInstance.errorCodeList"
                        :autocomplete-items="errorCodeTags"
                        :autocomplete-min-length="0"
                        :placeholder="$tc('objects.ccenter.res.errorCodes')"
                        @tags-changed="newTags => this.itemInstance.errorCodeList = newTags"
                        autocomplete-filter-duplicates
                >

                </tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import tagsInput from "@johmun/vue-tags-input";
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-resource-failure",
        mixins: [editComponentMixin],
        components: {
            'tags-input': tagsInput,
        },
        props: {
            itemInstanceProp: {
                type: Object,
                required: true,
            },
            v: {
                type: Object,
                required: true
            }
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

        mounted() {
            this.itemInstance = this.itemInstanceProp;
        },
    }
</script>

<style lang="scss" scoped>

</style>