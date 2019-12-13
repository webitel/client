<template>
    <popup
            :title="$t('objects.lookups.blacklist.newNumber')"
            :primaryBtnAction="addBlacklist"
            @close="$emit('close')">
        <form class="popup-form">
            <form-input
                    v-model.trim="$v.itemInstance.number.$model"
                    :label="$tc('objects.lookups.blacklist.number', 1)"
                    :placeholder="$tc('objects.lookups.blacklist.number', 1)"
                    :v="$v.itemInstance.number"
                    required
            ></form-input>
            <form-input
                    v-model.trim="itemInstance.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "opened-blacklist-number-popup",
        mixins: [editComponentMixin],
        components: {
            popup,
        },
        props: {
            value: {
                type: Object,
            },
        },
        data() {
            return {
                itemInstance: {
                    number: '',
                    description: ''
                }
            }
        },

        validations: {
            itemInstance: {
                number: {
                    required,
                },
            }
        },

        mounted() {
            if (this.value) {
                this.itemInstance = this.value;
            }
        },

        methods: {
            addBlacklist() {
                this.$emit('addItem', this.itemInstance);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popup-form {
        margin-bottom: 18px;
    }
</style>