<template>
    <popup
            :title="$t('objects.lookups.blacklist.newNumber')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
    >
        <form class="popup-form">
            <form-input
                    v-model.trim="number"
                    :v="$v.itemInstance.number"
                    :label="$tc('objects.lookups.blacklist.number', 1)"
                    required
            ></form-input>
            <form-input
                    v-model.trim="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-blacklist-number-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },

        data() {
            return {

            }
        },

        validations: {
            itemInstance: {
                number: {
                    required
                },
            }
        },

        mounted() {
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/blacklists/numbers', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            number: {
                get() {return this.$store.state.lookups.blacklists.numbers.itemInstance.number},
                set(value) {this.setItemProp({prop: 'number', value})}
            },
            description: {
                get() {return this.$store.state.lookups.blacklists.numbers.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                if(!invalid) {
                try {
                    !this.id ? await this.addItem() : await this.updateItem();
                    this.$emit('close');
                } catch {}
                }
            },

            ...mapActions('lookups/blacklists/numbers', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .popup-form {
        margin-bottom: 18px;
    }
</style>