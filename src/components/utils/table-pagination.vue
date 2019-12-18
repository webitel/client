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
        <div class="page-controls">
            <span class="current items">1-10 of 100</span>
            <div class="controls">
                <i class="icon-action icon-icon_arrow-left"></i>
                <i class="icon-action icon-icon_arrow-down"></i>
            </div>
        </div>
    </footer>
</template>

<script>
    import debounce from "../../utils/debounce";

    export default {
        name: "table-pagination",
        props: {
            value: {
                type:  String,
                required: true,
            }
        },

        watch: {
            value: function() {
                this.debouncer.call(this);
            },
        },

        created() {
            this.debouncer = debounce(this.debouncer);
        },

        methods: {
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

                width: 41px;
                height: 38px;
                margin-left: 8px;
                padding: 5px;

            }
        }

        .page-controls {
            display: flex;
            align-items: center;

            .controls {
                margin-left: 28px;

                i {
                    color: #000;
                }
            }
        }
    }
</style>