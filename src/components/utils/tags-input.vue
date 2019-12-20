<template>
    <div class="tags-input tags-input-wrap">
        <div class="label tags-input__label">
            {{label}}
        </div>

        <vue-tags-input
                v-model="tagDraft"
                :tags="computeTags"
                :autocomplete-items="computeOptions"
                :autocomplete-min-length="autocompleteMinLength"
                :placeholder="placeholder || label"
                @input="$emit('searchOptions', $event)"
                @tags-changed="newTags => changeTags(newTags)"
                :add-only-from-autocomplete="addOnlyFromAutocomplete"
                :autocomplete-filter-duplicates="autocompleteFilterDuplicates"
        >
        </vue-tags-input>
    </div>
</template>

<script>
    import vueTagsInput from '@johmun/vue-tags-input';
    export default {
        name: "tags-input",
        components: {vueTagsInput},
        props: {
            value: {
                type: Array,
                required: true,
            },

            options: {
              type: Array,
            },

            autocompleteMinLength: {
                type: Number,
                default: 0
            },

            addOnlyFromAutocomplete: {
              type: Boolean,
              default: true,
            },

            autocompleteFilterDuplicates: {
                type: Boolean,
                default: true,
            },

            label: {
                type: String,
            },

            placeholder: {
                type: String
            }
        },
        data() {
            return {
                tagDraft: '',
            }
        },

        computed: {
            computeTags() {
                return this.value.map(item => {
                    item.text = item.name;
                    return item;
                });
            },

            computeOptions() {
                return this.options.map(item => {
                    item.text = item.name;
                    return item;
                });
            }
        },

        methods: {
            changeTags(tags) {
                const res = tags.map(i => {
                    return {
                        name: i.name,
                        id: i.id
                    }
                });
                this.$emit('input', res);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>