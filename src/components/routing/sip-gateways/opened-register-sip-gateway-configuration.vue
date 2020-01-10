<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="username"
                    :label="$t('objects.routing.gateways.authID')"
            ></form-input>

            <dropdown-select
                    :value="schema"
                    :label="$tc('objects.routing.callflow.callflow', 1)"
                    :options="dropdownOptionsList"
                    @search="loadDropdownOptionsList"
            >
            </dropdown-select>

            <form-input
                    v-model.trim="accountName"
                    :v="v.itemInstance.accountName"
                    :label="$t('objects.routing.gateways.accountNumber')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="proxy"
                    :v="v.itemInstance.proxy"
                    :label="$t('objects.routing.gateways.outboundProxy')"
            ></form-input>

            <form-input
                    v-model.trim="domain"
                    :v="v.itemInstance.domain"
                    :label="$t('objects.routing.gateways.domain')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-register-sip-gateway-configuration",
        mixins: [openedTabComponentMixin],

        computed: {
            username: {
                get() {return this.$store.state.routing.gateways.itemInstance.username},
                set(value) {this.setItemProp({prop: 'username', value})}
            },
            schema: {
                get() {return this.$store.state.routing.gateways.itemInstance.schema},
                set(value) {this.setItemProp({prop: 'schema', value})}
            },
            accountName: {
                get() {return this.$store.state.routing.gateways.itemInstance.accountName},
                set(value) {this.setItemProp({prop: 'accountName', value})}
            },
            proxy: {
                get() {return this.$store.state.routing.gateways.itemInstance.proxy},
                set(value) {this.setItemProp({prop: 'proxy', value})}
            },
            domain: {
                get() {return this.$store.state.routing.gateways.itemInstance.domain},
                set(value) {this.setItemProp({prop: 'domain', value})}
            },
        },

        methods: {
            loadDropdownOptionsList() {
                return []
            },

            ...mapActions('routing/gateways', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>