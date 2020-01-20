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
                    v-model.trim="space"
                    :label="$t('objects.integrations.storage.space')"
            ></form-input>
            <form-input
                    v-model.trim="lifetime"
                    :label="$t('objects.integrations.storage.lifetime')"
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
            name: {
                get() {return this.$store.state.integrations.storage.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            space: {
                get() {return this.$store.state.integrations.storage.itemInstance.space},
                set(value) {this.setItemProp({prop: 'space', value})}
            },
            lifetime: {
                get() {return this.$store.state.integrations.storage.itemInstance.lifetime},
                set(value) {this.setItemProp({prop: 'lifetime', value})}
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