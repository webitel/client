<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.dropbox')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="token"
                    :v="v.itemInstance.properties.token"
                    :label="$t('objects.integrations.storage.dropboxKey')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-storage-general',
        mixins: [openedTabComponentMixin],

        computed: {
            token: {
                get() { return this.$store.state.integrations.storage.itemInstance.properties.token; },
                set(value) { this.setItemProp({ prop: 'token', value }); },
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
