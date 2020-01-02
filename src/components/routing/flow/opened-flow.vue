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
                }
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
            }
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
                get() {return this.$store.state.routing.flow.itemId},
                set(value) {this.setId(value)}
            },
            name: {
                get() {return this.$store.state.routing.flow.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            schema: {
                get() {return this.$store.state.routing.flow.itemInstance.schema},
                set(value) {this.setItemProp({prop: 'schema', value})}
            },
        },

        methods: {
            ...mapActions('routing/flow', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
            // async loadItem() {
                // this.itemInstance.schema = JSON.stringify({
                //     "recordSession": {
                //         "action": "start",
                //         "type": "mp3",
                //         "stereo": true,
                //         "followTransfer": true,
                //         "bridged": true,
                //         "minSec": 2,
                //         "email": []
                //     },
                //     "_id": "eeedda1e-8ebe-46ee-a264-40c0af337146"
                // }, null, 4);
           // }
        }
    }
</script>

<style lang="scss" scoped>
    .editor-wrap {
        margin-top: 8px;
    }
</style>