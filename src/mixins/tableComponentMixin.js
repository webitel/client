import vuetable from 'vuetable-2/src/components/Vuetable';
import objectHeader from '../../src/components/object-utils/the-object-header';
import pagination from '../components/utils/table-pagination';
import switcher from '../components/utils/switcher';
import status from '../components/utils/status';
import search from '../components/utils/search';
import loader from '../components/utils/loader';

export default {
    components: {
        objectHeader,
        vuetable,
        pagination,
        switcher,
        status,
        search,
        loader,
    },

    data() {
        return {
            isLoaded: false,
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
        async loadDataList() {
            this.isLoaded = false;
            await this.loadData();
            this.isLoaded = true;
        },

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