<template>
    <th v-if="isHeader"
    >
        <checkbox
                :value="isAllItemsInCurrentPageSelected"
                @toggleCheckbox="checkAllCheckboxes"
        ></checkbox>
    </th>
    <td v-else

    >
        <checkbox
                :value="rowData.isSelected"
                @toggleCheckbox="toggleCheckbox"
        >
        </checkbox>
    </td>
</template>

<script>
    import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin';
    import checkbox from '../../utils/checkbox';

    export default {
        name: 'vuetable-field-table-checkbox',
        mixins: [VuetableFieldMixin],
        components: {
            checkbox
        },
        mounted() {

        },
        methods: {
            toggleCheckbox() {
                this.rowData.isSelected = !this.rowData.isSelected;
            },
            checkAllCheckboxes() {
                const selectionState = !this.isAllItemsInCurrentPageSelected;
                this.vuetable.tableData.forEach((item) => {
                    item.isSelected = selectionState;
                });
            }
        },
        computed: {
            isAllItemsInCurrentPageSelected() {
                if (!this.vuetable.tableData || this.vuetable.tableData.length === 0) return false;

                return this.vuetable.tableData.every((item) => {
                    return item.isSelected;
                });
            }
        }
    }
</script>