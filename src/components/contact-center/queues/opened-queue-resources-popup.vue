<template>
    <popup
            :title="$t('objects.ccenter.resGroups.addResGroup')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <dropdown-select
                    v-model="resourceGroup"
                    :v="$v.itemInstance.resourceGroup"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.ccenter.resGroups.resGroups', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import { getResGroupList } from '../../../api/contact-center/resourceGroups/resourceGroups';

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
                resourceGroup: {
                    required,
                },
            },
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('ccenter/queues/resGroups', {
                id: (state) => state.itemId,
                itemInstance: (state) => state.itemInstance,
            }),
            resourceGroup: {
                get() {
                    return this.$store.state.ccenter.queues.resGroups.itemInstance.resourceGroup;
                },
                set(value) {
                    this.setItemProp({ prop: 'resourceGroup', value });
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
                const response = await getResGroupList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/queues/resGroups', {
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
