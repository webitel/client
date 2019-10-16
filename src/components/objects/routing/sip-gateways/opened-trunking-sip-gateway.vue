<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                :secondaryAction="close"
        >
            {{$tc('objects.routing.gateways.gateways', 1)}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new gateways">

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

                    <dropdown-select
                            :value="'Empty'"
                            :label="$tc('objects.routing.callflow.callflow', 1)"
                            :options="callflowList"
                    ></dropdown-select>

                    <form-input
                            v-model.trim="$v.itemInstance.proxy.$model"
                            :v="$v.itemInstance.proxy"
                            :label="$t('objects.routing.gateways.hostnameTrunking')"
                            :placeholder="$t('objects.routing.gateways.hostnameTrunking')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.host.$model"
                            :v="$v.itemInstance.host"
                            :label="$t('objects.routing.gateways.host')"
                            :placeholder="$t('objects.routing.gateways.host')"
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
                        <h3 class="content-title">{{$t('objects.routing.gateways.trunkingACLTitle')}}</h3>
                    </header>
                </template>

                <template slot="expansion-content">
                    <section class="value-pair-wrap">
                        <div class="label">{{$t('objects.routing.gateways.trunkingACL')}}</div>
                        <div class="value-pair" v-for="(ipacl, key) in $v.itemInstance.ipacl.$each.$iter">
                            <dropdown-select
                                    :label="$t('objects.routing.protocol')"
                                    :value="ipacl.$model.proto"
                                    :options="protocolList"
                                    @input="ipacl.$model.proto = $event"
                            >
                            </dropdown-select>

                            <form-input
                                    v-model="ipacl.$model.ip"
                                    :v="ipacl.ip"
                                    :label="$t('objects.routing.ip')"
                                    :placeholder="$t('objects.routing.ip')"
                                    required
                            ></form-input>

                            <form-input
                                    v-model="ipacl.$model.port"
                                    :label="$t('objects.routing.port')"
                                    :placeholder="$t('objects.routing.port')"
                            ></form-input>

                            <i
                                    class="icon-icon_delete icon-action"
                                    v-if="key !== 0"
                                    @click="deleteValuePair(key)"
                            ></i>
                        </div>
                        <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
                    </section>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {ipValidator, gatewayHostValidator} from '@/utils/validators';
    import {required} from 'vuelidate/lib/validators';

    import {getGateway, addGateway, updateGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-trinking-sip-gateway',
        mixins: [editComponentMixin],

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
                        proto: '',
                        port: null
                    }],
                },
                gatewayTypeOptions: ['SIP Registration', 'SIP Tranking'],
                callflowList: [],
                // protocolList: [
                //     {name: 'Any', value: ''},
                //     {name: 'UDP', value: 'udp'},
                //     {name: 'TCP', value: 'tcp'}
                // ],
                protocolList: ['any', 'udp', 'tcp'],

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
            addValuePair() {
                this.itemInstance.ipacl.push({
                    ip: '',
                    proto: 'any',
                    port: null
                });
            },

            deleteValuePair(valuePairId) {
                this.itemInstance.ipacl.splice([valuePairId], 1);
            },

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


<style lang="scss" scoped>
    .gateways .value-pair {
        grid-template-columns: 1fr 4fr 1fr 24px;

        .dropdown-select {
            padding-bottom: 20px;
        }
    }
</style>
