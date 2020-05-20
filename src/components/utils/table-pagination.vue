<template>
    <footer class="pagination">
        <div class="rows-per-page">
            <div class="rows-per-page__text">{{$t('objects.pagination.rowsPerPage')}}:</div>
            <input
                    class="rows-per-page__input"
                    ref="input"
                    :value="value"
                    @input="$emit('input', $event.target.value)"
                    type="text"
                    :placeholder="'10'"
            />
        </div>
        <div class="controls">
            <i
                    class="icon-action icon-icon_arrow-left"
                    :class="{'disabled': !isPrev}"
                    :title="$t('iconHints.prevPage')"
                    @click="prev"
            ></i>
            <span>{{page}}</span>
            <i
                    class="icon-action icon-icon_arrow-right"
                    :class="{'disabled': !isNext}"
                    :title="$t('iconHints.nextPage')"
                    @click="next"
            ></i>
        </div>
    </footer>
</template>

<script>
    import debounce from "../../utils/debounce";

    export default {
        name: "table-pagination",
        props: {
            value: {
                type: String,
                required: true,
            },
            isNext: {
                type: Boolean,
                required: true,
            },
            page: {
                type: Number,
                required: true,
            },
        },

        watch: {
            value: function () {
                this.debouncer.call(this);
            },
        },

        created() {
            this.debouncer = debounce(this.debouncer);
        },

        computed: {
            isPrev() {
                return this.page > 1;
            }
        },

        methods: {
            next() {
                if (this.isNext) {
                    this.$emit('next');
                }
            },
            prev() {
                if (this.isPrev) {
                    this.$emit('prev');
                }
            },

            debouncer() {
                this.$emit('loadDataList', this.value);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        @extend .typo-body-md;

        display: flex;
        align-items: center;
        width: fit-content;
        margin-left: auto;

        .rows-per-page {
            display: flex;
            align-items: center;
            margin-right: 28px;

            .rows-per-page__text {
            }

            .rows-per-page__input {
                @extend .typo-body-md;
                @extend .default-input;

                text-align: center;
                width: 41px;
                height: 38px;
                margin-left: 8px;
                padding: 5px;

            }
        }

        .controls {
            display: flex;
            align-items: center;
            margin-left: 14px;

            i:before {
                color: #000;
            }

            .disabled:before {
                color: #EAE9E9;
                pointer-events: none;
            }
        }
    }
</style>