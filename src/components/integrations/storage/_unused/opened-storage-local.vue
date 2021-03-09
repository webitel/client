<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.local')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="directory"
                    :label="$t('objects.integrations.storage.localFolder')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-storage-local',
        mixins: [openedTabComponentMixin],

        computed: {
            directory: {
                get() { return this.$store.state.integrations.storage.itemInstance.properties.directory; },
                set(value) { this.setItemProp({ prop: 'directory', value }); },
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
