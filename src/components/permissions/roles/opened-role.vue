<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
        </object-header>

        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>

            <form class="new_w50">
                <form-input
                        v-model.trim="name"
                        :v="$v.itemInstance.name"
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
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-role',
        mixins: [editComponentMixin],

        data() {
            return {

            };
        },

        validations: {
            itemInstance: {
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
            ...mapState('permissions/roles', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.permissions.roles.itemId},
                set(value) {this.setId(value)}
            },
            name: {
                get() {return this.$store.state.permissions.roles.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            description: {
                get() {return this.$store.state.permissions.roles.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            ...mapActions('permissions/roles', {
                setId: 'SET_ITEM_ID',
                setItemProp: 'SET_ITEM_PROPERTY',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>


<style lang="scss" scoped>

</style>
