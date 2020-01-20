<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.dropbox')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="key"
                    :v="v.itemInstance.key"
                    :label="$t('objects.integrations.storage.dropboxKey')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-storage-general",
        mixins: [openedTabComponentMixin],

        computed: {
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