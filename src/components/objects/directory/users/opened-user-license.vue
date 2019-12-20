<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.license.license')}}</h3>
        </header>
        <form class="object-input-grid">
            <tags-input
                    :value="license || []"
                    :options="licenseOptions"
                    :label="$t('objects.license.license')"
            ></tags-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-user-license",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                licenseTag: '',
                licenseOptions: [
                    {text: 'Product 1', allowed: false},
                    {text: 'Product 2', allowed: false},
                    {text: 'Product 3', allowed: false},
                    {text: 'Product 4', allowed: false}
                ],
            }
        },

        computed: {
            license: {
                get() {
                    return this.$store.state.directory.users.itemInstance.license
                },
                set(value) {
                    this.setItemProp({prop: 'license', value})
                }
            },
        },

        methods: mapActions('directory/users', {
            setItemProp: 'SET_ITEM_PROPERTY',
        }),
    }
</script>

<style scoped>

</style>