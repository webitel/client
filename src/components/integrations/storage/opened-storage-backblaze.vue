<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.backblaze')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="account"
                    :v="v.itemInstance.account"
                    :label="$t('objects.integrations.storage.backblazeAccount')"
                    required
            ></form-input>
            <form-input
                    v-model="key"
                    :v="v.itemInstance.key"
                    :label="$t('objects.integrations.storage.backblazeKey')"
                    required
            ></form-input>
            <form-input
                    v-model="bucket"
                    :v="v.itemInstance.bucket"
                    :label="$t('objects.integrations.storage.bucket')"
                    required
            ></form-input>
            <form-input
                    v-model="bucketId"
                    :v="v.itemInstance.bucketId"
                    :label="$t('objects.integrations.storage.backblazeBucketId')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-storage-backblaze',
        mixins: [openedTabComponentMixin],

        computed: {
            key: {
                get() { return this.$store.state.integrations.storage.itemInstance.key; },
                set(value) { this.setItemProp({ prop: 'key', value }); },
            },
            access: {
                get() { return this.$store.state.integrations.storage.itemInstance.access; },
                set(value) { this.setItemProp({ prop: 'access', value }); },
            },
            bucket: {
                get() { return this.$store.state.integrations.storage.itemInstance.bucket; },
                set(value) { this.setItemProp({ prop: 'bucket', value }); },
            },
            region: {
                get() { return this.$store.state.integrations.storage.itemInstance.region; },
                set(value) { this.setItemProp({ prop: 'region', value }); },
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
