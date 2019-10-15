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

            <expansion-panel>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <form-input
                            v-model.trim="itemInstance.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                    ></form-input>

                    <dropdown-select
                            :value="'Empty'"
                            :label="$tc('objects.routing.callflow.callflow', 1)"
                            :options="callflowList"
                    ></dropdown-select>

                    <form-input
                            v-model.trim="itemInstance.proxy.$model"
                            :v="$v.itemInstance.proxy"
                            :label="$t('objects.routing.gateways.proxy')"
                            :placeholder="$t('objects.routing.gateways.proxy')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="itemInstance.host"
                            :label="$t('objects.routing.gateways.host')"
                            :placeholder="$t('objects.routing.gateways.host')"
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
                    <value-pair
                            :pairs="itemInstance.ipacl"
                            :label="$t('objects.routing.gateways.trunkingACL')"
                            :addValuePair="addValuePair"
                            required
                    ></value-pair>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import valuePair from '@/components/utils/key-value-pair';

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    import {getGateway, addGateway, updateGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-trinking-sip-gateway',
        mixins: [editComponentMixin],

        components: {
            'value-pair': valuePair,
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
                        ip: 'ip',
                        proto: 'proto'
                    }],
                },
                gatewayTypeOptions: ['SIP Registration', 'SIP Tranking'],
                callflowList: [],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                username: {
                    required
                },
                proxy: {
                    required
                },
                expire: {
                    required
                },
                password: {
                    required
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
                    proto: ''
                });
            },

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
                response.ipacl.forEach(acl => {
                    acl.ip += acl.port || '';
                    acl.proto = acl.proto || '';
                    delete acl.port;
                });

                if(response.register) this.$router.push('/routing/gateways/register/'+this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    };
</script>


<style lang="scss" scoped>

</style>
