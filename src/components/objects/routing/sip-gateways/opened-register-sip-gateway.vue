<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                :secondaryAction="close"
        >
            {{$tc('objects.routing.gateways.gateways', 1)}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">

            <expansion-panel opened>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <form-input
                            v-model.trim="$v.itemInstance.name.$model"
                            :v="$v.itemInstance.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.hostname.$model"
                            :v="$v.itemInstance.hostname"
                            :label="$t('objects.routing.gateways.hostnameRegister')"
                            :placeholder="$t('objects.routing.gateways.hostnameRegister')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.expires.$model"
                            :v="$v.itemInstance.expires"
                            :label="$t('objects.routing.gateways.expire')"
                            :placeholder="$t('objects.routing.gateways.expire')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.password.$model"
                            :v="$v.itemInstance.password"
                            :label="$t('objects.password')"
                            :placeholder="$t('objects.password')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="itemInstance.description"
                            :label="$t('objects.description')"
                            :placeholder="$t('objects.description')"
                            :height="164"
                            textarea
                    ></form-input>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                    </header>
                </template>

                <template slot="expansion-content">
                    <form-input
                            v-model.trim="itemInstance.username"
                            :label="$t('objects.routing.gateways.authID')"
                            :placeholder="$t('objects.routing.gateways.authID')"
                    ></form-input>

                    <dropdown-select
                            :value="'Empty'"
                            :label="$tc('objects.routing.callflow.callflow', 1)"
                            :options="callflowList"
                    >
                    </dropdown-select>

                    <form-input
                            v-model.trim="$v.itemInstance.accountName.$model"
                            :v="$v.itemInstance.accountName"
                            :label="$t('objects.routing.gateways.accountNumber')"
                            :placeholder="$t('objects.routing.gateways.accountNumber')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.proxy.$model"
                            :v="$v.itemInstance.proxy"
                            :label="$t('objects.routing.gateways.outboundProxy')"
                            :placeholder="$t('objects.routing.gateways.outboundProxy')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.domain.$model"
                            :v="$v.itemInstance.domain"
                            :label="$t('objects.routing.gateways.domain')"
                            :placeholder="$t('objects.routing.gateways.domain')"
                            required
                    ></form-input>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {ipValidator, gatewayHostValidator} from '@/utils/validators';
    import {required, minValue, maxValue} from 'vuelidate/lib/validators';

    import {getGateway, addGateway, updateGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-register-sip-gateway',
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    register: true,
                    name: '',
                    hostname: '',
                    expires: 600,
                    password: '',
                    description: '',
                    username: '',
                    accountName: '',
                    proxy: '',
                    domain: '',
                    id: 0,
                },
                callflowList: [],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                hostname: {
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
            if (this.id) {
                this.loadItem();
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


<style lang="scss" scoped>

</style>
