<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="itemInstance.username"
                    :label="$t('objects.routing.gateways.authID')"
            ></form-input>

            <dropdown-select
                    :value="'Empty'"
                    :label="$tc('objects.routing.callflow.callflow', 1)"
                    :options="callflowList"
            >
            </dropdown-select>

            <form-input
                    v-model.trim="v.itemInstance.accountName.$model"
                    :v="v.itemInstance.accountName"
                    :label="$t('objects.routing.gateways.accountNumber')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.proxy.$model"
                    :v="v.itemInstance.proxy"
                    :label="$t('objects.routing.gateways.outboundProxy')"
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.domain.$model"
                    :v="v.itemInstance.domain"
                    :label="$t('objects.routing.gateways.domain')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-register-sip-gateway-configuration",
        mixins: [openedTabComponentMixin],

        data() {
            return {
                callflowList: []
            }
        }
    }
</script>