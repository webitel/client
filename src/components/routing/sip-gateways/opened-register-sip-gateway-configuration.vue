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
                    v-model="schema"
                    :label="$tc('objects.routing.flow.flow', 1)"
                    :options="dropdownOptionsList"
                    @search="loadDropdownOptionsList"
            >
            </dropdown-select>

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
    import {getFlowList} from "../../../api/routing/flow/flow";

    export default {
        name: "opened-register-sip-gateway-configuration",
        mixins: [openedTabComponentMixin],

        data: () => ({
            dropdownOptionsList: []
        }),

        computed: {
            username: {
                get() {return this.$store.state.routing.gateways.itemInstance.username},
                set(value) {this.setItemProp({prop: 'username', value})}
            },
            schema: {
                get() {return this.$store.state.routing.gateways.itemInstance.schema},
                set(value) {this.setItemProp({prop: 'schema', value})}
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

        mounted() {
            this.loadDropdownOptionsList();
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getFlowList(0, 10, search);
                this.dropdownOptionsList = response.list.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('routing/gateways', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>