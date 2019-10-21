import paginationMixin from './paginationMixin';
export default {
    mixins: [paginationMixin],

    computed: {
        // shows delete table action if some items are selected
        anySelected() {
            return !this.filteredDataList.some((item) => item.isSelected);
        }
    },

    methods: {
        deleteSelected() {
            this.filteredDataList.filter(item => item.isSelected)
                .forEach(async selectedItem => {
                console.log(selectedItem);
                await this.remove(selectedItem.id);
            });
        }
    }
}