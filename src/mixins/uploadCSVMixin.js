import checkbox from '../components/utils/checkbox';
import formInput from '../components/utils/form-input';
import divider from '../components/utils/divider';
import popup from '../components/utils/popup';
import dropdownSelect from '../components/utils/dropdown-select';
import { processCSVFile, charsetOptions } from '../utils/processCSV';

export default {
    components: {
        formInput,
        dropdownSelect,
        checkbox,
        divider,
        popup,
    },
    props: {
        file: {
            required: true,
        },
    },
    data() {
        return {
            skipHeaders: true,
            charset: { name: 'UTF-8', value: 'utf-8' },
            separator: ',',
            csvArr: [[]],
            charsetOptions,
            mappingFields: [],
        };
    },

    mounted() {
        this.processCSV();
    },

    computed: {
        computeHeaders() {
            this.mappingFields.forEach((field) => (field.tags ? field.csvArr = [] : field.csv = {})); // reset previously selected values
            const headers = [];
            if (this.skipHeaders) {
                for (let i = 0; i < this.csvArr[0].length; i++) {
                    headers.push({ name: this.csvArr[0][i], id: i });
                }
            } else {
                for (let i = 1; i <= this.csvArr[0].length; i++) {
                    headers.push({ name: `${i} row`, id: i - 1 });
                }
            }
            return headers;
        },

        computeDisabledSave() {
            // find all required fields
            const required = this.mappingFields.filter((field) => field.required);
            // check if some of them are empty
            return required.some((item) => !Object.entries(item.csv).length);
        },
    },

    methods: {
        async save() {
            try {
                // entries() need to get index of iteration
                for (const [index, row] of this.csvArr.entries()) {
                    // skip 0 index if it is headers
                    if (!this.skipHeaders || (this.skipHeaders && index)) {
                        const item = this.setFields(row, this.mappingFields);
                        await this.addItem(item);
                    }
                }
                this.$emit('close');
            } catch {
            }
        },

        setFields(row, mappingFields) {
            const item = {};
            mappingFields.forEach((field) => {
                if (Object.entries(field.csv).length) {
                    item[field.name] = row[field.csv.id];
                }
            });
            return item;
        },

        processCSV() {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                    const file = e.target.result;
                    if (file) this.csvArr = processCSVFile(file, this.separator);
                });
            reader.readAsText(this.file, this.charset.value);
        },

        addItem() {},
    },
};
