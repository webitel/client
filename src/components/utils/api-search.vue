<template>
    <form class="search api-search">
        <input
                class="search__input"
                type="text"
                :placeholder="placeholder || $t('objects.name')"
                v-model="search"
        >
        <button
                class="search__btn"
                type="button"
                @click="filterData"
        >
            <i class="icon-icon_search icon-action"></i>
        </button>
    </form>
</template>

<script>
    export default {
        name: "api-search",
        props: {
            placeholder: {
                type: String,
            },
        },

        data() {
            return {
                search: '',
            }
        },

        methods: {
            filterData() {
                this.$emit('filterData', this.search);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        display: flex;
        align-items: center;
        width: 254px;

        .search__input {
            @extend .default-input;
            @extend .typo-input-text;

            flex: 1;
            padding: 10px 14px 8px;
        }

        .search__btn {
            width: 24px;
            height: 24px;
            box-sizing: content-box;
            padding: 8px;
            background: transparent;
            border: none;
            border-left: 1px solid $input;
            outline: none;
            border-radius: $border-radius;
            transform: translateX(-100%);

            .icon-action {
                margin-left: 0;
            }
        }
    }
</style>