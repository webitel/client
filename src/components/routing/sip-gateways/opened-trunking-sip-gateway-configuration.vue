<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.routing.gateways.trunkingACLTitle')}}</h3>
            <i
                    class="icon-icon_plus icon-action"
                    :title="$t('iconHints.add')"
                    @click="addVariable"
            ></i>
        </header>
        <form class="object-input-grid grid-w50">
            <section class="value-pair-wrap">
                <div class="label" :class="{'invalid': v.itemInstance.ipacl.$error}">
                    {{$t('objects.routing.gateways.trunkingACL')}}
                </div>
                <div class="value-pair" v-for="(acl, key) in ipacl">
                    <dropdown-select
                            :value="acl.proto"
                            :label="$t('objects.routing.protocol')"
                            :options="protocolList"
                            @input="setVariableProp({index: key, prop: 'proto', value: $event})"
                            hide-label
                            hide-details
                    ></dropdown-select>

                    <form-input
                            :value="acl.ip"
                            :v="ipacl.ip"
                            :label="$t('objects.routing.ip')"
                            @input="setVariableProp({index: key, prop: 'ip', value: $event})"
                            hide-label
                            hide-details
                            required
                    ></form-input>

                    <form-input
                            :value="acl.port"
                            :label="$t('objects.routing.port')"
                            @input="setVariableProp({index: key, prop: 'port', value: $event})"
                            hide-label
                            hide-details
                    ></form-input>
                    <i
                            class="icon-icon_delete icon-action"
                            :title="$t('iconHints.delete')"
                            v-if="key !== 0"
                            @click="deleteVariable(key)"
                    ></i>
                </div>
            </section>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-trunking-sip-gateway-configuration',
        mixins: [openedTabComponentMixin],

        data() {
            return {
                protocolList: ['any', 'udp', 'tcp'],
            };
        },

        computed: {
            ...mapState('routing/gateways', {
                ipacl: (state) => state.itemInstance.ipacl,
            }),
        },

        methods: {
            ...mapActions('routing/gateways', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addVariable: 'ADD_VARIABLE_PAIR',
                setVariableProp: 'SET_VARIABLE_PROP',
                deleteVariable: 'DELETE_VARIABLE_PAIR',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .value-pair-wrap .value-pair {
        grid-template-columns: 117px 1fr 80px 24px;
    }
</style>
