<template>
    <aside class="upload-popup">

        <header class="content-header">
            <h3 class="content-title">Import CSV</h3>
        </header>

        <section class="upload-popup__info">

            <checkbox
                    class="upload-popup__info-headers"
                    :value="isHeadersSkip"
                    :label="'Skip headers'"
                    @toggleCheckbox="toggleHeadersSkip"
            ></checkbox>
            <form>
                <form-input
                        class="form__input"
                        v-model="separator"
                        :label="'Char set'"
                        :placeholder="'Char set'"
                >
                </form-input>

                <form-input
                        class="form__input"
                        v-model="separator"
                        :label="'Separator'"
                        :placeholder="'Separator'"
                >
                </form-input>
            </form>
        </section>

        <divider/>

        <section class="CSV-column-match">
            <ul class="">
                <li class="column-header">
                    <div>CSV column</div>
                    <div>Test rail field</div>
                </li>
                <li>
                    <div>ID</div>
                    <div>ID</div>
                </li>
                <li>
                    <div>Title</div>
                    <div>Title</div>
                </li>
                <li>
                    <div>Type</div>
                    <div>Type</div>
                </li>
                <li>
                    <div>Priority</div>
                    <div>Priority</div>
                </li>
            </ul>
        </section>

        <divider/>

        <div class="btn-controls">
            <btn class="btn secondary-btn" type="submit">close</btn>
            <btn class= "btn" type="submit">save</btn>
        </div>
    </aside>
</template>

<script>
    import checkbox from './checkbox';
    import formInput from '../../utils/form-input';
    import divider from '../../utils/divider';
    import btn from '../../utils/btn';

    export default {
        name: "upload-popup",
        components: {
            'form-input': formInput,
            checkbox,
            divider,
            btn
        },
        data() {
            return {
                isHeadersSkip: true,
                separator: ''
            }
        },
        methods: {
            toggleHeadersSkip() {
                this.isHeadersSkip = !this.isHeadersSkip;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/main";
    @import "../../../assets/css/modules/modules";

    .upload-popup {
        @extend .box-shadow;

        position: fixed;
        top: 99px;
        left: 50%;
        width: 738px;
        max-height: 80vh;
        padding: 27px 0;
        background: #fff;
        border-radius: $border-radius;
        transform: translate(-50%, 0);
        z-index: 100;

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
                @extend .module-input-grid;
                .form__input {
                    margin: 27px 0 21px; // bottom 41 - 20 hint
                }
            }
        }

        .CSV-column-match {
            @extend .scrollbar;

            max-height: calc(80vh - 252px - 101px);
            padding: 27px 44px;
            overflow-y: scroll;
            ul li {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 28px;
                margin-bottom: 8px;

                div {
                    @extend .default-input;
                    &:last-child {
                        @extend .default-input;
                    }
                }
            }
        }

        .btn-controls  {
            text-align: right;
            margin: 26px 44px 0;
        }
    }
</style>