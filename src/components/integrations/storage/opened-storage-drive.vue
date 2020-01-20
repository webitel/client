<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.drive')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="folder"
                    :v="v.itemInstance.folder"
                    :label="$t('objects.integrations.storage.driveFolder')"
                    required
            ></form-input>
            <form-input
                    v-model="email"
                    :v="v.itemInstance.email"
                    :label="$t('objects.integrations.storage.driveEmail')"
                    required
            ></form-input>
            <form-input
                    v-model="key"
                    :v="v.itemInstance.key"
                    :label="$t('objects.integrations.storage.driveKey')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-storage-drive",
        mixins: [openedTabComponentMixin],

        computed: {
            folder: {
                get() {return this.$store.state.integrations.storage.itemInstance.folder},
                set(value) {this.setItemProp({prop: 'folder', value})}
            },
            email: {
                get() {return this.$store.state.integrations.storage.itemInstance.email},
                set(value) {this.setItemProp({prop: 'email', value})}
            },
            key: {
                get() {return this.$store.state.integrations.storage.itemInstance.key},
                set(value) {this.setItemProp({prop: 'key', value})}
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>