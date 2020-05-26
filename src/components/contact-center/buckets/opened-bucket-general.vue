<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid grid-w50">
            <form-input
                    v-model.trim="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-bucket-general',
        mixins: [openedTabComponentMixin],

        computed: {
            name: {
                get() { return this.$store.state.ccenter.buckets.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },

            description: {
                get() { return this.$store.state.ccenter.buckets.itemInstance.description; },
                set(value) { this.setItemProp({ prop: 'description', value }); },
            },
        },

        methods: {
            ...mapActions('ccenter/buckets', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style scoped>

</style>
