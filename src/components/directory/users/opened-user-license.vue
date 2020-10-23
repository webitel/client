<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.license.license')}}</h3>
        </header>
        <form class="object-input-grid">           
            <wt-select
                    v-model="license"
                    :close-on-select="false"
                    :label="$t('objects.directory.license.license')"
                    :search="loadDropdownOptionsList"
                    :internal-search="false"
                    multiple
                ></wt-select>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getLicenseList } from '../../../api/directory/license/license';

    export default {
        name: 'opened-user-license',
        mixins: [openedTabComponentMixin],
       
        computed: {
            license: {
                get() {
                    return this.$store.state.directory.users.itemInstance.license;
                },
                set(value) {
                    this.setItemProp({ prop: 'license', value });
                },
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getLicenseList(0, 10, search);                
                return response.list.map((item) => ({
                        name: item.product,
                        id: item.id,
                    }));
            },
            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style scoped>

</style>
