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
                    :value="schema"
                    :label="$tc('objects.routing.callflow.callflow', 1)"
                    :options="dropdownOptionsList"
                    @search="loadDropdownOptionsList"
            ></dropdown-select>

            <form-input
                    v-model.trim="proxy"
                    :v="v.itemInstance.proxy"
                    :label="$t('objects.routing.gateways.hostnameTrunking')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="host"
                    :v="v.itemInstance.host"
                    :label="$t('objects.routing.gateways.host')"
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
    import {mapActions} from "vuex";

    export default {
        name: "opened-trunking-sip-gateway-general",
        mixins: [openedTabComponentMixin],

        computed: {
            name: {
                get() {return this.$store.state.routing.gateways.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            schema: {
                get() {return this.$store.state.routing.gateways.itemInstance.schema},
                set(value) {this.setItemProp({prop: 'schema', value})}
            },
            proxy: {
                get() {return this.$store.state.routing.gateways.itemInstance.proxy},
                set(value) {this.setItemProp({prop: 'proxy', value})}
            },
            host: {
                get() {return this.$store.state.routing.gateways.itemInstance.host},
                set(value) {this.setItemProp({prop: 'host', value})}
            },
            description: {
                get() {return this.$store.state.routing.gateways.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
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