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
                        class="form__input"
                        :label="$t('objects.CSV.charSet')"
                        :placeholder="$t('objects.CSV.charSet')"
                >
                </dropdown-select>

                <form-input
                        class="form__input"
                        v-model="separator"
                        :label="$t('objects.CSV.separator')"
                        :placeholder="$t('objects.CSV.separator')"
                >
                </form-input>
            </form>
        </section>

        <divider/>

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
                                :placeholder="'ID'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Title</div>
                        <dropdown-select
                                :placeholder="'Title'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Type</div>
                        <dropdown-select
                                :placeholder="'Type'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Priority</div>
                        <dropdown-select
                                :placeholder="'Priority'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>ID</div>
                        <dropdown-select
                                :placeholder="'ID'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Title</div>
                        <dropdown-select
                                :placeholder="'Title'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Type</div>
                        <dropdown-select
                                :placeholder="'Type'"
                        ></dropdown-select>
                    </li>
                    <li>
                        <div>Priority</div>
                        <dropdown-select
                                :placeholder="'Priority'"
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
            'form-input': formInput,
            'dropdown-select': dropdownSelect,
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
        min-height: 67vh;

        .upload-popup__info {
            padding: 0 44px;

            .upload-popup__info-headers {
                @extend .typo-body-md;
            }

            form {
                @extend .object-input-grid;

                .form__input {
                    margin: 27px 0 21px; // bottom 41 - 20 hint
                }
            }
        }

        .CSV-column-match {

            .column-headers {
                @extend .object-input-grid;
                @extend .typo-body-md;

                padding: 0 44px;
                margin-top: 24px;
                color: $input;

                div {
                    align-self: center;
                }
            }

            .column-rows {
                padding: 24px 44px 18px;

                li {
                    @extend .object-input-grid;
                    grid-row-gap: 0; // (28px - 9px label + 20px bottom error)

                    div {
                        @extend .typo-body-md;
                        align-self: center;
                    }
                }
            }
        }
    }
</style>