<template>
    <section class="object-content module-new object-with-tabs">
        <tabs
                :currentTab="currentTab"
                :tabs="tabs"
                @change="changeTab"
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

            root: {
                type: String,
                required: true,
            },

            initialTab: {
                type: String,
                default: 'general'
            }
        },

        data() {
            return {
                currentTab: {value: ''},
            }
        },

        watch: {
            initialTab: function(value) {
                this.currentTab.value = value;
            }
        },

        created() {
            this.currentTab.value = this.initialTab;
        },

        computed: {
            computeCurrentTab() {
                if(this.currentTab.value.includes('tab')) {
                    return this.currentTab.value;
                }
                return this.root + '-' + this.currentTab.value;
            }
        },

        methods: {
            changeTab(value) {
                this.currentTab = value;
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>