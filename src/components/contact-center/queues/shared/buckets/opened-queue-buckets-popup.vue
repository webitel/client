<template>
    <popup
            :title="$t('objects.lookups.buckets.addBucket')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <dropdown-select
                    v-model="bucket"
                    :v="$v.itemInstance.bucket"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.lookups.buckets.buckets', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="ratio"
                    :label="$t('objects.ccenter.queues.bucketRatio')"
                    :v="$v.itemInstance.ratio"
                    required
            ></form-input>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { required, numeric, minValue } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import { getBucketsList } from '../../../../../api/lookups/buckets/buckets';

    export default {
        name: 'opened-queue-buckets-popup',
        mixins: [editComponentMixin],
        components: {
            popup,
        },
        data() {
            return {};
        },

        validations: {
            itemInstance: {
                bucket: {
                    required,
                },
                ratio: {
                    numeric,
                    minValue: minValue(0),
                    required,
                },
            },
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('ccenter/queues/buckets', {
                id: (state) => state.itemId,
                itemInstance: (state) => state.itemInstance,
            }),
            bucket: {
                get() {
                    return this.$store.state.ccenter.queues.buckets.itemInstance.bucket;
                },
                set(value) {
                    this.setItemProp({ prop: 'bucket', value });
                },
            },
            ratio: {
                get() {
                    return this.$store.state.ccenter.queues.buckets.itemInstance.ratio;
                },
                set(value) {
                    this.setItemProp({ prop: 'ratio', value });
                },
            },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                if (!invalid) {
                    try {
                        !this.id ? await this.addItem() : await this.updateItem();
                        this.$emit('close');
                    } catch {
                    }
                }
            },

            async loadDropdownOptionsList(search) {
                const response = await getBucketsList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/queues/buckets', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
            }),
        },
    };
</script>

<style scoped>

</style>
