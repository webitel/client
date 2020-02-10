<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$t('objects.routing.flow.flowSchema')}} |
            {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>
            <form class="object-input-grid">
                <form-input
                        v-model.trim="name"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>
            </form>
            <code-editor
                    v-model="schema"
                    :label="$t('objects.routing.flow.callflow')"
                    @errorListener="isSyntaxError = $event"
            ></code-editor>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import codeEditor from '@/components/utils/code-editor';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-flow",
        mixins: [editComponentMixin],
        components: {
            codeEditor
        },
        data() {
            return {
                options: {
                    autoClosingBrackets: false
                },
                isSyntaxError: true,
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('routing/flow', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.routing.flow.itemId
                },
                set(value) {
                    this.setId(value)
                }
            },
            name: {
                get() {
                    return this.$store.state.routing.flow.itemInstance.name
                },
                set(value) {
                    this.setItemProp({prop: 'name', value})
                }
            },
            schema: {
                get() {
                    return this.$store.state.routing.flow.itemInstance.schema
                },
                set(value) {
                    this.setItemProp({prop: 'schema', value})
                }
            },
        },

        methods: {
            // override validations check to compute disabled SAVE properly
            // can't just add isSyntaxError to validations because checkValidation checks
            // only itemInstance props
            checkValidations(validatedInstance = 'itemInstance') {
                const v = this.$v ? this.$v : this.v;
                v[validatedInstance].$touch();
                // if its still pending or an error is returned do not submit
                return v[validatedInstance].$pending ||
                    v[validatedInstance].$error || this.isSyntaxError;
            },

            ...mapActions('routing/flow', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .editor-wrap {
        margin-top: 8px;
    }
</style>