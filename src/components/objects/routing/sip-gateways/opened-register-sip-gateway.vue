<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        > {{$t('objects.routing.gateways.registerGateway')}} | {{computeTitle}}
        </object-header>

        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
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

    import {getGateway, addGateway, updateGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-register-sip-gateway',
        mixins: [editComponentMixin],
        components: {
            openedRegisterSipGatewayGeneral,
            openedRegisterSipGatewayConfiguration
        },
        data() {
            return {
                itemInstance: {
                    register: true,
                    name: '',
                    registrar: '',
                    expires: 600,
                    password: '',
                    description: '',
                    username: '',
                    accountName: '',
                    proxy: '',
                    domain: '',
                    id: 0,
                },

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

        computed: {
            computeGatewayTypeComponent() {
                return 'register-gateway'
            }
        },

        methods: {
            async save() {
                let itemInstance = this.itemInstance;
                itemInstance.account = itemInstance.accountName+'@'+itemInstance.domain;
                delete itemInstance.accountName;
                delete itemInstance.domain;
                delete itemInstance.description;

                if (this.id) {
                    await updateGateway(this.id, itemInstance);
                } else {
                    await addGateway(itemInstance);
                }
                this.close();
            },

            // load current role from backend
            async loadItem() {
                const response = await getGateway(this.id);
                if (!response.register) this.$router.push('/routing/gateways/trunking/' + this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    };
</script>