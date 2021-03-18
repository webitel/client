<template>
    <form>
        <form-input
                v-model.trim="v.itemInstance.name.$model"
                :v="v.itemInstance.name"
                :label="$t('objects.name')"
                :placeholder="$t('objects.name')"
                required
        ></form-input>

        <dropdown-select
                :value="itemInstance.type"
                :options="typeOptions"
                :label="$t('')"
                :placeholder="$t('')"
        ></dropdown-select>

        <form-input
                v-model="itemInstance.text"
                :label="$t('objects.description')"
                :placeholder="$t('objects.description')"
                textarea
        ></form-input>
    </form>
</template>

<script>
    import openedTabComponentMixin from '@/app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

    export default {
        name: 'media-text-to-speech-popup-general',
        mixins: [openedTabComponentMixin],
        data() {
            return {
                typeOptions: [
                    { name: 'opt 1' },
                    { name: 'opt 2' },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>

</style>
