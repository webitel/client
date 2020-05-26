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

            <form-input
                    v-model.trim="registrar"
                    :v="v.itemInstance.registrar"
                    :label="$t('objects.routing.gateways.hostnameRegister')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="accountName"
                    :v="v.itemInstance.accountName"
                    :label="$t('objects.routing.gateways.accountNumber')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="password"
                    :v="v.itemInstance.password"
                    :label="$t('objects.password')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="expires"
                    :v="v.itemInstance.expires"
                    :label="$t('objects.routing.gateways.expire')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-register-sip-gateway-general',
        mixins: [openedTabComponentMixin],

        computed: {
            name: {
                get() { return this.$store.state.routing.gateways.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            registrar: {
                get() { return this.$store.state.routing.gateways.itemInstance.registrar; },
                set(value) { this.setItemProp({ prop: 'registrar', value }); },
            },
            expires: {
                get() { return this.$store.state.routing.gateways.itemInstance.expires; },
                set(value) { this.setItemProp({ prop: 'expires', value }); },
            },
            password: {
                get() { return this.$store.state.routing.gateways.itemInstance.password; },
                set(value) { this.setItemProp({ prop: 'password', value }); },
            },
            description: {
                get() { return this.$store.state.routing.gateways.itemInstance.description; },
                set(value) { this.setItemProp({ prop: 'description', value }); },
            },
            accountName: {
                get() { return this.$store.state.routing.gateways.itemInstance.accountName; },
                set(value) { this.setItemProp({ prop: 'accountName', value }); },
            },
        },

        methods: {
            loadDropdownOptionsList() {
                return [];
            },

            ...mapActions('routing/gateways', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>
