<template>
    <section class="object-content module-new object-with-tabs">
        <tabs
                :currentTab="currentTab"
                :tabs="tabs"
                @change="currentTab = $event"
        ></tabs>
        <slot name="component" :currentTab="computeCurrentTab"></slot>
    </section>
</template>

<script>
    import tabs from './tabs';
    export default {
        name: "tabs-component",
        components: {tabs},
        props: {
            tabs: {
                type: Array,
                required: true,
            },

            itemInstance: {
                type: Object,
                required: true,
            },

            v: {
                type: Object,
                required: true
            },

            root: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                currentTab: {value: 'general'},
            }
        },

        computed: {
            computeCurrentTab() {
                if(this.currentTab.value.includes('tab')) {
                    return this.currentTab.value;
                }
                return this.root + '-' + this.currentTab.value;
            }
        }
    }
</script>

<style scoped>

</style>