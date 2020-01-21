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
                        <div class="upload-tooltip" v-if="field.tooltip">{{field.tooltip}}</div>
                    </li>
                </ul>

            </div>
        </section>
    </popup>
</template>

<script>
    import uploadCSVMixin from '../../../mixins/uploadCSVMixin';
    import {addDevice} from "../../../api/directory/devices/devices";

    export default {
        name: "upload-devices-popup",
        mixins: [uploadCSVMixin],
        data() {
            return {
                mappingFields: [
                    {
                        name: 'account',
                        required: true,
                        csv: {}
                    },
                    {
                        name: 'name',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'vendor',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'model',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'mac',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'ip',
                        required: false,
                        csv: {}
                    },
                    {
                        name: 'password',
                        required: false,
                        csv: {},
                        tooltip: this.$t('objects.directory.devices.passwordSetFromAccount'),
                    }
                ],
            }
        },

        methods: {
            async addItem(item) {
                if(!item.password) item.password = item.account;
                await addDevice(item);
            }
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

    .upload-tooltip {
        @extend .typo-body-sm;
        color: $icon-color;
    }
</style>