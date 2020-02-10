<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.users.variables')}}</h3>
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
                    <form-input
                            :value="variable.key"
                            :placeholder="$t('objects.directory.users.varKey')"
                            @input="setVariableProp({index: key, prop: 'key', value: $event})"
                            hide-label
                            hide-details
                    ></form-input>
                    <form-input
                            :value="variable.value"
                            :placeholder="$t('objects.directory.users.varVal')"
                            @input="setVariableProp({index: key, prop: 'value', value: $event})"
                            hide-label
                            hide-details
                    ></form-input>
                    <i
                            class="icon-action icon-icon_delete"
                            v-if="key !== 0"
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
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-user-variables",
        mixins: [openedTabComponentMixin],

        computed: {
            ...mapState('directory/users', {
                variables: state => state.itemInstance.variables
            }),
        },

        methods: {
            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addVariable: 'ADD_VARIABLE_PAIR',
                setVariableProp: 'SET_VARIABLE_PROP',
                deleteVariable: 'DELETE_VARIABLE_PAIR',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>