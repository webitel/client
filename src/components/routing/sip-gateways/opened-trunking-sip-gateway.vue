<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$t('objects.routing.gateways.trunkingGateway')}} |
            {{computeTitle}}
        </object-header>

        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedTrunkingSipGatewayGeneral from './opened-trunking-sip-gateway-general';
    import openedTrunkingSipGatewayConfiguration from './opened-trunking-sip-gateway-configuration';

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {ipValidator, gatewayHostValidator} from '@/utils/validators';
    import {required} from 'vuelidate/lib/validators';

    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-trunking-sip-gateway',
        mixins: [editComponentMixin],
        components: {
            openedTrunkingSipGatewayGeneral,
            openedTrunkingSipGatewayConfiguration
        },

        data() {
            return {
                tabs: [{
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.routing.configuration'),
                        value: 'configuration',
                    }],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                host: {
                    gatewayHostValidator,
                    required
                },
                proxy: {
                    gatewayHostValidator,
                    required,
                },
                ipacl: {
                    $each: {
                        ip: {
                            ipValidator,
                            required
                        },
                    }
                }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('routing/gateways', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.routing.gateways.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('routing/gateways', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_TRUNKING_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>