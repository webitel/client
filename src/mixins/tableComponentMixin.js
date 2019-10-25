import paginationMixin from './paginationMixin';
import vuetable from 'vuetable-2/src/components/Vuetable';
import objectHeader from '@/components/objects/the-object-header';
import switcher from '@/components/utils/switcher';
import status from '@/components/utils/status';


export default {
    mixins: [paginationMixin],
    components: {
        objectHeader,
        vuetable,
        switcher,
        status,
    },

    data() {
        return {
            dataList: [], // list of all objects to show
            filteredDataList: [],
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
            return !this.filteredDataList.some((item) => item.isSelected);
        }
    },

    methods: {
        filterData() {
            this.filteredDataList = this.dataList.filter(dataItem => {
                return this.filterProperties.some(filterProp => {
                    return dataItem[filterProp].trim().toLowerCase().
                    includes(this.search.trim().toLowerCase());
                });
            });
        },

        deleteSelected() {
            this.filteredDataList.filter(item => item.isSelected)
                .forEach(async selectedItem => {
                    await this.remove(selectedItem.id);
                });
        },

        openPopup() {
            this.popupTriggerIf = true;
        },
    }
}