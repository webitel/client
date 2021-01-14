<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.variables')}}</h3>
            <i
                    class="icon-action icon-icon_plus"
                    :title="$t('iconHints.add')"
                    @click="addVariable"
            ></i>
        </header>
        <form class="object-input-grid">
            <div class="variables">
                <div
                        class="value-pair"
                        v-for="(variable, key) in variables"
                >
                    <wt-input
                            :value="variable.key"
                            :placeholder="$t('objects.ccenter.queues.varKey')"
                            @input="setVariableProp({index: key, prop: 'key', value: $event})"
                            hide-label
                            hide-details
                    ></wt-input>
                    <wt-input
                            :value="variable.value"
                            :placeholder="$t('objects.ccenter.queues.varVal')"
                            @input="setVariableProp({index: key, prop: 'value', value: $event})"
                            hide-label
                            hide-details
                    ></wt-input>
                    <i
                            class="icon-action icon-icon_delete"
                            :title="$t('iconHints.delete')"
                            @click="deleteVariable(key)"
                    ></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-queue-outbound-ivr-variables',
        mixins: [openedTabComponentMixin],

      computed: {
            ...mapState('ccenter/queues', {
                variables: (state) => state.itemInstance.variables,
            }),
        },

        methods: {
            ...mapActions('ccenter/queues', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addVariable: 'ADD_VARIABLE_PAIR',
                setVariableProp: 'SET_VARIABLE_PROP',
                deleteVariable: 'DELETE_VARIABLE_PAIR',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .value-pair {
        grid-template-columns: 1fr 1fr 24px;
        margin-bottom: 28px;
    }
</style>
