<template>
    <popup
            class="upload-popup"
            :title="$t('objects.importCSV')"
            :primaryAction="save"
            :primaryDisabled="computeDisabledSave"
            @close="$emit('close')"
            overflow
    >
        <section class="upload-popup__info">
            <checkbox
                    class="upload-popup__info-headers"
                    v-model="skipHeaders"
                    :label="$t('objects.CSV.skipHeaders')"
            ></checkbox>
            <form>
                <dropdown-select
                        v-model="charset"
                        :options="charsetOptions"
                        :label="$t('objects.CSV.charSet')"
                ></dropdown-select>

                <form-input
                        v-model="separator"
                        :label="$t('objects.CSV.separator')"
                ></form-input>
            </form>
        </section>

        <section class="CSV-column-match">
            <header class="column-headers">
                <div>{{$t('objects.CSV.fieldName')}}</div>
                <div>{{$t('objects.CSV.CSVColumn')}}</div>
            </header>
            <div class="column-rows">
                <ul>
                    <li
                            v-for="(field, key) in mappingFields"
                            :key="key"
                    >
                        <div>{{field.name}}<span v-if="field.required">*</span></div>
                        <dropdown-select
                                v-model="field.csv"
                                :placeholder="field.name"
                                :options="computeHeaders"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                </ul>

            </div>
        </section>
    </popup>
</template>

<script>
    import checkbox from '../../utils/checkbox';
    import formInput from '../../utils/form-input';
    import divider from '../../utils/divider';
    import popup from '../../utils/popup';
    import dropdownSelect from '../../utils/dropdown-select';
    import {processCSVFile, charsetOptions} from "../../../utils/processCSV";
    import {addUser} from "../../../api/directory/users/users";

    export default {
        name: "upload-users-popup",
        components: {
            formInput,
            dropdownSelect,
            checkbox,
            divider,
            popup
        },
        props: {
            file: {
                required: true,
            }
        },
        data() {
            return {
                skipHeaders: true,
                charset: {name: 'UTF-8', value: 'utf-8'},
                separator: ',',
                csvArr: [[]],
                charsetOptions,
                mappingFields: [
                    {
                        name: 'username',
                        required: true,
                        csv: {}
                    },
                    {
                        name: 'name',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'extension',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'email',
                        required: false,
                        csv: {}
                    },
                ],
            }
        },

        mounted() {
            this.processCSV();
        },

        computed: {
            computeHeaders() {
                this.mappingFields.forEach(field => field.csv = {}); // reset previously selected values
                let headers = [];
                if (this.skipHeaders) {
                    for (let i = 0; i < this.csvArr[0].length; i++) {
                        headers.push({name: this.csvArr[0][i], id: i});
                    }
                } else {
                    for (let i = 1; i <= this.csvArr[0].length; i++) {
                        headers.push({name: `${i} row`, id: i - 1});
                    }
                }
                return headers;
            },

            computeDisabledSave() {
                // find all required fields
                let required = this.mappingFields.filter(field => field.required);
                // check if some of them are empty
                return required.some(item => {
                    return !Object.entries(item.csv).length;
                });
            }
        },

        methods: {
            async save() {
                try {
                    // entries() need to get index of iteration
                    for (const [index, row] of this.csvArr.entries()) {
                        // skip 0 index if it is headers
                        if (!this.skipHeaders || (this.skipHeaders && index)) {
                            let item = this.setFields(this.mappingFields, row);
                            await addUser(item);
                        }
                    }
                    this.$emit('close');
                } catch {
                }
            },

            setFields(row, mappingFields) {
                let item = {};
                mappingFields.forEach(field => {
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
                    }
                );
                reader.readAsText(this.file, this.charset.value);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .upload-popup {
        .upload-popup__info {
            .upload-popup__info-headers {
                @extend .typo-body-md;
            }

            form {
                @extend .object-input-grid;
                margin: 18px 0 18px;
            }
        }

        .CSV-column-match {
            .column-headers {
                @extend .object-input-grid;
                @extend .typo-body-md;

                color: $label-color;

                div {
                    align-self: center;
                }
            }

            .column-rows {
                padding: 24px 0 18px;

                li {
                    @extend .object-input-grid;
                    /*grid-row-gap: 28px; // (28px - 9px label + 20px bottom error)*/
                    margin-bottom: 18px;
                    /*FIXME: MARGIN TOP INSTEAD OF GRID GAPS*/
                    div {
                        @extend .typo-body-md;
                        align-self: center;
                    }
                }
            }
        }
    }
</style>