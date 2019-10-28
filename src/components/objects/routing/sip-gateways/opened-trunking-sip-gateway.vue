<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$t('objects.routing.gateways.trunkingGateway')}} | {{computeTitle}}
        </object-header>

        <section class="object-content module-new gateways object-with-tabs">
            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
        </section>
    </div>
</template>

<script>
    import openedTrunkingSipGatewayGeneral from './opened-trunking-sip-gateway-general';
    import openedTrunkingSipGatewayConfiguration from './opened-trunking-sip-gateway-configuration';

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {ipValidator, gatewayHostValidator} from '@/utils/validators';
    import {required} from 'vuelidate/lib/validators';

    import {getGateway, addGateway, updateGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-trunking-sip-gateway',
        mixins: [editComponentMixin],
        components: {
            openedTrunkingSipGatewayGeneral,
            openedTrunkingSipGatewayConfiguration
        },

        data() {
            return {
                itemInstance: {
                    name: '',
                    proxy: '',
                    description: '',
                    id: 0,
                    host: '',
                    ipacl: [{
                        ip: '',
                        proto: 'any',
                        port: null
                    }],
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

        computed: {
            computeGatewayTypeComponent() {
                return 'register-gateway'
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    await updateGateway(this.id, this.itemInstance);
                } else {
                    await addGateway(this.itemInstance);
                }
                this.close();
            },

            // load current gateway from backend
            async loadItem() {
                const defaultIPacl = {
                    ip: '',
                    proto: 'any',
                    port: null,
                };
                const response = await getGateway(this.id);

                response.ipacl.forEach((acl, index) => {
                    response.ipacl[index] = Object.assign({}, defaultIPacl, acl);
                });

                if (response.register) this.$router.push('/routing/gateways/register/' + this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    };
</script>