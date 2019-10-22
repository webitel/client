<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
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
                    v-model.trim="v.itemInstance.proxy.$model"
                    :v="v.itemInstance.proxy"
                    :label="$t('objects.routing.gateways.hostnameTrunking')"
                    :placeholder="$t('objects.routing.gateways.hostnameTrunking')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.host.$model"
                    :v="v.itemInstance.host"
                    :label="$t('objects.routing.gateways.host')"
                    :placeholder="$t('objects.routing.gateways.host')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="itemInstance.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-trunking-sip-gateway-general",
        mixins: [openedTabComponentMixin],

        data() {
            return {
                callflowList: [],

            }
        }
    }
</script>