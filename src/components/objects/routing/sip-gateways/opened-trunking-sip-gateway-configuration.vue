<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.routing.gateways.trunkingACLTitle')}}</h3>
            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
        </header>
        <form class="object-input-grid grid-w50">
            <section class="value-pair-wrap">
                <div class="label">{{$t('objects.routing.gateways.trunkingACL')}}</div>
                <div class="value-pair" v-for="(ipacl, key) in v.itemInstance.ipacl.$each.$iter">
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
                            v-if="key !== '0'"
                            @click="deleteValuePair(key)"
                    ></i>
                </div>
            </section>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-trunking-sip-gateway-configuration",
        mixins: [openedTabComponentMixin],

        data() {
            return {
                protocolList: ['any', 'udp', 'tcp'],
                // protocolList: [
                //     {name: 'Any', value: ''},
                //     {name: 'UDP', value: 'udp'},
                //     {name: 'TCP', value: 'tcp'}
                // ],
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
        }
    }
</script>

<style lang="scss" scoped>
    .gateways .value-pair {
        grid-template-columns: 117px 4fr 1fr 24px;
    }
</style>