import vuetable from 'vuetable-2/src/components/Vuetable';
import objectHeader from '@/components/objects/the-object-header';
import pagination from '../components/utils/table-pagination';
import switcher from '@/components/utils/switcher';
import status from '@/components/utils/status';
import search from '@/components/utils/search';

export default {
    components: {
        objectHeader,
        vuetable,
        pagination,
        switcher,
        status,
        search,
    },

    data() {
        return {
            popupTriggerIf: false,
        }
    },

    mounted() {
        this.loadDataList();
    },

    computed: {
        // shows delete table action if some items are selected
        anySelected() {
            return !this.dataList.some((item) => item._isSelected);
        }
    },

    methods: {
        deleteSelected() {
            const selectedItems = this.dataList.filter(item => item._isSelected);
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

        openPopup() {
            this.popupTriggerIf = true;
        },
    }
}