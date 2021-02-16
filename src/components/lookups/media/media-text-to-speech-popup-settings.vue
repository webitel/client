<template>
    <form>
        <dropdown-select
                :value="itemInstance.settings.provider"
                :options="providerOptions"
                :label="$t('objects.lookups.media.provider')"
                :placeholder="$t('objects.lookups.media.provider')"
        ></dropdown-select>

        <dropdown-select
                :value="itemInstance.settings.lang"
                :options="langOptions"
                :label="$t('objects.lookups.media.lang')"
                :placeholder="$t('objects.lookups.media.lang')"
        ></dropdown-select>

        <dropdown-select
                :value="itemInstance.settings.voice"
                :options="voiceOptions"
                :label="$t('objects.lookups.media.voice')"
                :placeholder="$t('objects.lookups.media.voice')"
        ></dropdown-select>
        <form-input
                v-model.trim="itemInstance.settings.token"
                :label="$t('objects.lookups.media.token')"
                :placeholder="$t('objects.lookups.media.token')"
        ></form-input>

        <form-input
                v-model.trim="itemInstance.settings.key"
                :label="$t('objects.lookups.media.key')"
                :placeholder="$t('objects.lookups.media.key')"
        ></form-input>
    </form>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

    export default {
        name: 'media-text-to-speech-popup-settings',
        mixins: [openedTabComponentMixin],
        data() {
            return {
                providerOptions: [
                    { name: 'ES6 (ES-2016)' },
                    { name: 'ES5 (ES-2015)' },
                ],
                langOptions: [
                    { name: 'ES6 (ES-2016)' },
                    { name: 'ES5 (ES-2015)' },
                ],
                voiceOptions: [
                    { name: 'ES6 (ES-2016)' },
                    { name: 'ES5 (ES-2015)' },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>

</style>
