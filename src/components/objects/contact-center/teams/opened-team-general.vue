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

            <dropdown-select
                    v-model="strategy"
                    :v="v.itemInstance.strategy"
                    :options="[]"
                    :label="$t('objects.ccenter.teams.strategy')"
                    required
            ></dropdown-select>

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
    import {mapActions} from "vuex";

    export default {
        name: "opened-team-general",
        mixins: [openedTabComponentMixin],

        computed: {
            name: {
                get() {return this.$store.state.ccenter.teams.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            strategy: {
                get() {return this.$store.state.ccenter.teams.itemInstance.strategy},
                set(value) {this.setItemProp({prop: 'strategy', value})}
            },
            description: {
                get() {return this.$store.state.ccenter.teams.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            ...mapActions('ccenter/teams', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>