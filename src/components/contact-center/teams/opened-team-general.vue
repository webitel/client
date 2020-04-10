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

            <div>
                <div class="switcher-label-wrap">
                    <div class="label">{{$t('objects.ccenter.teams.postProcessing')}}</div>
                    <switcher
                            v-model="postProcessing"
                    ></switcher>
                </div class = 'teams__time-wrap'>
                    <form-input
                            v-model="postProcessingTimeout"
                            :label="$t('objects.ccenter.teams.wrapUpTime')"
                            :disabled="!postProcessing"
                    ></form-input>
            </div>
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
            postProcessing: {
                get() {return this.$store.state.ccenter.teams.itemInstance.post_processing},
                set(value) {this.setItemProp({prop: 'post_processing', value})}
            },
            postProcessingTimeout: {
                get() {return this.$store.state.ccenter.teams.itemInstance.post_processing_timeout},
                set(value) {this.setItemProp({prop: 'post_processing_timeout', value})}
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
    .switcher-label-wrap {
        margin: 0 0 28px;

        .switcher {
            margin-top: 7px;
        }
    }

    .teams__time-wrap {
        display: flex;
        align-items: center;
    }
</style>