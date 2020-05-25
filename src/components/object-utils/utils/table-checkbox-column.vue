<template>
    <th v-if="isHeader"
    >
        <checkbox
                :value="isAllItemsInCurrentPageSelected"
                @input="checkAllCheckboxes"
        ></checkbox>
    </th>
    <td v-else
    >
        <checkbox
                v-model="rowData._isSelected"
        ></checkbox>
    </td>
</template>

<script>
    import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin';
    import checkbox from '../../utils/checkbox';

    export default {
        name: 'vuetable-field-table-checkbox',
        mixins: [VuetableFieldMixin],
        components: {
            checkbox,
        },
        methods: {
            checkAllCheckboxes() {
                const selectionState = !this.isAllItemsInCurrentPageSelected;
                this.vuetable.tableData.forEach((item) => {
                    item._isSelected = selectionState;
                });
            },
        },
        computed: {
            isAllItemsInCurrentPageSelected() {
                if (!this.vuetable.tableData || this.vuetable.tableData.length === 0) return false;

                return this.vuetable.tableData.every((item) => item._isSelected);
            },
        },
    };
</script>
