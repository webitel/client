<template>
    <form class="search">
        <i class="icon-icon_search"></i>
        <input
                class="search__input"
                type="text"
                :placeholder="placeholder || $t('objects.name')"
                :value="value"
                @input="$emit('input', $event.target.value)"
        >
    </form>
</template>

<script>
    import debounce from "../../utils/debounce";

    export default {
        name: "search",
        props: {
            value: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
            },
        },

        watch: {
            value: function () {
              this.debouncer.call(this);
          }
        },

        created() {
            this.debouncer = debounce(this.debouncer);
        },

        methods: {
            debouncer() {
                this.$emit('filterData', this.value);
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