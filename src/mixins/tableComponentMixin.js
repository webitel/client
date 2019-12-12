import paginationMixin from './paginationMixin';
import vuetable from 'vuetable-2/src/components/Vuetable';
import objectHeader from '@/components/objects/the-object-header';
import switcher from '@/components/utils/switcher';
import status from '@/components/utils/status';
import search from '@/components/utils/search';

export default {
    mixins: [paginationMixin],
    components: {
        objectHeader,
        vuetable,
        switcher,
        status,
        search,
    },

    data() {
        return {
            dataList: [], // list of all objects to show
            filterProperties: ['name'],

            search: '', // search filter
            popupTriggerIf: false,
        }
    },

    mounted() {
        this.loadDataList();
    },

    computed: {
        // shows delete table action if some items are selected
        anySelected() {
            return !this.dataList.some((item) => item.isSelected);
        }
    },

    methods: {
        deleteSelected() {
            const selectedItems = this.dataList.filter(item => item.isSelected);
            this.remove(null, selectedItems);

        },

        async remove(rowIndex, items) {
            if (items) {
                for(const item of items) {
                    const initialIndex = this.dataList.indexOf(item);
                    await this.removeItem(initialIndex);
                }
            } else {
                await this.removeItem(rowIndex);
            }
            this.loadDataList();
        },

        async removeItem(rowIndex) {
            const deletedItem = this.dataList.splice(rowIndex, 1)[0];
            try {
                await this.deleteItem(deletedItem);
            } catch (err) {
                this.dataList.splice(rowIndex, 0, deletedItem);
            }
        },

        openPopup() {
            this.popupTriggerIf = true;
        },
    }
}