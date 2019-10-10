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

                    <form-input
                            v-model.trim="itemInstance.proxy.$model"
                            :v="$v.itemInstance.proxy"
                            :label="$t('objects.routing.gateways.proxy')"
                            :placeholder="$t('objects.routing.gateways.proxy')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.expire.$model"
                            :v="$v.itemInstance.expire"
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
                            v-model.trim="$v.itemInstance.username.$model"
                            :v="$v.itemInstance.username"
                            :label="$t('objects.username')"
                            :placeholder="$t('objects.username')"
                            required
                    ></form-input>

                    <dropdown-select
                            :value="'Where should I get this value?'"
                            :label="$tc('objects.routing.callflow.callflow', 1)"
                            :options="callflowList"
                    >
                    </dropdown-select>

                    <form-input
                            v-model.trim="itemInstance.domain"
                            :label="$t('objects.routing.gateways.domain')"
                            :placeholder="$t('objects.routing.gateways.domain')"
                    ></form-input>
                    <form-input
                            v-model.trim="$v.itemInstance.authUsername.$model"
                            :v="$v.itemInstance.authUsername"
                            :label="$t('objects.routing.gateways.authUsername')"
                            :placeholder="$t('objects.routing.gateways.authUsername')"
                            required
                    ></form-input>
                    <form-input
                            v-model.trim="itemInstance.registrarProxy"
                            :label="$t('objects.routing.gateways.registrarProxy')"
                            :placeholder="$t('objects.routing.gateways.registrarProxy')"
                    ></form-input>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    import {getGateway} from "@/api/objects/routing/gateways";

    export default {
        name: 'opened-register-sip-gateway',
        mixins: [editComponentMixin],

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
                    authUsername: '',
                    registrarProxy: '',
                },
                initialItem: {
                    name: '',
                    proxy: '',
                    description: '',
                    id: 0,
                    authUsername: '',
                    registrarProxy: '',
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
                },
                authUsername: {
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
