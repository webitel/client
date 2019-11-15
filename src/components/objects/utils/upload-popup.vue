<template>
    <popup
            class="upload-popup"
            :title="$t('objects.importCSV')"
            @close="close"
    >
        <section class="upload-popup__info">
            <checkbox
                    class="upload-popup__info-headers"
                    :value="isHeadersSkip"
                    :label="$t('objects.CSV.skipHeaders')"
                    @toggleCheckbox="toggleHeadersSkip"
            ></checkbox>
            <form>
                <dropdown-select
                        :value="''"
                        :label="$t('objects.CSV.charSet')"
                        :placeholder="$t('objects.CSV.charSet')"
                >
                </dropdown-select>

                <form-input
                        v-model="separator"
                        :label="$t('objects.CSV.separator')"
                        :placeholder="$t('objects.CSV.separator')"
                >
                </form-input>
            </form>
        </section>

        <section class="CSV-column-match">
            <header class="column-headers">
                <div>{{$t('objects.CSV.CSVColumn')}}</div>
                <div>{{$t('objects.CSV.testRailField')}}</div>
            </header>
            <div class="column-rows">
                <ul>
                    <li>
                        <div>ID</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'ID'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Title</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Title'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Type</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Type'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Priority</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Priority'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>ID</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'ID'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Title</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Title'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Type</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Type'"
                                hide-label
                                hide-details
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Priority</div>
                        <dropdown-select
                                :value="''"
                                :placeholder="'Priority'"
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

    export default {
        name: "upload-popup",
        components: {
            formInput,
            dropdownSelect,
            checkbox,
            divider,
            popup
        },
        data() {
            return {
                isHeadersSkip: true,
                charSet: '',
                separator: ''
            }
        },
        methods: {
            toggleHeadersSkip() {
                this.isHeadersSkip = !this.isHeadersSkip;
            },
            close() {
                this.$emit('close');
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
</style>