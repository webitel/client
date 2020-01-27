<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.license.license')}}</h3>
        </header>
        <form class="object-input-grid">
            <tags-input
                    v-model="license"
                    :options="dropdownOptionsList"
                    :label="$t('objects.directory.license.license')"
                    @search="loadDropdownOptionsList"
            ></tags-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";
    import {getLicenseList} from "../../../api/directory/license/license";

    export default {
        name: "opened-user-license",
        mixins: [openedTabComponentMixin],

        mounted() {
            this.loadDropdownOptionsList();
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

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getLicenseList(0, 10, search);
                this.dropdownOptionsList = response.map(item => {
                    return {
                        name: item.product,
                        id: item.id,
                    }
                });
            },
            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>

<style scoped>

</style>