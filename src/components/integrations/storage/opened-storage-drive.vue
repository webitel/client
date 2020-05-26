<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.drive')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="directory"
                    :v="v.itemInstance.properties.directory"
                    :label="$t('objects.integrations.storage.driveFolder')"
                    required
            ></form-input>
            <form-input
                    v-model="email"
                    :v="v.itemInstance.properties.email"
                    :label="$t('objects.integrations.storage.driveEmail')"
                    required
            ></form-input>
            <form-input
                    v-model="privateKey"
                    :v="v.itemInstance.properties.privateKey"
                    :label="$t('objects.integrations.storage.driveKey')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-storage-drive',
        mixins: [openedTabComponentMixin],

        computed: {
            directory: {
                get() { return this.$store.state.integrations.storage.itemInstance.properties.directory; },
                set(value) { this.setItemProp({ prop: 'directory', value }); },
            },
            email: {
                get() { return this.$store.state.integrations.storage.itemInstance.properties.email; },
                set(value) { this.setItemProp({ prop: 'email', value }); },
            },
            privateKey: {
                get() { return this.$store.state.integrations.storage.itemInstance.properties.privateKey; },
                set(value) { this.setItemProp({ prop: 'privateKey', value }); },
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
