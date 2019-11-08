<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.license.license')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$t('objects.directory.users.roleAdmin')}}
                </div>

                <tags-input
                        v-model="licenseTag"
                        :tags="itemInstance.license"
                        :autocomplete-items="licenseOptions"
                        :autocomplete-min-length="0"
                        :placeholder="$t('objects.license.license')"
                        @tags-changed="newTags => this.itemInstance.license = newTags"
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
        name: "opened-user-license",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                licenseTag: '',
                licenseOptions: [
                    {text: 'Product 1', allowed: false},
                    {text: 'Product 2', allowed: false},
                    {text: 'Product 3', allowed: false},
                    {text: 'Product 4', allowed: false}
                ],
            }
        }
    }
</script>

<style scoped>

</style>