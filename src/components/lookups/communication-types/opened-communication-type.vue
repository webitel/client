<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.lookups.communications.communications', 1)}} |
            {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>

            <form class="new_w50">
                <form-input
                        v-model.trim="code"
                        :v="$v.itemInstance.code"
                        :label="$t('objects.lookups.communications.code')"
                        required
                ></form-input>

                <form-input
                        v-model.trim="name"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        v-model="description"
                        :label="$t('objects.description')"
                        textarea
                ></form-input>

            </form>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';

    import {required} from 'vuelidate/lib/validators';
    import {
        addCommunication,
        getCommunication,
        updateCommunication
    } from "../../../api/lookups/communications/communications";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-communications-type",
        mixins: [editComponentMixin],
        data() {
            return {

            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                code: {
                    required
                },
                name: {
                    required
                }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/communications', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.lookups.communications.itemId},
                set(value) {this.setId(value)}
            },
            code: {
                get() {return this.$store.state.lookups.communications.itemInstance.code},
                set(value) {this.setItemProp({prop: 'code', value})}
            },
            name: {
                get() {return this.$store.state.lookups.communications.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            description: {
                get() {return this.$store.state.lookups.communications.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            ...mapActions('lookups/communications', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style scoped>

</style>