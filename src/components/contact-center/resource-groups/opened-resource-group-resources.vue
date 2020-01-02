<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.res.res', 2)}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$tc('objects.ccenter.res.res', 2)}}*
                </div>

                <tags-input
                        v-model="resTag"
                        :tags="itemInstance.resList"
                        :autocomplete-items="resList"
                        :autocomplete-min-length="0"
                        :placeholder="$tc('objects.ccenter.res.res', 2)"
                        @before-deleting-tag="deleteRes"
                        @tags-changed="newTags => this.itemInstance.resList = newTags"
                        autocomplete-filter-duplicates
                >
                </tags-input>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getResourceList} from "../../../api/contact-center/resources";
    import {deleteResInGroup} from "../../../api/contact-center/resourceGroups";
    import TagsInput from "@johmun/vue-tags-input";

    export default {
        name: "opened-resource-group-resources",
        mixins: [openedTabComponentMixin],
        components: {
            TagsInput,
        },
        data() {
            return {
                resTag: '',
                resList: []
            }
        },

        mounted() {
            this.loadRes();
        },

        methods: {
            async deleteRes({index, tag, deleteTag}) {
                try {
                    await deleteResInGroup(this.id, tag.id);
                    deleteTag();
                } catch {}
            },

            async loadRes() {
                const response = await getResourceList();
                this.resList = response.map(item => {
                    return {
                        text: item.name,
                        resId: item.id,
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .value-pair-wrap > .label {
        margin-bottom: 0;
    }

    .value-pair {
        i {
            margin-bottom: 10px;
        }
    }
</style>