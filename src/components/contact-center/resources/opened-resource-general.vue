<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="gateway"
                    :v="v.itemInstance.gateway"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.routing.gateways.gateways', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="cps"
                    :v="v.itemInstance.cps"
                    :label="$t('objects.ccenter.res.cps')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="limit"
                    :v="v.itemInstance.limit"
                    :label="$t('objects.ccenter.res.limit')"
                    required
            ></form-input>

            <form-input
                    v-model="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getGatewayNameIdPair } from '../../../api/contact-center/resources/resources';
    import { getGatewayList } from '../../../api/routing/gateways/gateways';

    export default {
        name: 'opened-resource-general',
        mixins: [openedTabComponentMixin],
        data() {
            return {
                dropdownOptionsList: [],
            };
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            name: {
                get() { return this.$store.state.ccenter.res.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            gateway: {
                get() { return this.$store.state.ccenter.res.itemInstance.gateway; },
                set(value) { this.setItemProp({ prop: 'gateway', value }); },
            },
            cps: {
                get() { return this.$store.state.ccenter.res.itemInstance.cps; },
                set(value) { this.setItemProp({ prop: 'cps', value }); },
            },
            limit: {
                get() { return this.$store.state.ccenter.res.itemInstance.limit; },
                set(value) { this.setItemProp({ prop: 'limit', value }); },
            },
            description: {
                get() { return this.$store.state.ccenter.res.itemInstance.description; },
                set(value) { this.setItemProp({ prop: 'description', value }); },
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getGatewayList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('ccenter/res', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>
