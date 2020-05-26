<template>
    <popup
            :title="$tc('objects.ccenter.res.res', 1)"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <dropdown-select
                    v-model="res"
                    :v="$v.itemInstance.res"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.ccenter.res.res', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {
 required, numeric, minValue, maxValue,
} from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import { getAgentsList } from '../../../api/contact-center/agents/agents';
    import { getBucketsList } from '../../../api/contact-center/buckets/buckets';
    import { getResourceList } from '../../../api/contact-center/resources/resources';

    export default {
        name: 'opened-res-numbers-popup',
        mixins: [editComponentMixin],
        components: {
            popup,
        },

        data() {
            return {
                dropdownOptionsList: [],
            };
        },

        validations: {
            itemInstance: {
                resource: {
                    required,
                },
            },
        },

        mounted() {
            this.loadItem();
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('ccenter/resGroups/res', {
                id: (state) => state.itemId,
                itemInstance: (state) => state.itemInstance,
            }),
            res: {
                get() {
                    return this.$store.state.ccenter.resGroups.res.itemInstance.resource;
                },
                set(value) {
                    this.setItemProp({ prop: 'resource', value });
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
                    } catch {}
                }
            },

            async loadDropdownOptionsList(search) {
                const response = await getResourceList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/resGroups/res', {
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
