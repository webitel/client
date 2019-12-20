import debounce from "../utils/debounce";

export default {
    data() {
        return {
            dropdownOptionsList: [],
            searchValue: '',
        }
    },

    mounted() {
        this.loadDropdownOptionsList();
    },

    computed: {
        debounceSearch(value) {
            return debounce(this.loadDropdownOptionsList);
        },
    },

    methods: {
        searchList(value) {
            this.searchValue = value;
            this.dropdownOptionsList = [];
            return this.debounceSearch(value);
        },

        loadDropdownOptionsList() {
        }
    }
}