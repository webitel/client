<template>
    <popup
            :title="$tc('objects.ccenter.res.numbers', 1)"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <form-input
                    v-model="display"
                    :v="$v.itemInstance.display"
                    :label="$tc('objects.ccenter.res.numbers', 1)"
                    required
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";
    import {getAgentsList} from "../../../api/contact-center/agents/agents";
    import {getBucketsList} from "../../../api/contact-center/buckets/buckets";

    export default {
        name: "opened-res-numbers-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },

        validations: {
            itemInstance: {
                display: {
                    required,
                },
            }
        },

        mounted() {
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/res/numbers', {
                id: state => state.itemId,
                itemInstance: state => state.itemInstance
            }),
            display: {
                get() {
                    return this.$store.state.ccenter.res.numbers.itemInstance.display
                },
                set(value) {
                    this.setItemProp({prop: 'display', value})
                }
            },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                if (!invalid) {
                    try {
                        !this.id ? await this.addItem() : await this.updateItem();
                        this.$emit('close');
                    } catch {}
                }
            },

            ...mapActions('ccenter/res/numbers', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
            }),
        }
    }
</script>

<style scoped>

</style>