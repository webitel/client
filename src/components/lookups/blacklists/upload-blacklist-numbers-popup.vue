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
    import uploadCSVMixin from '../../../mixins/uploadCSVMixin';

    export default {
        name: "upload-users-popup",
        mixins: [uploadCSVMixin],
        data() {
            return {
                mappingFields: [
                    {
                        name: 'number',
                        required: true,
                        csv: {}
                    },
                    {
                        name: 'description',
                        required: false,
                        csv: {}
                    },
                ],
            }
        },

        methods: {
            async addItem(item) {
                console.log(item);
                // await addUser(item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/objects/upload-popup";
</style>