<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.local')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="folder"
                    :label="$t('objects.integrations.storage.localFolder')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-storage-local",
        mixins: [openedTabComponentMixin],

        computed: {
            folder: {
                get() {return this.$store.state.integrations.storage.itemInstance.folder},
                set(value) {this.setItemProp({prop: 'folder', value})}
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