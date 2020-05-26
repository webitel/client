<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>
            <form-input
                    v-model.trim="maxSize"
                    :label="$t('objects.integrations.storage.maxSize')"
            ></form-input>
            <form-input
                    v-model.trim="expireDays"
                    :label="$t('objects.integrations.storage.expireDays')"
            ></form-input>
            <form-input
                    v-model.trim="priority"
                    :label="$t('objects.integrations.storage.priority')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-storage-general',
        mixins: [openedTabComponentMixin],

        computed: {
            name: {
                get() { return this.$store.state.integrations.storage.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            maxSize: {
                get() { return this.$store.state.integrations.storage.itemInstance.maxSize; },
                set(value) { this.setItemProp({ prop: 'maxSize', value }); },
            },
            expireDays: {
                get() { return this.$store.state.integrations.storage.itemInstance.expireDays; },
                set(value) { this.setItemProp({ prop: 'expireDays', value }); },
            },
            priority: {
                get() { return this.$store.state.integrations.storage.itemInstance.priority; },
                set(value) { this.setItemProp({ prop: 'priority', value }); },
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
