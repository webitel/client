<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        > {{$t('objects.routing.gateways.registerGateway')}} |
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
    import openedRegisterSipGatewayGeneral from './opened-register-sip-gateway-general';
    import openedRegisterSipGatewayConfiguration from './opened-register-sip-gateway-configuration';

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {gatewayHostValidator} from '@/utils/validators';
    import {required, minValue, maxValue, numeric} from 'vuelidate/lib/validators';

    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-register-sip-gateway',
        mixins: [editComponentMixin],
        components: {
            openedRegisterSipGatewayGeneral,
            openedRegisterSipGatewayConfiguration
        },
        data() {
            return {
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.routing.configuration'),
                        value: 'configuration',
                    },
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                registrar: {
                    gatewayHostValidator,
                    required
                },
                domain: {
                    gatewayHostValidator
                },
                proxy: {
                    gatewayHostValidator
                },
                accountName: {
                    required
                },
                expires: {
                    numeric,
                    minValue: minValue(32),
                    maxValue: maxValue(3600),
                    required
                },
                password: {
                    required
                },
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
                loadItem: 'LOAD_REGISTER_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>