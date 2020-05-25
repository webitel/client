<template>
    <popup
            class="upload-popup"
            :title="$t('objects.importCSV')"
            :primaryAction="save"
            :primaryDisabled="computeDisabledSave"
            @close="$emit('close')"
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
                        <div>{{field.text || field.name}}<span v-if="field.required">*</span></div>
                        <tags-input
                                v-if="field.tags"
                                v-model="field.csvArr"
                                :placeholder="field.text || field.name"
                                :options="computeHeaders"
                                hide-label
                                hide-details
                        ></tags-input>
                        <dropdown-select
                                v-else
                                v-model="field.csv"
                                :placeholder="field.text || field.name"
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
    import { mapState } from 'vuex';
    import tagsInput from '../../utils/tags-input';
    import uploadCSVMixin from '../../../mixins/uploadCSVMixin';
    import { addMember, addMembersList } from '../../../api/contact-center/queues/queueMembers';

    export default {
        name: 'upload-members-popup',
        mixins: [uploadCSVMixin],
        components: { tagsInput },
        data() {
            return {
                bulk: [],
                mappingFields: [
                    {
                        name: 'name',
                        required: true,
                        csv: {},
                    },
                    {
                        name: 'timezoneId',
                        required: true,
                        csv: {},
                    },
                    {
                        name: 'priority',
                        required: false,
                        csv: {},
                    },
                    {
                        text: 'Expire',
                        name: 'expireAt',
                        required: false,
                        csv: {},
                    },
                    {
                        name: 'bucketId',
                        required: false,
                        csv: {},
                    },
                    {
                        name: 'variables',
                        required: false,
                        tags: true,
                        csvArr: [],
                    },
                    {
                        text: 'Communication destination',
                        name: 'destination',
                        required: true,
                        tags: true,
                        csvArr: [],
                    },
                    {
                        text: 'Communication priority',
                        name: 'priority',
                        required: false,
                        tags: true,
                        csvArr: [],
                    },
                    {
                        text: 'Communication typeId',
                        name: 'typeId',
                        required: true,
                        tags: true,
                        csvArr: [],
                    },
                    {
                        text: 'Communication description',
                        name: 'description',
                        required: false,
                        tags: true,
                        csvArr: [],
                    },
                ],
            };
        },

        computed: {
            ...mapState('ccenter/queues/members', {
                parentId: (state) => state.parentId,
            }),

            computeDisabledSave() {
                // find all required fields
                const required = this.mappingFields.filter((field) => field.required);
                // check if some of them are empty
                return required.some((item) => (item.tags ? !item.csvArr.length : !Object.entries(item.csv).length));
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
                            this.bulk.push(item);
                        }
                    }
                    await addMembersList(this.parentId, this.bulk);
                    this.$emit('close');
                } catch {
                }
            },

            setFields(row, mappingFields) {
                const item = { variables: {}, communications: [] };
                mappingFields.forEach((field) => {
                    if (field.csv && Object.entries(field.csv).length) {
                        let { name } = field;
                        if (name.includes('Id')) {
                            name = name.slice(0, -2);
                            item[name] = { id: row[field.csv.id] };
                        } else {
                            item[name] = row[field.csv.id];
                        }
                    }
                });
                const communications = mappingFields.filter((field) => field.tags);
                communications.forEach((field) => {
                    field.csvArr.forEach((csvItem, index) => {
                        let { name } = field;
                        if (name === 'variables') {
                            item.variables[csvItem.name] = row[csvItem.id];
                        } else {
                            item.communications[index] = item.communications[index] || {};
                            if (name.includes('Id')) {
                                name = name.slice(0, -2);
                                item.communications[index][name] = { id: row[csvItem.id] };
                            } else {
                                item.communications[index][name] = row[csvItem.id];
                            }
                        }
                    });
                });
                return item;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/objects/upload-popup";
</style>
