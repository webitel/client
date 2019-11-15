<template>
    <form class="search">
        <i class="icon-icon_search"></i>
        <input
                class="search__input"
                type="text"
                :placeholder="placeholder || $t('objects.name')"
                v-model="search"
                @keyup="filterData"
        >
    </form>
</template>

<script>
    export default {
        name: "search",
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
        @extend .default-input;

        display: flex;
        align-items: center;
        width: 254px;
        padding: 8px 14px 6px;

        .search__input {
            @extend .typo-input-text;

            flex: 1;
            padding: 0;
            margin-left: 8px;
            border: none;
            outline: none;

            &::placeholder {
                color: $icon-color;
            }
        }

        .icon-icon_search {
            height: 24px;
            margin-left: 0;
        }
    }
</style>