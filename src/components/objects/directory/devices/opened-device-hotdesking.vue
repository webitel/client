<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.hotDesking')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$t('objects.directory.devices.hostName')}}
                </div>
                <tags-input
                        v-model="hotdeskTag"
                        :tags="itemInstance.hotdesk"
                        :autocomplete-items="hotdesk"
                        :autocomplete-min-length="0"
                        :placeholder="$t('objects.directory.devices.hostName')"
                        @tags-changed="newTags => this.itemInstance.hotdesk = newTags"
                        add-only-from-autocomplete
                        autocomplete-filter-duplicates
                ></tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-device-hot-desking",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                hotdeskTag: '',
                hotdesk: [{text: 'Tag1'}, {text: 'Tag2'}, {text: 'Tag3'}, {text: 'Tag3Tag3Tag3Tag3'},
                    {text: 'Tag5555555555555553'}, {text: 'Ta55g3'}],

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>