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
                    :options="dropdownOptionsStrategyList"
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
        data() {
            return {
                dropdownOptionsStrategyList: [
                    {name: 'Random', value: 'random'},
                    // {name: '', value: 'sequentially-by-agent-level'},
                    {name: 'Agent with fewest calls', value: 'fewest-calls'},
                    {name: 'Agent with least talk time', value: 'least-talk-time'},
                    {name: 'Top-Down', value: 'top-down'},
                    {name: 'Round robbin', value: 'round-robin'},
                    {name: 'Longest idle Agent', value: 'longest-idle-time'},
                ]
            }
        },

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