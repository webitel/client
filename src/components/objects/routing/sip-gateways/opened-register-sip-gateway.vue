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

                    <form-input
                            v-model.trim="$v.itemInstance.registrar.$model"
                            :v="$v.itemInstance.registrar"
                            :label="$t('objects.routing.gateways.registrarProxy')"
                            :placeholder="$t('objects.routing.gateways.registrarProxy')"
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
                            v-model.trim="$v.itemInstance.username.$model"
                            :v="$v.itemInstance.username"
                            :label="$t('objects.username')"
                            :placeholder="$t('objects.username')"
                            required
                    ></form-input>

                    <dropdown-select
                            :value="'Empty'"
                            :label="$tc('objects.routing.callflow.callflow', 1)"
                            :options="callflowList"
                    >
                    </dropdown-select>

                    <form-input
                            v-model.trim="itemInstance.accountName"
                            :label="$t('objects.routing.gateways.accountName')"
                            :placeholder="$t('objects.routing.gateways.accountName')"
                    ></form-input>

                    <form-input
                            v-model.trim="itemInstance.proxy"
                            :label="$t('objects.routing.gateways.proxy')"
                            :placeholder="$t('objects.routing.gateways.proxy')"
                    ></form-input>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, minValue, maxValue} from 'vuelidate/lib/validators';

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
                    username: '',
                    password: '',
                    expires: 600,
                    account: '',
                    id: 0,
                    registrar: '',
                    accountName: '',
                },
                initialItem: {
                    name: '',
                    proxy: '',
                    description: '',
                    username: '',
                    password: '',
                    expires: 600,
                    account: '',
                    id: 0,
                    authUsername: '',
                    registrarProxy: '',
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
                username: {
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
                registrar: {
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
                    // await updateRole(this.id, this.itemInstance);
                } else {
                    // await addRole(this.itemInstance);
                }
                this.close();
            },

            // load current role from backend
            async loadItem() {
                const response = await getGateway(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    };


</script>


<style lang="scss" scoped>

</style>
