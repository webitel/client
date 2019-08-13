<template>
    <aside class="upload-popup">

        <header class="content-header">
            <h3 class="content-title">{{$t('objects.importCSV')}}</h3>
        </header>

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


        <section class="CSV-column-match">
            <header class="column-headers">
                <div>{{$t('objects.CSV.CSVColumn')}}</div>
                <div>{{$t('objects.CSV.testRailField')}}</div>
            </header>
            <divider/>
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
                </ul>

            </div>
        </section>

        <divider/>

        <div class="btn-controls">
            <btn class="secondary-btn"@click.native="close">close</btn>
            <btn @click.native="close">save</btn>
        </div>
    </aside>
</template>

<script>
    import checkbox from '../../utils/checkbox';
    import formInput from '../../utils/form-input';
    import divider from '../../utils/divider';
    import btn from '../../utils/btn';
    import dropdownSelect from '../../utils/dropdown-select';

    export default {
        name: "upload-popup",
        components: {
            'form-input': formInput,
            'dropdown-select': dropdownSelect,
            checkbox,
            divider,
            btn,
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
        @extend .scrollbar;
        @extend .box-shadow;

        position: absolute;
        top: 50%;
        left: 50%;
        width: 738px;
        min-height: 67vh;
        max-height: 80vh;
        padding: 27px 0;
        background: #fff;
        border-radius: $border-radius;
        transform: translate(-50%, -50%);
        overflow-y: auto;
        z-index: 10;

        .content-header {
            padding: 0 44px;
            margin: 0 0 38px;
        }

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
                margin-bottom: 24px;
                color: $input;

                div {
                    align-self: center;
                }
            }

            .column-rows {
                padding: 22px 44px 27px;

                li {
                    @extend .object-input-grid;

                    div {
                        @extend .typo-body-md;
                        align-self: center;
                    }
                }
            }
        }

        .btn-controls {
            text-align: right;
            margin: 26px 44px 0;
        }
    }
</style>