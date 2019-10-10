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
                            v-model.trim="$v.itemInstance.name.$model"
                            :v="$v.itemInstance.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            required
                    ></form-input>

                    <dropdown-select
                            :value="'Where should I get this value?'"
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

    import {getGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-trinking-sip-gateway',
        mixins: [editComponentMixin],

        components: {
            'value-pair': valuePair,
        },

        data() {
            return {
                itemType: {
                    register: true,
                    scheme: {}
                },
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
                initialItem: {
                    name: '',
                    proxy: '',
                    description: '',
                    id: 0,
                    host: '',
                    ipacl: [{
                        ip: '',
                        proto: ''
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
                this.itemInstance.ipacl.unshift({
                    ip: '',
                    proto: ''
                });
            },

            async save() {
                if (this.id) {
                    // await updateRole(this.id, this.itemInstance);
                } else {
                    // await addRole(this.itemInstance);
                }
                this.close();
            },

            // load current role from backend
            async loadItem() {
                const response = await getGateway(this.id);
                // this.itemInstance = response.role;
                // this.initialItem = JSON.parse(JSON.stringify(response.role));
            }
        },
    };
</script>


<style lang="scss" scoped>

</style>
